import json
import pymysql.cursors

from dotenv import load_dotenv
load_dotenv()
import os

def lambda_handler(event, context):
  EVENT_BODY = json.loads(event.get("body"))
  OP_TYPE = EVENT_BODY.get("operation")
  GROUP_ID = EVENT_BODY.get("group_id")
  GROUP_NAME = EVENT_BODY.get("group_name")
  GROUP_OWNER = EVENT_BODY.get("owner_id")
  GROUP_MEMBERS = EVENT_BODY.get("members")

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

    if OP_TYPE == "insert":
      execution_status = insert_queries(cur, conn, GROUP_NAME, GROUP_OWNER, GROUP_MEMBERS)
      if execution_status != "Success":
        execution_result = execution_status
        execution_status = False

    elif OP_TYPE == "get":
      execution_result = retrieve_queries(cur, GROUP_OWNER)

    elif OP_TYPE == "delete":
      execution_result = delete_queries(cur, conn, GROUP_ID)

    execution_status = True
  except Exception as e:
    print("Database connection failed due to {}".format(e))
    error_message = "{}".format(e)
    execution_status = False
  finally:
    conn.close()

  if execution_status:
    return {
        "statusCode": 200,
        "body": json.dumps({
            "execution_status": execution_status,
            "message": "Success",
            "execution_result": execution_result
        }),
    }
  return {
          "statusCode": 400,
          "body": json.dumps({
              "execution_status": execution_status,
              "message": error_message
          }),
      }


def insert_queries(cursor, connection, group_name, owner_id, members):
  # Adds a new group to the database.
  query = """
            INSERT INTO Expense_Groups (owner_id, group_name)
            VALUES (\"{}\", \"{}\");
          """.format(owner_id, group_name)
  cursor.execute(query)
  connection.commit()

  # Retrieve the Group ID
  query = """
            SELECT group_id FROM Expense_Groups
            WHERE group_name=\"{}\" AND owner_id=\"{}\";
          """.format(group_name, owner_id)
  cursor.execute(query)
  execution_result = cursor.fetchall()
  group_id = execution_result[0]["group_id"]

  # Add all the members
  # Find a way to optimize this query.
  query = """
            INSERT INTO Group_Members (group_id, member_id)
            VALUES (\"{}\", \"{}\")
          """
  tmp = query.format(group_id, owner_id)
  cursor.execute(tmp)
  for member in members:
    tmp = query.format(group_id, member)
    cursor.execute(tmp)
  connection.commit()
  return "Success"


def retrieve_queries(cursor, user_id):
  query = """
            SELECT group_id, group_name FROM Expense_Groups
            WHERE group_id IN (
              SELECT group_id FROM Group_Members
              WHERE member_id=\"{}\"
            );
          """.format(user_id)
  cursor.execute(query)
  execution_result = cursor.fetchall()

  return execution_result

def delete_queries(cursor, connection, group_id):
  query1 = """
            DELETE FROM Expense_Groups
            WHERE group_id={}
          """.format(group_id)
  cursor.execute(query1)

  query2 = """
            DELETE FROM Group_Members
            WHERE group_id={}
          """.format(group_id)
  cursor.execute(query2)
  connection.commit()

  return "Success"


############## Test Cases ##############
# obj = {
#   "body": """
#     {
#       \"operation\": \"get\",
#       \"owner_id\": \"jia101\"
#     }
#   """
# }
# obj = {
#   "body": """
#     {
#       \"operation\": \"insert\",
#       \"group_name\": \"Sushi Bar\",
#       \"owner_id\": \"jia101\",
#       \"members\": [\"mike\", \"dan999\", \"rohan\"]
#     }
#   """
# }
# obj = {
#   "body": """
#     {
#       \"operation\":\"delete\",
#       \"group_id\": \"3\"
#     }
#   """
# }
# print(lambda_handler(obj, None))