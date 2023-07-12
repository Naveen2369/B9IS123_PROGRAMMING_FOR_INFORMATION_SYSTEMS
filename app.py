from flask import Flask
import sqlite3

DATABASE = 'database.db'
app = Flask(__name__)

def create_tables():
    conn = sqlite3.connect(DATABASE)
    conn.close()

@app.route('/create_database')
def route_create_database():
    create_tables()
    return 'Database is created'

if __name__ == '__main__':
    create_tables()
    app.run()