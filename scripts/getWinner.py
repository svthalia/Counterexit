from pathlib import Path
import datetime
import psycopg2
import os


connection = False

try:
    connection = psycopg2.connect(user=os.environ['DBUSERNAME'],
                                  password=os.environ['DBPASSWORD'],
                                  host="database",
                                  port="5432",
                                  database=os.environ['DB'])

    print("PostgreSQL connection is open")
    cursor = connection.cursor()
    cursor.execute(
        "SELECT * FROM users INNER JOIN (SELECT pk, count(*) AS wash FROM washes GROUP BY pk) AS washesSort ON "
        "washesSort.pk = users.pk ORDER BY wash DESC LIMIT 1")
    record = cursor.fetchone()

    today = datetime.date.today()
    first = today.replace(day=1)
    lastMonth = first - datetime.timedelta(days=1)

    win_time = lastMonth.strftime('%m/%Y')
    print(f"Congrats: {record[0]}! You won on: {win_time} with {record[4]} washes")

    cursor.execute(f"INSERT INTO winners (pk, time, washes) VALUES ({record[2]}, '{win_time}', {record[4]})")
    connection.commit()

    cursor = connection.cursor()
    cursor.execute("DELETE FROM washes")
    connection.commit()

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
