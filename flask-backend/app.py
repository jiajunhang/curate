from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps, loads

from dotenv import load_dotenv

import os
import girth
import pandas as pd
import numpy as np
import random

app = Flask(__name__)
CORS(app)

# Load config from a .env file:
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

# Connect to your MongoDB cluster:
client = MongoClient(MONGODB_URI)
db = client['curate']

pools = db['pools']
quizzes = db['quizzes']

sample_questions = db['sample_questions']
#qns = db['questions'] FOR LIVE DATA

survey = db['survey']

@app.route("/")
def hello_world():
  return "Hello, World!"

@app.route("/sample_questions", methods=['GET'])
def get_sample_questions():
    sample = sample_questions.find().sort('difficulty')
    return dumps(list(sample))

@app.route("/pools", methods=['GET'])
def get_pools():
    pools_data = pools.find()
    return dumps(list(pools_data))

@app.route("/quizzes", methods=['GET', 'POST'])
def get_quizzes():
    if request.method == 'GET':
        quizzes_data = quizzes.find()
        return dumps(list(quizzes_data))
    elif request.method == 'POST':
        data = request.get_json()
        print(data)
        newQuiz = quizzes.insert_one(data)
        return dumps(newQuiz.inserted_id)

@app.route("/ability_mle", methods=['POST'])
def ability_mle():
    data = request.get_json()

    responses = np.array([data['responses']]).T
    difficulty = np.array(data['difficulty'])

    ability = girth.ability_mle(responses, difficulty, np.ones_like(responses))

    #TODO: validation check for NaN values and handling

    return str(ability[0])

@app.route("/ability_eap", methods=['POST'])
def ability_eap():
    data = request.get_json()

    responses = np.array([data['responses']]).T
    difficulty = np.array(data['difficulty'])

    ability = girth.ability_eap(responses, difficulty, np.ones_like(responses))
    return str(ability[0])

""" TODO: Implementation for get question
        1. Input params: (ability estimate, list of question indices)
        2. Based on ability estimate, retrieve window of items +- 0.2
        3. Select randomly without repeat
        4. Error handling: IF can't find question, we by default administer from isolated pool
"""
@app.route("/get_questions", methods=['POST'])
def get_questions():
    '''
    Return test/quiz list of questions
        Parameters:
            group: callback func to calculate either using maximum likelihood or bayesian
            questions: list containing existing questions in JSON
            responses: list containing responses in int format
        Returns:
            questions: updated list of questions
    '''
    body = request.get_json()
    #print(body)

    # Extract fields from request body
    group = body['group']
    currentQuestions = body['questions']
    currentResponses = body['responses']

    #TODO: Question selection for Group 1 (Random Selection)

    # Selecting estimator
    if group == 1:
        estimator = standard_estimator
    elif group == 2:
        estimator = mle_estimator
    else:
        estimator = eap_estimator

    # Calculate current estimate based on responses thus far
    currentEstimate = getEstimate(estimator, currentQuestions, currentResponses)
    print('currentEstimate: ' + currentEstimate)

    # Item selection based on Maximum Fisher Information
    if group == 1:
        nextQuestion = getRandomQuestion(currentQuestions)
    else:
        nextQuestion = getQuestionByEstimate(currentQuestions, currentEstimate)

    currentQuestions.append(nextQuestion)

    # Dummy Data for testing
    #data = {"correct": 4,"difficulty": -2.5492972826209277,"index": 1,"options": ["xzIjadaaaatB","6HchSbaaaaMSWeWaaaa","c0-nrdaaaaRkMGqcaaaa","RIreQcaaaa07dBHdaaa","KxO1hcaaaaOBNaMaaaa"],"question": "jaz3BdaaaaUm3iKdaaaaK30"}
    #print(type(currentQuestions))
    #print(type(data))
    #currentList.append(data)

    return dumps(currentQuestions)
    

@app.route("/get_survey_questions", methods=['GET'])
def get_survey_questions():
    surveyQn = survey.find();
    return dumps(list(surveyQn))

