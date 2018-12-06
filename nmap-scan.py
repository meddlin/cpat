import xmltodict
import pprint
import json
import sys

import subprocess

from pymongo import MongoClient

# Credit ---
# https://stackoverflow.com/questions/3777301/how-to-call-a-shell-script-from-python-code

# Also...
# https://xael.org/pages/python-nmap-en.html

subprocess.call(['./nmap-sample.sh'])