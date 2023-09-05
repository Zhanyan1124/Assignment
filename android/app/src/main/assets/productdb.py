##
# Execute this script once to create the database & table
# as well as populating it with initial data
#

import sqlite3
db = sqlite3.connect('products.sqlite')

db.execute('DROP TABLE IF EXISTS products')

db.execute('''CREATE TABLE products(
    productId integer PRIMARY KEY AUTOINCREMENT,
    productName text NOT NULL,
    category text NOT NULL,
    image text NOT NULL,
    price real NOT NULL,
    stock integer NOT NULL
)''')

cursor = db.cursor()

cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Apple','fruit','../productImg/apple.png','2.99',75)
''')

cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Orange','fruit','../productImg/orange.png','5.99',61)
''')

cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Mango','fruit','../productImg/mango.png','6.30',12)
''')

cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Broccoli','vegetable','../productImg/broccoli.png','2.25',34)
''')

cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Carrot','vegetable','../productImg/carrot.png','2.10',21)
''')

db.commit()
db.close()