import datetime   # This will be needed later
import os
import json
from pprint import pprint

from dotenv import load_dotenv
from pymongo import MongoClient

# Load config from a .env file:
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

# Connect to your MongoDB cluster:
client = MongoClient(MONGODB_URI)

# List all the databases in the cluster:
for db_info in client.list_database_names():
   print(db_info)


# Get a reference to the 'sample_mflix' database:
db = client['curate']

# List all the collections in 'curate':
collections = db.list_collection_names()
for collection in collections:
   print(collection)

# Get ref to 'survey' collection:
survey = db['survey']
survey.insert_many([
    {
        "index": 1,
        "question": "In general, how often do you check back on previous answers in a test / exam environment?"
    },
    {
        "index": 2,
        "question": "In this quiz, how often did you go back to previous questions to check your answers?"
    },
    {
        "index": 3,
        "question": "In general, how often do you go back to previous questions to modify your answers in a test / exam environment?"
    },
    {
        "index": 4,
        "question": "In this quiz, how often did you go back to previous questions to modify your answers?"
    },
    {
        "index": 5,
        "question": "In this quiz, how often were you able to detect large variations in item difficulty between adjacent items?"
    },
    {
        "index": 6,
        "question": "In this quiz, how often were you able to detect adaptivity in question difficulty (i.e. gets harder as you answer correctly, vice versa)?"
    }
])

# Get a reference to the 'sample_questions' collection:
sample_questions = db['sample_questions']

f = open('sample_data.json')
sample_data = json.load(f)

result = sample_questions.insert_many(sample_data)
print(result.inserted_ids)