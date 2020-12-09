import boto3
import json
import re

from dotenv import load_dotenv
load_dotenv()
import os

def lambda_handler(event, context):
  # Document
  EVENT_BODY = json.loads(event.get("body"))
  URL = EVENT_BODY.get("url")
  URL_BODY = URL[8:]
  body_split = URL_BODY.split('/')
  S3_BUCKET_NAME = body_split[0].split('.')[0]
  
  DOCUMENT_NAME = "/"
  DOCUMENT_NAME = DOCUMENT_NAME.join(body_split[1:])

  # ENV Variables
  REGION = os.environ.get("region")

  #Useful Vars
  error_flag = False

  # Amazon Textract client
  textract = boto3.client('textract', region_name=REGION)

  # Call Amazon Textract
  response = ""
  try:
    response = textract.analyze_document(
        Document={
            'S3Object': {
                'Bucket': S3_BUCKET_NAME,
                'Name': DOCUMENT_NAME
            }
        },
        FeatureTypes=["FORMS"])
  except Exception as e:
    response = "The error is: {}".format(e)
    print(response)
    error_flag = True

  if error_flag:
    return {
            "statusCode": 400,
            "body": json.dumps({
                "response": response
            })
        }


  # {
  #       "name": item name,
  #       "total_item_cost": item cost
  #       "quantity": decimal number
  #    }
  result = {
    "place": "",
    "total_cost": "",
    "url": URL,
    "items": []
  }
  blocks = response.get("Blocks")
  line_count = 0

  for i in range(len(blocks)):
    if blocks[i].get("BlockType") == "LINE":
      line_count+=1
    if blocks[i].get("BlockType") == "LINE" and line_count == 1:
      result["place"] = blocks[i].get("Text")
    if blocks[i].get("BlockType") == "LINE" and re.search("TOTAL", blocks[i].get("Text")):
      result["total_cost"] = blocks[i+1].get("Text")
      break

  return {
            "statusCode": 200,
            "body": json.dumps({
                "response": result
            })
        }


####### Test #######
# obj = {
#   "body": """{
#     \"url\": \"https://ufinance-image-bucket-test.s3.amazonaws.com/photos/f2d9b919-3f91-4cb8-8ce8-07e90805f071.jpg\"
#   }"""
# }
# resp = lambda_handler(obj, None)
# print(resp)