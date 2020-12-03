import boto3

from dotenv import load_dotenv
load_dotenv()
import os

def lambda_handler(event, context):
  # Document
  S3_BUCKET_NAME = event.get("Records")[0].get("s3").get("bucket").get("name")
  DOCUMENT_NAME = event.get("Records")[0].get("object").get("key")

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

# # Print detected text
# for item in response["Blocks"]:
#     if item["BlockType"] == "LINE":
#         print ('\033[94m' +  item["Text"] + '\033[0m')