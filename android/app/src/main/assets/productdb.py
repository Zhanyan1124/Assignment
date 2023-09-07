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
    VALUES('Apple','fruit','https://i.ibb.co/Z8SFHvF/apple.png',2.99,75)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Orange','fruit','https://i.ibb.co/PmKJHxB/orange.png',5.99,61)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Mango','fruit','https://i.ibb.co/kGT5S8G/mango.png',6.30,12)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Honeydew','fruit','https://i.ibb.co/KqmD2T8/wintermelon.png',11.20,7)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Lemon','fruit','https://i.ibb.co/RgLsWv6/lemon.png',3.50,32)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Kiwi','fruit','https://i.ibb.co/By9VXbk/kiwi.png',6.50,18)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Grape','fruit','https://i.ibb.co/LhjbmTP/grape.png',13.70,6)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Strawberry','fruit','https://i.ibb.co/60ssrKY/strawberry.png',20.10,10)
''')



cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Broccoli','vegetable','https://i.ibb.co/BPYk2Th/broccoli.png',2.25,34)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Carrot','vegetable','https://i.ibb.co/Zgcqtc4/carrot.png',2.10,21)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Celery','vegetable','https://i.ibb.co/PMSBCdm/celery.png',3.20,37)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Cucumber','vegetable','https://i.ibb.co/DgcdWn7/cucumber.png',4.10,14)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Corn','vegetable','https://i.ibb.co/kqN0QXM/food.png',2.90,23)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Potato','vegetable','https://i.ibb.co/YkQNYzs/potato.png',1.30,63)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Tomato','vegetable','https://i.ibb.co/6wCms8k/tomato.png',1.10,72)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Eggplant','vegetable','https://i.ibb.co/31mfhhy/eggplant.png',4.90,18)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Spinach','vegetable','https://i.ibb.co/P65W3cN/spinach.png',3.30,23)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Onion','vegetable','https://i.ibb.co/P5wNkYZ/onion.png',1.60,65)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Garlic','vegetable','https://i.ibb.co/3y1YstX/garlic.png',1.70,49)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Lettuce','vegetable','https://i.ibb.co/pK4wCNs/lettuce.png',4.90,10)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Cauliflower','vegetable','https://i.ibb.co/W2s097p/cauliflower.png',5.00,21)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Pumpkin','vegetable','https://i.ibb.co/Nj99J1s/pumpkin.png',8.50,15)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Chili','vegetable','https://i.ibb.co/1ZYqXYK/chili.png',2.10,32)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Mushroom','vegetable','https://i.ibb.co/zmL8jqg/mushroom.png',5.30,36)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Cabbage','vegetable','https://i.ibb.co/4Rr2qwF/cabbage.png',4.60,13)
''')



cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Potato Chips','snack','https://i.ibb.co/sCY74NF/chips.png',5.80,28)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Lollipop','snack','https://i.ibb.co/TvPjh8r/lollipop.png',2.20,13)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Candies','snack','https://i.ibb.co/9y4F6Zk/candies.png',1.00,42)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Biscuits','snack','https://i.ibb.co/CmJFFFq/cookie.png',4.90,33)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Chocolate','snack','https://i.ibb.co/82dGqqd/chocolate-bar.png',5.00,32)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Torito','snack','https://i.ibb.co/zZCGW1f/snack.png',6.80,17)
''')



cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Milk','beverage','https://i.ibb.co/bKDR0Dh/milk.png',2.80,22)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Coffee','beverage','https://i.ibb.co/McJF7XW/coffee.png',2.40,30)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('CocaCola','beverage','https://i.ibb.co/0Y1N0Wk/bottle.png',2.20,37)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Beer','beverage','https://i.ibb.co/Hgsk28t/beer-can.png',10.70,25)
''')



cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Chicken Meat','frozen','https://i.ibb.co/0jwr83S/chicken.png',9.90,17)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Beef','frozen','https://i.ibb.co/zVHsxx8/beef.png',13.70,23)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Salmon','frozen','https://i.ibb.co/kK1YpmK/salmon.png',15.60,31)
''')
cursor.execute('''
    INSERT INTO products(productName,category, image, price, stock)
    VALUES('Ice Cream','frozen','https://i.ibb.co/XzDyL9C/popsicle.png',3.50,30)
''')
db.commit()
db.close()