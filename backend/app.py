from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from scraper import main
import subprocess



app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class ProductResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000))
    img = db.Column(db.String(1000))
    url = db.Column(db.String(1000))
    price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    search_text = db.Column(db.String(255))
    source = db.Column(db.String(255))
    rating = db.Column(db.String(255))
    availability = db.Column(db.String(255))

    

    def __init__(self, name, img, url, price, search_text, source, rating, availability):
        self.name = name
        self.url = url
        self.img = img
        self.price = price
        self.search_text = search_text
        self.source = source
        self.rating = rating
        self.availability = availability

class TrackedProducts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    tracked = db.Column(db.Boolean, default=True)

    def __init__(self, name, tracked=True):
        self.name = name
        self.tracked = tracked

@app.route('/')
def home():
    return 'Welcome to the Product API'

@app.route('/get_products', methods=['GET'])
def get_products():
    products = TrackedProducts.query.all()
    product_list = [{'name': product.name, 'tracked': product.tracked} for product in products]
    return jsonify(products=product_list)

@app.route('/add_product', methods=['POST'])
def add_product():
    name = request.json.get('search_text')
    tracked_product = TrackedProducts(name=name)
    db.session.add(tracked_product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully'})

@app.route('/update_product_tracked/<productName>', methods=['POST'])
def toggle_tracked_product(productName):
    tracked_product = TrackedProducts.query.filter_by(name=productName).first()
    if tracked_product is None:
        response = {'message': 'Tracked product not found'}
        return jsonify(response), 404

    print(tracked_product.tracked)
    tracked_product.tracked = not tracked_product.tracked
    print(tracked_product.tracked)
    db.session.commit()

    response = {'message': 'Tracked product toggled successfully'}
    return jsonify(response), 200

@app.route('/products/<productName>', methods=['GET'])
def get_product_results(productName):
    results = ProductResult.query.filter_by(search_text=productName).order_by(
        ProductResult.created_at.desc()).all()

    product_data = []
    for result in results:
        if (result.search_text == productName):   
            product_data.append({
                'name': result.name,
                'price': result.price,
                'url': result.url,
                'img': result.img,
                'source': result.source,
                'created_at': result.created_at,
                'search_text': result.search_text,
                'rating': result.rating,
                'availability': result.availability,
                'priceHistory': []
            })

    return jsonify(product_data)
@app.route('/tracked-products', methods=['GET'])
def get_tracked_products():
    tracked_products = TrackedProducts.query.all()

    results = []
    for product in tracked_products:
        results.append({
            'id': product.id,
            'name': product.name,
            'created_at': product.created_at,
            'tracked': product.tracked
        })

    return jsonify(results), 200

@app.route('/start_scraper/<item>', methods=['GET'])
def start_scraper(item):
    try:
        print("scraper started")
        scraped_data = main(item)  # Call the scraping function and get the scraped data

        # Extract the scraped data and create ProductResult object(s)
        for data in scraped_data:
            try:
                price = float(data['price'].replace(',', ''))  # Remove comma from price and convert to float

                product = ProductResult(
                    name=data['title'],
                    img=data["image"],  # Provide the appropriate value
                    url=data['url'],  # Provide the appropriate value
                    price=price,
                    search_text=item,
                    source="https://www.amazon.com",
                    rating=data["rating"],
                    availability=data['availability'])
                db.session.add(product)
            except Exception as e:
                print(e)
    except Exception:
            return jsonify("error"), 404
    db.session.commit()
    return jsonify("done"), 200

@app.route("/get_similar_products/<productName>", methods=["GET"])
def get_similar_products(productName):
    try:
        results = ProductResult.query.filter_by(search_text=productName).order_by(
        ProductResult.created_at.desc()).all()
        similar_products = []
        for product in results:
            if len(similar_products) >= 4:
                break
            similar_products.append({
                'name': product.name,
                'img': product.img,
                'price': product.price
                })
        return jsonify(similar_products), 200
    except Exception as error:
        return jsonify("error"), 404

            


@app.route("/update_product_result", methods=["POST"])
def update_tracked_products():
    tracked_products = TrackedProducts.query.all()

    product_names = []
    for tracked_product in tracked_products:
        name = tracked_product.name
        if not tracked_product.tracked:
            continue

        data = main(tracked_product)
        price = float(data['price'].replace(',', ''))  # Remove comma from price and convert to float

        product = ProductResult(
                name=data['title'],
                img=data["image"],  # Provide the appropriate value
                url=data['url'],  # Provide the appropriate value
                price=price,
                search_text=name,
                source="https://www.amazon.com",
                rating=data["rating"],
                availability=data['availability'])      
        product_names.append(name)

    response = {'message': 'Scrapers started successfully',
                "products": product_names}
    return jsonify(response), 200



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
