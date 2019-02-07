import sys
import subprocess
import time
from subprocess import Popen, PIPE
import os
import uuid
import datetime
from pymongo import MongoClient

# toolDataLocation = "/home/meddlin/git/cpat/tool-data" + "/" + "Target_metagoofil_" + date.today()

# res = subprocess.check_output([ "python", "metagoofil.py", "-d", "poolcorp.com", "-t", "doc,pdf", "-l", "200", "n", "-100", "-o", "~/git/cpat/metagoofil", "-f", "results.html" ])
res = Popen([ "python", "/home/meddlin/git/tools/metagoofil/metagoofil.py", "-d", "poolcorp.com", "-t", "doc,pdf", "-l", "200", "-n", "100", "-o", "/home/meddlin/git/cpat/tool-data/metagoofil2", "-f", "results.html"], stdout = PIPE)

while res.poll() is None:
    time.sleep(0.5)

# input params [domain]
# 	-- relate params.domain -> {Target._id}

# dump files to directory
# 
# iterate over them
# 	relate to {Target._id}
# 	
# 	--> detect what type of files are retrieved
# 	--> PDFs
# 		- detect if English?
# 		- pull out text into "blobs" for web viewing, search, use, etc.
# 		- determine which PDFs are "similar" to each other
# 	--> Spreadsheets
# 		- make viewable? (convert to CSV, or pull into tabled data)

client = MongoClient('mongodb://127.0.0.1:3001')
db = client.meteor

# Iterates over the files from a 'run'
for root, dirs, files in os.walk("/home/meddlin/git/cpat/tool-data/metagoofil"):
	for file in files:
		if file.endswith(".pdf"):
			# print(os.path.join(root, file)) # this gets the file name
			
			fileName = os.path.join(root, file)
			
			data = { 
				'_id': str(uuid.uuid4()),
				'fileName': fileName,
				'fileSize': os.path.getsize(fileName), # this is in bytes
				'fileType': os.path.splitext(fileName)[1],
				'fileLocation': fileName,
				'relations': '',
				'dateAnalyzed': '',
				'dateCreated': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
				}
			print(data)
			sys.stdout.flush()

			resId = db.filedata.insert_one(data)
			print(resId)
			sys.stdout.flush()



		if file.endswith(".doc"):
			print("found .doc type")

		if file.endswith(".docx"):
			print("found .docx type")

		if file.endswith(".xls"):
			print("found .xls type")

		if file.endswith(".xlsx"):
			print("found .xlsx type")