@app.route("/submit_quiz", methods=['POST'])
def submit_quiz():
    body = request.get_json()
    print("body:")
    print(body)

    data = body['data']
    quiz_data = body['quizData']
    survey_data = body['surveyData']

    group = data['group']
    questions = quiz_data['questions']
    responses = quiz_data['responses']

    if group == 1:
        estimator = standard_estimator
        est_text = "N.A"
    elif group == 2:
        estimator = mle_estimator
        est_text = "MLE"
    else:
        estimator = eap_estimator
        est_text = "EAP"
    
    correct_answers = list(map(lambda x: x['correct'], questions))
    mapped_responses = list(map(lambda x, y: response_helper(x, y), correct_answers, responses))
    
    final_estimate = getEstimate(estimator, questions, responses)

    res = {
        "summary" : {
            "name": data['name'],
            "matric": data['matric'],
            "estimator": est_text,
            "ability": final_estimate,
            "total_questions": len(questions),
            "total_correct": mapped_responses.count(1)
        },
        "detail": {
            "questions": list(map(lambda x:x['index'], questions)),
            "responses": responses,
            "accuracy": mapped_responses
        },
        "survey": {
            "group": data['group'] ,
            "likert_score": sum(survey_data['answers'])
        }
    }
    print("res:")
    print(res)

    #TODO: persist into mongoDB
    return res

def response_helper(x, y):
    if x == y:
        return 1
    else:
        return 0


def getEstimate(estimator, currentQuestions, currentResponses):
    '''
    Return estimate based on selected estimator
        Parameters:
            estimator: callback func to calculate either using maximum likelihood or bayesian
            currentQuestions: list containing existing questions in JSON
            currentQuestions: list containing responses in int format
        Returns:
            ability_estimate: decimal estimate of student ability
    '''
    if (len(currentQuestions) == 0):
        return str(0)
    
    question_difficulties = list(map(lambda x: x['difficulty'], currentQuestions))

    correct_answers = list(map(lambda x: x['correct'], currentQuestions))
    mapped_responses = list(map(lambda x, y: response_helper(x, y), correct_answers, currentResponses))

    ability_estimate = estimator(mapped_responses, question_difficulties)

    return ability_estimate

'''
TODO: 
1. Further validation, check adjacent values for a more accurate value
2. Testing with dummy data
3. Randomize across neighbors(?)
'''
def getQuestionByEstimate(currentQuestions, currentEstimate):
    all_qns = list(sample_questions.find()) # for LIVE, change sample_questions to qns

    currentEstimate = float(currentEstimate)
    print("pre clone db")

    # Clone DB & remove used indices
    qn_pool = [x for x in all_qns if x not in currentQuestions]
    print("post clone db")
    print(type(qn_pool))

    # Clone question into difficulty
    difficulty_pool = list(map(lambda x:x['difficulty'], qn_pool))
    print("post map difficulty")

    # Perform binary search
    lo = 0
    hi = len(difficulty_pool)-1
    res = -1

    while lo <= hi:
        mid = (lo+hi) // 2
        
        if difficulty_pool[mid] <= currentEstimate:
            lo = mid+1
        else:
            hi = mid-1
    
    res = mid
    nextQn = qn_pool[res]

    return nextQn


def getRandomQuestion(currentQuestions):
    all_qns = list(sample_questions.find()) # for LIVE, change sample_questions to qns
    qn_pool = [x for x in all_qns if x not in currentQuestions]

    random_index = random.randint(0,len(qn_pool)-1)

    nextQn = qn_pool[random_index]

    return nextQn

def standard_estimator(responses, difficulty):
    total = len(responses)
    score = responses.count(1)

    estimate = score / total

    return str(estimate)

def mle_estimator(responses, difficulty):
    '''
    Return MLE estimate
        Parameters:
            responses: list containing mapped responses (correct/incorrect)
            difficulty: list containing difficulty of questions in decimal format
        Returns:
            ability: decimal estimate of student ability
    '''
    np_responses = np.array([responses]).T
    np_difficulty = np.array(difficulty)

    ability = girth.ability_mle(np_responses, np_difficulty, np.ones_like(responses))

    '''
    Scaled increment/decrement if responses are all correct/wrong
    e.g. last ability is 0, correct:
            3-0=3; 3/3=1, estimate = ~1
    e.g. last ability is 1.5, correct:
            3-1.5=1.5; 1.5/3=0.5, estimate = ~2
    '''
    if np.isnan(ability[0]):
        last_difficulty = abs(np_difficulty[len(np_difficulty)-1])
        diff = (3 - last_difficulty) / 3
        is_correct = np_responses[len(np_responses)-1]

        res = last_difficulty + diff if is_correct == 1 else last_difficulty - diff
        return str(res)
    else:
        return str(ability[0])

def eap_estimator(responses, difficulty):
    '''
    Return EAP estimate
        Parameters:
            responses: list containing mapped responses (correct/incorrect)
            difficulty: list containing difficulty of questions in decimal format
        Returns:
            ability: decimal estimate of student ability
    '''
    np_responses = np.array([responses]).T
    np_difficulty = np.array(difficulty)
    ability = girth.ability_eap(np_responses, np_difficulty, np.ones_like(responses))

    return str(ability[0])