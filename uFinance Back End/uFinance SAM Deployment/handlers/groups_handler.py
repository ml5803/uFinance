import json

def lambda_handler(event, context):
  EVENT_BODY = json.loads(event.get("body"))
  GROUP_NAME = EVENT_BODY.get("group_name")
  GROUP_MEMBERS = EVENT_BODY.get("members")