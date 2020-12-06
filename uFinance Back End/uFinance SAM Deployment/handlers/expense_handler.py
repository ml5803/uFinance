import json
import re
import pymysql.cursors
import datetime

from dotenv import load_dotenv
load_dotenv()
import os

##### Needed #####

def lambda_handler(event, context):
    # Parameter variables
    EVENT_BODY = json.loads(event.get("body"))
    OPERATION_TYPE = EVENT_BODY.get("operation") #insert, get, delete
    EXPENSE_ID = EVENT_BODY.get("expense_id")
    MEMBER_ID = EVENT_BODY.get("member_id")
    GROUP_ID = EVENT_BODY.get("group_id")
    EXPENSE_NAME = EVENT_BODY.get("expense_name")
    EXPENSE_AMT = EVENT_BODY.get("expense_amt")
    PROOF = EVENT_BODY.get("proof")
    
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

    #Datetime
    dt = datetime.datetime.now()

    # Add expense to the database.
    try:
        conn =  pymysql.connect(host=ENDPOINT, user=USR, passwd=DB_PASS, port=PORT, database=DBNAME)
        cur = conn.cursor(pymysql.cursors.DictCursor)
        query = query_maker(OPERATION_TYPE, EXPENSE_ID, GROUP_ID, MEMBER_ID, dt, EXPENSE_NAME, EXPENSE_AMT, PROOF)
        cur.execute(query)
        execution_result = cur.fetchall()
        conn.commit()
        execution_status = True
    except Exception as e:
        print("Database connection failed due to {}".format(e))
        error_message = "{}".format(e)
    finally:
        conn.close()

    if execution_status:
        return {
            "statusCode": 200,
            "body": json.dumps({
                "execution_status": execution_status,
                "message": "Success",
                "execution_result": str(execution_result)
            }),
        }
    return {
            "statusCode": 400,
            "body": json.dumps({
                "execution_status": execution_status,
                "message": error_message
            }),
        }

def query_maker(op_type, expense_id, group_id, member_id, dt, expense_name, expense_amt, proof):
    qry = ""

    if op_type == "insert":
        qry = """
                INSERT INTO Expenses (group_id, member_id, date_entered, expense_name, expense_amount, proof)
                VALUES (\"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\");
            """.format(group_id, member_id, dt, expense_name, expense_amt, proof)
    elif op_type == "get":
        qry = """
                SELECT expense_id, group_id, member_id, DATE_FORMAT(date_entered, '%m:%d:%Y %T') as date_entered, 
                expense_name, CONVERT(expense_amount, CHAR) as expense_amt, proof
                FROM Expenses 
                WHERE group_id = \"{}\";
            """.format(group_id)
    elif op_type == "delete":
        qry = """
                DELETE FROM Expenses 
                WHERE expense_id = \"{}\";
            """.format(expense_id)

    return qry

print(lambda_handler({'body':'{"operation":"get", "group_id": "mikegroup" }'},None))