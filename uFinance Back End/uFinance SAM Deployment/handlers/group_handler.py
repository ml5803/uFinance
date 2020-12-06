import json
import pymysql.cursors

from dotenv import load_dotenv
load_dotenv()
import os

def lambda_handler(event, context):
  EVENT_BODY = json.loads(event.get("body"))
  OP_TYPE = EVENT_BODY.get("operation")
  GROUP_ID = EVENT_BODY.get("group_id")
  CHANGEED_NAME = EVENT_BODY.get("group_name")
  ADD_MEMBERS = EVENT_BODY.get("add_members")
  REMOVE_MEMBERS = EVENT_BODY.get("remove_members")

  # ENV Variables
  ENDPOINT = os.environ.get('db_endpoint')
  USR = os.environ.get('usr')
  PORT = int(os.environ.get('port'))
  REGION = os.environ.get('region')
  DB_PASS = os.environ.get('db_pass')
  DBNAME = os.environ.get('db_name')

  # Useful Variables
  error_message = ""
  execution_status = False
  execution_result = None

  # Add groups to the database.
  conn =  pymysql.connect(host=ENDPOINT, user=USR, passwd=DB_PASS, port=PORT, database=DBNAME)
  try:
    cur = conn.cursor(pymysql.cursors.DictCursor)
    if OP_TYPE == "get":
      execution_result = retrieve_queries(cur, GROUP_ID)
    elif OP_TYPE == "modify":
      execution_result = modify_queries(cur, conn, GROUP_ID, CHANGEED_NAME, ADD_MEMBERS, REMOVE_MEMBERS)

    execution_status = True
  except Exception as e:
    print("Database connection failed due to {}".format(e))
    error_message = "{}".format(e)
    execution_status = False

  if execution_status:
    return {
      "status": 200,
      "body": {
        "execution_status": execution_status,
        "execution_result": execution_result,
        "error_message": ""
      }
    }
  
  return {
    "status": 400,
      "body": {
        "execution_status": execution_status,
        "execution_result": "",
        "error_message": error_message
      }
  }


def retrieve_queries(cursor, group_id):
  query = """
    SELECT member_id FROM Group_Members
    WHERE group_id=\"{}\";
  """.format(group_id)
  cursor.execute(query)
  members = cursor.fetchall()
  return members


def modify_queries(cur, conn, group_id, changed_name, add_members, remove_members):
  if changed_name is not None:
    query = """
      UPDATE Expense_Groups
      SET group_name={}
      WHERE group_id={};
    """.format(changed_name, group_id)
    cur.execute(query)

  if len(add_members) > 0:
    query = """
            INSERT INTO Group_Members (group_id, member_id)
            VALUES (\"{}\", \"{}\")
          """
    for member in add_members:
      tmp = query.format(group_id, member)
      cur.execute(tmp)

  if len(remove_members) > 0:
    query = """
              DELETE FROM Group_Members
              WHERE group_id=\"{}\" AND member_id IN \"{}\"
            """.format(group_id, remove_members)
    cur.execute(query)
  
  curr.commit()

  return True


# obj = {
#   "body": """
#     {
#       \"operation\": \"get\",
#       \"group_id\": \"7\"
#     }
#   """
# }

# print(lambda_handler(obj, None))