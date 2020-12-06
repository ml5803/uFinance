import boto3
import json

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

  # Amazon Textract client
  textract = boto3.client('textract', region_name=REGION)

  # Call Amazon Textract
  response = ""
  try:
    response = textract.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': S3_BUCKET_NAME,
                'Name': DOCUMENT_NAME
            }
        })
  except Exception as e:
    print("The error is: {}".format(e))

  return json.dumps({
            "statusCode": 400,
            "body": {
                "response": response
            }
        })


####### Test #######
# obj = {
#   "body": """{
#     \"url\": \"https://ufinance-image-bucket-test.s3.amazonaws.com/images/reciept.jpg\"
#   }"""
# }
# print(lambda_handler(obj, None));