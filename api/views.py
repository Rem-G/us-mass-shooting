from flask import Flask, request, jsonify
from tools import Tools

app = Flask(__name__)
tools = Tools()

@app.route('/')
def main():
    #name = request.args.get("name", "World")
    r = tools.main()
    print(r[0])
    return r