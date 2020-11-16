from flask import Flask, request, jsonify
from flask_cors import CORS
from tools import Tools

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

tools = Tools()

@app.route('/')
def main():
    #name = request.args.get("name", "World")
    r = tools.main()
    return r