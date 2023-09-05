import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'products.sqlite'


def get_row_as_dict(row):
    row_dict = {
        'productId': row[0],
        'productName': row[1],
        'category': row[2],
        'image': row[3],
        'price': row[4],
        'stock': row[5],
    }

    return row_dict


app = Flask(__name__)


@app.route('/api/products', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM products')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/products/<int:id>', methods=['GET'])
def show(id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM products WHERE productId=?', (str(id),))
    row = cursor.fetchone()
    db.close()
    print(row)
    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

@app.route('/api/products/<string:category>', methods=['GET'])
def showByCat(category):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM products WHERE category=?', (category,))
    rows = cursor.fetchall()
    db.close()
    print(rows)
    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)