from flask import Flask, request, jsonify
import connexion
import pprint
from datetime import datetime
from subprocess import Popen, PIPE

app = Flask(__name__)
app.config["DEBUG"] = True
printer = pprint.PrettyPrinter(indent=4)

# Create the application instance
# app = connexion.App(__name__, specification_dir='./')

# Read the swagger.yml file to configure the endpoints
# app.add_api('swagger.yml')


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

	return jsonify(
		tool = "foo",
		result = data,
		executedAt = datetime.now()
	)


@app.route('/query-example')
def queryExample():
	queryArg = request.args.get('arg')
	return '''<h2>todo...{}</h2>'''.format(queryArg)


@app.route('/ls', methods=['GET'])
def ls():
	p = Popen(["ls", "-l"], stdout = PIPE)
	result = p.communicate()[0]

	return jsonify(
		tool = "ls",
		result = result,
		executedAt = datetime.now()
	)


@app.route('/nmap', methods=['POST'])
def nmap():
	# options = request.args.get('options')
	
	# What does this turn into when we don't have a request body?
	data = request.json
	options = ""
	for q in data:
		options = options + "{} {}".format(q, data[q]) + " "
	printer.pprint(data)

	# Decide how to invoke the tool based on if we have options
	if (options != None):
		p = Popen(["nmap", options], stdout = PIPE)
	else:
		p = Popen("nmap", stdout = PIPE)

	result = p.communicate()[0]
	printer.pprint(result)
	return jsonify(
		tool = "nmap",
		result = result,
		executedAt = datetime.now()
	)


@app.route('/metagoofil', methods=['GET'])
def metagoofil():
	p = Popen("metagoofil", stdout = PIPE)
	result = p.communicate()[0]
	printer.pprint(result)
	return jsonify(
		tool = "metagoofil",
		result = result,
		executedAt = datetime.now()
	)

app.run()