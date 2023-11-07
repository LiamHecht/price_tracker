import scheduler
import sqlite3

cnt = sqlite3.connect("database.db")
cnt.execute('''CREATE TABLE IF NOT EXISTS configuration ( website TEXT, email TEXT, password TEXT,hash_password TEXT)''')
cnt.cursor()
