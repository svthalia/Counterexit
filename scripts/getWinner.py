from pathlib import Path
from dotenv import load_dotenv
from datetime import datetime
import psycopg2
import os

dotenv_path = Path('.env.local')

load_dotenv(dotenv_path=dotenv_path)

connection = False

try:
    connection = psycopg2.connect(user=os.getenv('DBUSERNAME'),
                                  password=os.getenv('DBPASSWORD'),
                                  host="127.0.0.1",
                                  port="5432",
                                  database=os.getenv('DB'))

    print("PostgreSQL connection is open")
    cursor = connection.cursor()
    cursor.execute(
        "SELECT * FROM users INNER JOIN (SELECT pk, count(*) AS wash FROM washes GROUP BY pk) AS washesSort ON "
        "washesSort.pk = users.pk ORDER BY wash DESC LIMIT 1")
    record = cursor.fetchone()

    now = datetime.now()
    win_time = now.strftime('%m/%Y')
    print(f"Congrats: {record[0]}! You won on: {win_time} with {record[4]} washes")

    cursor.execute(f"INSERT INTO winners (pk, time, washes) VALUES ({record[2]}, '{win_time}', {record[4]})")
    connection.commit()

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
