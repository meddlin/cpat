from flask import Flask, request, jsonify
from flask_cors import CORS
import pprint
from subprocess import Popen, PIPE
import requests

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True
printer = pprint.PrettyPrinter(indent=4)


@app.route('/', methods=['GET'])
def home():
	return "<h1>Python API worked</h1>"


# Experiementing with parsing JSON request body
# - How to convert JSON request body into bash/CLI compatible options list
# - Some of the, interpreting the produced "options string" is still going 
# 		to be up to the individual tool
@app.route('/foo', methods=['POST'])
def foo():
	data = request.json
	printer.pprint(data)

	for q in data:
		printer.pprint("{}={}".format(q, data[q]))

	return jsonify(data)


@app.route('/query-example')
def queryExample():
	queryArg = request.args.get('arg')
	return '''<h2>todo...{}</h2>'''.format(queryArg)


@app.route('/ls', methods=['GET'])
def ls():
	p = Popen(["ls", "-l"], stdout = PIPE)
	result = p.communicate()[0]
	printer.pprint(result)
	return result


@app.route('/nmap', methods=['POST'])
def nmap():
	# options = request.args.get('options')

	# What does this turn into when we don't have a request body?
	# data = request.json
	# options = ""
	# for q in data:
	# 	options = options + "{} {}".format(q, data[q]) + " "
	# printer.pprint(data)

	# # Decide how to invoke the tool based on if we have options
	# if (options != None):
	# 	p = Popen(["nmap", options], stdout = PIPE)
	# else:
	# 	p = Popen("nmap", stdout = PIPE)

	p = Popen(["nmap", "-v"], stdout = PIPE)
	result = p.communicate()[0]
	printer.pprint(result)

	url = 'http://localhost:5000/api/osint/nmapdata'
	req_payload = {"payload": "test data after nmap"}
	r = requests.post(url, headers={'mode': 'cors'}, json=req_payload)
	printer.pprint("called cpat-core API")
	printer.pprint(r.text)
	return result


@app.route('/metagoofil', methods=['GET'])
def metagoofil():
	p = Popen("metagoofil", stdout = PIPE)
	result = p.communicate()[0]
	printer.pprint(result)
	return result

# app.run(host='0.0.0.0')
app.run(port=4000)