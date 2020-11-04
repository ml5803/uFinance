import json

# import requests

def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "login_status": "true",
        }),
    }
