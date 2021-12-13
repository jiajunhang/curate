from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps, loads

from dotenv import load_dotenv

import os
import girth
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load config from a .env file:
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

# Connect to your MongoDB cluster:
client = MongoClient(MONGODB_URI)
db = client['curate']
sample_questions = db['sample_questions']
survey = db['survey']

@app.route("/")
def hello_world():
  return "Hello, World!"


@app.route("/sample_questions", methods=['GET'])
def get_sample_questions():
    sample = sample_questions.find().sort('difficulty')
    return dumps(list(sample))

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

@app.route("/get_questions", methods=['POST'])
def get_questions():
    body = request.get_json()
    print(body)

    group = body['group']
    currentList = body['questions']
    currentResponses = body['responses']

    data = {"correct": 4,"difficulty": -2.5492972826209277,"index": 1,"options": ["xzIjadaaaatB","6HchSbaaaaMSWeWaaaa","c0-nrdaaaaRkMGqcaaaa","RIreQcaaaa07dBHdaaa","KxO1hcaaaaOBNaMaaaa"],"question": "jaz3BdaaaaUm3iKdaaaaK30"}
    print(type(currentList))
    print(type(data))
    currentList.append(data)

    return dumps(currentList)
    """ TODO: Implementation for get question
        1. Input params: (ability estimate, list of question indices)
        2. Based on ability estimate, retrieve window of items +- 0.2
        3. Select randomly without repeat
        4. Error handling: IF can't find question, we by default administer from isolated pool
    """

@app.route("/get_survey_questions", methods=['GET'])
def get_survey_questions():
    surveyQn = survey.find();
    return dumps(list(surveyQn))

