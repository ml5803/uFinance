import json
import re
import pymysql.cursors
import datetime

from dotenv import load_dotenv
load_dotenv()
import os

##### Needed #####
# Check for similar username or email.
# Encrypt the password with SHA256.

def lambda_handler(event, context):
    # Parameter variables
    EVENT_BODY = json.loads(event.get("body"))
    EMAIL = EVENT_BODY.get("email")
    PASSWORD = EVENT_BODY.get("password")
    USERNAME = EVENT_BODY.get('username')
    FIRST_NAME = EVENT_BODY.get('first_name')
    LAST_NAME = EVENT_BODY.get('last_name')
    register_status = False

    # ENV Variables
    ENDPOINT = os.environ.get('db_endpoint')
    USR = os.environ.get('usr')
    PORT = int(os.environ.get('port'))
    REGION = os.environ.get('region')
    DB_PASS = os.environ.get('db_pass')
    DBNAME = os.environ.get('db_name')

    # Useful Variables
    error_message = ""
    email_regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    pass_regex = '[\^\'\"?\.\ ]'

    # Basic input sanitization
    # Email
    if re.search(email_regex, EMAIL):
        register_status = True
    else:
        error_message = "Improper email input"
        register_status = False

    if not register_status:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "register_status": register_status,
                "message": error_message,
            })
        }

    # Password
    if re.search(pass_regex, PASSWORD):
        error_message = "Imporper Password:Invalid character input"
        register_status = False
    else:
        register_status = True

    if not register_status:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "register_status": register_status,
                "message": error_message,
            })
        }

    # Username
    if re.search(pass_regex, PASSWORD):
        error_message = "Imporper ID:Invalid character input"
        register_status = False
    else:
        register_status = True

    if not register_status:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "register_status": register_status,
                "message": error_message,
            })
        }

    # First Name
    if re.search(pass_regex, FIRST_NAME):
        error_message = "Improper FName:Invalid character input"
        register_status = False
    else:
        register_status = True

    if not register_status:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "register_status": register_status,
                "message": error_message,
            })
        }

    # Last Name
    if re.search(pass_regex, FIRST_NAME):
        error_message = "Improper LName:Invalid character input"
        register_status = False
    else:
        register_status = True

    if not register_status:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "register_status": register_status,
                "message": error_message,
            })
        }

    #Datetime
    dt = datetime.datetime.now()

    # Add account to the database.
    try:
        conn =  pymysql.connect(host=ENDPOINT, user=USR, passwd=DB_PASS, port=PORT, database=DBNAME)
        cur = conn.cursor()
        query = """
                INSERT INTO Users (user_id, password, email, first_name, last_name, date_joined)
                VALUES (\"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\");
                """.format(USERNAME, PASSWORD, EMAIL, FIRST_NAME, LAST_NAME, dt)
        cur.execute(query)
        conn.commit()
    except Exception as e:
        print("Database connection failed due to {}".format(e))
        error_message = "Database connection error"
        register_status = False
    finally:
        conn.close()

    if register_status:
        return {
            "statusCode": 200,
            "body": json.dumps({
                "register_status": register_status,
                "message": "Success"
            }),
        }
    return {
            "statusCode": 400,
            "body": json.dumps({
                "register_status": register_status,
                "message": error_message
            }),
        }