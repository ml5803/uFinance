import json
import re
import pymysql.cursors

from dotenv import load_dotenv
load_dotenv()
import os

def lambda_handler(event, context):
    # Parameter variables
    EVENT_BODY = json.loads(event.get("body"))
    USERNAME = EVENT_BODY.get("username")
    PASSWORD = EVENT_BODY.get("password")
    login_status = False
    ENDPOINT = os.environ.get('db_endpoint')
    USR = os.environ.get('usr')
    PORT = int(os.environ.get('port'))
    REGION = os.environ.get('region')
    DB_PASS = os.environ.get('db_pass')
    DBNAME = os.environ.get('db_name')

    login_status = False
    
    # Useful variables
    error_message = ""
    # email_regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    username_regex = '[\^\'\"?\.\ \@]'
    pass_regex = '[\^\'\"?\.\ ]'

    # Basic input sanitization
    if re.search(username_regex, USERNAME):
        error_message = "Improper username input"
        login_status = False
    else:
        login_status = True

    if not login_status:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "register_status": login_status,
                "message": error_message,
            })
        }

    if re.search(pass_regex, PASSWORD):
        error_message = "Improper Password: Invalid character input"
        login_status = False
    else:
        login_status = True

    if not login_status:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "login_status": login_status,
                "message": error_message,
            })
        }

    # Check if account exists
    query_results = None
    try:
        conn =  pymysql.connect(host=ENDPOINT, user=USR, passwd=DB_PASS, port=PORT, database=DBNAME)
        cur = conn.cursor()
        query = """
                SELECT * FROM Users
                WHERE user_id=\"{}\" AND password=\"{}\";
                """.format(USERNAME, PASSWORD)
        cur.execute(query)
        query_results = cur.fetchall()
        if len(query_results) == 0:
            login_status = False
            error_message = "DNE"
        else:
            login_status = True
    except Exception as e:
        print("Database connection failed due to {}".format(e))
        login_status = False

    if login_status:
        return {
            "statusCode": 200,
            "body": json.dumps({
                "login_status": login_status,
                "user_id": query_results[0][0]
            })
        }
    return json.dumps({
            "statusCode": 400,
            "body": {
                "login_status": login_status,
                "message": error_message
            }
        })


# print(lambda_handler({
#     "body": "{\"username\": \"test123\", \"password\": \"12345\"}"
#     }, None)
# )
