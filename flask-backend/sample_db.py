import datetime   # This will be needed later
import os
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

# Get a reference to the 'movies' collection:
sample_questions = db['sample_questions']

result = sample_questions.insert_many([
  {
    "correct": 4,
    "difficulty": -2.5492972826209277,
    "index": 1,
    "options": [
      "xzIjadaaaatB",
      "6HchSbaaaaMSWeWaaaa",
      "c0-nrdaaaaRkMGqcaaaa",
      "RIreQcaaaa07dBHdaaa",
      "KxO1hcaaaaOBNaMaaaa"
    ],
    "question": "jaz3BdaaaaUm3iKdaaaaK30"
  },
  {
    "correct": 0,
    "difficulty": -1.9150101004045414,
    "index": 2,
    "options": [
      "T_KXicaaaaqE86Jda",
      "YYbf4daaaa8M",
      "X5jUQcaaaaQMl4G",
      "fqBPfdaaaaZWAnxdaaaa",
      "gR1hZcaaaaFc7"
    ],
    "question": "Wg5Azcaaaa47yjraaaaa"
  },
  {
    "correct": 4,
    "difficulty": -1.889960329688213,
    "index": 3,
    "options": [
      "sMkX_caaaaaAwd1a",
      "dvnioaaaaaUfkypdaaa",
      "P6IhudaaaaMWA",
      "wFsTHbaaaaB0opBaa",
      "Kk75wdaaaaRd-Dcb"
    ],
    "question": "_iekJbaaaatrg8icaaaas"
  },
  {
    "correct": 3,
    "difficulty": -2.6492649561393757,
    "index": 4,
    "options": [
      "qZzH3baaaaKQHXmdaaaa",
      "6gmE4caaaa",
      "FNufycaaaacSUYGb",
      "Y8BtqcaaaaL8p9xaaaaa",
      "boL9raaaaaAvKU"
    ],
    "question": "NrTFXbaaaaNJvnkdaaaasZ0dUcaa"
  },
  {
    "correct": 2,
    "difficulty": -1.6789320628026756,
    "index": 5,
    "options": [
      "nbH5edaaaaV7zdb",
      "2lNladaaaaw43d6baaaa",
      "HBz8YbaaaaD-Xd1ca",
      "6EeENdaaaa8pw",
      "vwbifaaaaatwVO"
    ],
    "question": "LDVXEaaaaabNY_Saaaaa"
  },
  {
    "correct": 3,
    "difficulty": -0.9445564809099505,
    "index": 6,
    "options": [
      "YssAmaaaaaOg",
      "9S6C4caaaaxS",
      "ZRTBobaaaaSU375aa",
      "Dn-UEbaaaawVc3Fbaaaa",
      "wQ_AQdaaaafiywTb"
    ],
    "question": "AZeSgbaaaayt6DZaaaaaUG9stda"
  },
  {
    "correct": 4,
    "difficulty": -1.3930217173035788,
    "index": 7,
    "options": [
      "VJFvcaaaaaxDIlkbaa",
      "A_E_1baaaaRkxOzbaaaa",
      "VPAY7aaaaa",
      "aPcLKdaaaa9YuL2daaaa",
      "9ELdkaaaaaIi0MY"
    ],
    "question": "xVAwHaaaaacMUQKbaaaaZs6Uiaa"
  },
  {
    "correct": 3,
    "difficulty": -2.253482107576679,
    "index": 8,
    "options": [
      "3YAPNdaaaa4_LLzaaa",
      "wxJKUdaaaakY8-Jcaaa",
      "_WdjYaaaaaB58cibaa",
      "QT14dcaaaadzL",
      "BtUaabaaaa"
    ],
    "question": "DpE2ibaaaaoHTKsaaaaawelwcbaaa"
  },
  {
    "correct": 1,
    "difficulty": -1.1482973002242438,
    "index": 9,
    "options": [
      "ZFmVuaaaaa8BG",
      "hWrMgcaaaackHHPca",
      "9oh06daaaaa",
      "5olOvcaaaakz",
      "Yfb77aaaaa8edDa"
    ],
    "question": "7FRo5daaaaUAxjGdaaaaHuUJ_b"
  },
  {
    "correct": 2,
    "difficulty": -2.0016581973309,
    "index": 10,
    "options": [
      "6CZbWcaaaa_8",
      "C_FIDdaaaaJBjaYcaaaa",
      "vH6guaaaaamOSutbaaa",
      "pupGQbaaaa7WV",
      "3GXIPbaaaa"
    ],
    "question": "SazVCbaaaaxvzCmbaaaawkxBobaa"
  },
  {
    "correct": 1,
    "difficulty": -2.340303157580904,
    "index": 11,
    "options": [
      "tvYThbaaaa0xMPAbaaa",
      "pI6ChcaaaaEZ-",
      "BPUF-caaaaxPKm",
      "TzdPMbaaaaZYdcucaaa",
      "WCjJkbaaaaMmedhaaaa"
    ],
    "question": "teixOdaaaaK8iM_baaaapnQQ5aaaa"
  },
  {
    "correct": 3,
    "difficulty": -1.8262136462160923,
    "index": 12,
    "options": [
      "HDvz9caaaaV2psraa",
      "xj17ebaaaaL7pG5d",
      "JeGSgbaaaaAiWfEd",
      "FX__4daaaajojmKd",
      "He-k2daaaa0i8T8c"
    ],
    "question": "XZ6zSaaaaatUIWfdaaaabk"
  },
  {
    "correct": 4,
    "difficulty": -0.07350522567479079,
    "index": 13,
    "options": [
      "k0jbGbaaaa9D",
      "tmijvcaaaau",
      "KEH1Mbaaaa0fHl9b",
      "uOC4mdaaaa",
      "UmexAaaaaaXkj"
    ],
    "question": "XmPfFdaaaaBKgP-baaaavqo"
  },
  {
    "correct": 0,
    "difficulty": -0.8742951934178542,
    "index": 14,
    "options": [
      "G84aAbaaaa2lV",
      "2dfnrcaaaajo4uEbaaa",
      "9mVDpaaaaa",
      "hzbc0aaaaasrwEHd",
      "01bsTdaaaavaF"
    ],
    "question": "NmDt9baaaaR7l0Ibaaaawl3BMbaaa"
  },
  {
    "correct": 2,
    "difficulty": -2.247787830980572,
    "index": 15,
    "options": [
      "4jDMkbaaaaw59fxbaa",
      "BM938aaaaaKOWaO",
      "y6zLvaaaaaoxUABda",
      "FmnWRaaaaa_MlHWa",
      "i2r-hdaaaaH"
    ],
    "question": "pfLvxcaaaavk3dZdaaaaIQi"
  },
  {
    "correct": 4,
    "difficulty": -0.8215259061089193,
    "index": 16,
    "options": [
      "RplH5daaaa9BGx",
      "HJa5KcaaaahYTwcaaa",
      "F4HtXcaaaa7TbuIb",
      "yx7SPdaaaa0LR42aa",
      "aLQKKdaaaaBDEI1caaaa"
    ],
    "question": "XnKZ_daaaabOmoncaaaamzoJ"
  },
  {
    "correct": 3,
    "difficulty": -2.6246888179874217,
    "index": 17,
    "options": [
      "8xMrodaaaa",
      "Ffn-saaaaalsHr0ba",
      "mbZr_caaaa",
      "PSE-acaaaaJYXHHaaaaa",
      "zFfsEaaaaasC8gga"
    ],
    "question": "hSmScbaaaa8E-KrcaaaaLHAdYba"
  },
  {
    "correct": 4,
    "difficulty": -1.1408939779325469,
    "index": 18,
    "options": [
      "AmYPLcaaaa1QR5ebaa",
      "r2gPJdaaaaO",
      "jnqrMcaaaaMGXq",
      "mpymBdaaaakd295aaaa",
      "DlhVxbaaaa-"
    ],
    "question": "sc3GQbaaaaK6UvAbaaaaHjThV"
  },
  {
    "correct": 1,
    "difficulty": -0.43030996698106305,
    "index": 19,
    "options": [
      "38yauaaaaaNzNlpba",
      "_8gwGdaaaaz5Bhvd",
      "CqtwJcaaaaNu0d9aa",
      "9cY4taaaaazbrruaaaaa",
      "iScSLdaaaab3pB"
    ],
    "question": "VPxeXdaaaaiCZojaaaaa"
  },
  {
    "correct": 1,
    "difficulty": -1.4899188600595479,
    "index": 20,
    "options": [
      "kEEwDaaaaa",
      "8ZQtCbaaaaB3",
      "WY0Msbaaaa",
      "GdmIzdaaaaGRX",
      "yX-4Odaaaa"
    ],
    "question": "AdZy5daaaaB_BIZcaaaap_DZsaaa"
  }
])

print(result.inserted_ids)