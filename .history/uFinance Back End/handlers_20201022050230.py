import json
import boto3

def upload_image(event, context):
  s3 = boto3.client('s3')

  return {
    'status': "Great!!"
  }