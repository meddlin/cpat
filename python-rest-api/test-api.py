from flask import Flask, json, request, jsonify
from flask_cors import CORS
import requests
# from requests import Request, Session
# from urllib.request import Request, urlopen

# "Requests for humans" (requests) package
# https://requests.readthedocs.io/en/master/user/quickstart/
# This is the package we landed on using in the end.

app = Flask(__name__)

# Enable CORS so Flask API can recieve calls from cpat-client/web browser
CORS(app)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def index():
	return "index response"

@app.route('/test', methods=['POST'])
def test():
	return "post test response"

@app.route('/test-google', methods=['GET'])
def googleTest():
	# url = 'https://google.com'
	url = 'http://localhost:5000/api/osint/test'

	## requests usage
	r = requests.get(url)
	return r.text


# Use a port, and don't enforce "hard" SSL rules. Check
# the documentation for this one. This was used in attempt
# to get it working with HTTPS auto-redirection in .NET Core
# but ended up turning it off altogether.
# https://blog.miguelgrinberg.com/post/running-your-flask-application-over-https
# app.run(port=4000, ssl_context='adhoc')

# Use port 4000 for the API
app.run(port=4000)

# Set a specific host address for the API
# app.run(host="192.168.1.44")