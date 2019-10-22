import flask
import pprint
from subprocess import Popen, PIPE

app = flask.Flask(__name__)
app.config["DEBUG"] = True
printer = pprint.PrettyPrinter(indent=4)

@app.route('/', methods=['GET'])
def home():
	return "<h1>Python API worked</h1>"

@app.route('/nmap', methods=['GET'])
def nmap():
	p = Popen("nmap", stdout = PIPE)
	result = p.communicate()[0]
	printer.pprint(result)
	return result

@app.route('/metagoofil', methods=['GET'])
def metagoofil():
	p = Popen("metagoofil", stdout = PIPE)
	result = p.communicate()[0]
	printer.pprint(result)
	return result

app.run()