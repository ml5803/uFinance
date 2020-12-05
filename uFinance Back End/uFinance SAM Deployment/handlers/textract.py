import boto3
import json

from dotenv import load_dotenv
load_dotenv()
import os

def lambda_handler(event, context):
  # Document
  print(event)
  S3_BUCKET_NAME = event.get("Records")[0].get("s3").get("bucket").get("name")
  DOCUMENT_NAME = event.get("Records")[0].get("s3").get("object").get("key")

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

# Print detected text
# response = lambda_handler({})
# for item in response["Blocks"]:
#     if item["BlockType"] == "LINE":
#         print ('\033[94m' +  item["Text"] + '\033[0m')
# {'Records': [
#   {
#     'eventVersion': '2.1', 
#     'eventSource': 'aws:s3', 
#     'awsRegion': 'us-east-1', 
#     'eventTime': '2020-12-03T22:39:50.711Z', 
#     'eventName': 'ObjectCreated:Put', 
#     'userIdentity': {'principalId': 'A2634FTC26WIKG'}, 
#     'requestParameters': {'sourceIPAddress': '96.248.113.44'}, 
#     'responseElements': {
#       'x-amz-request-id': '8CBCF96BFCF8D3B7', 
#       'x-amz-id-2': 'CxIbI1Wt6EJE8ppKpNJajyM2stYijAqtjkoiLFbEe0kUqFCgZ/xWEUiJMcI/EveFefCS1aRM9N2P8HKA1oPasRs7lhmctTgCjeD0Agp0KaM='}, 
#     's3': {'s3SchemaVersion': '1.0', 'configurationId': 'textract-trigger', 
#       'bucket': {'name': 'ufinance-image-bucket-test', 'ownerIdentity': {'principalId': 'A2634FTC26WIKG'}, 'arn': 'arn:aws:s3:::ufinance-image-bucket-test'}, 
#       'object': {'key': 'images/reciept3.png', 'size': 431451, 'eTag': 'cf5551bce9c2612d4f1a570b36f6d261', 'sequencer': '005FC9693C29667065'}}}]}