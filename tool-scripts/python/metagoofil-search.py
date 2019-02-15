import sys
import subprocess
import time
from subprocess import Popen, PIPE
import os
import uuid
import datetime
from pymongo import MongoClient

# toolDataLocation = "/home/meddlin/git/cpat/tool-data" + "/" + "Target_metagoofil_" + date.today()

inputParams = sys.argv[1]
params = inputParams.split(' ')

print("params: ")
print(params)
sys.stdout.flush()

# targets => 'targets:_id-1,_id-2'

paramsForScript = ["python"]
paramsForScript.extend(params)

print("params for script: ")
print(paramsForScript)
sys.stdout.flush()

res = Popen(paramsForScript, stdout = PIPE)
# res = Popen([ "python", "/home/meddlin/git/tools/metagoofil/metagoofil.py", "-d", "poolcorp.com", "-t", "doc,pdf", "-l", "200", "-n", "100", "-o", "/home/meddlin/git/cpat/tool-data/metagoofil2", "-f", "results.html"], stdout = PIPE)

while res.poll() is None:
    time.sleep(0.5)

client = MongoClient('mongodb://127.0.0.1:3001')
db = client.meteor

storageDir = params[params.index('-o') + 1]
print("storageDir: ")
print(storageDir)
sys.stdout.flush()

# Iterates over the files from a 'run'
# for root, dirs, files in os.walk("/home/meddlin/git/cpat/tool-data/metagoofil"):
for root, dirs, files in os.walk(storageDir):
	for file in files:
		if file.endswith(".pdf"):			
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

			# for t in targets:
			# 	targetRelResId = db.targets.update_one({ _id: t._id }, 
			# 						{ 
			# 							$push: 
			# 							{ relations: 
			# 								{ collectionName: 'filedata', documentId: resid } 
			# 							} 
			# 						}, { multi: True })
			# 	print(targetRelResId)

			# sys.stdout.flush()



		if file.endswith(".doc"):
			print("found .doc type")

		if file.endswith(".docx"):
			print("found .docx type")

		if file.endswith(".xls"):
			print("found .xls type")

		if file.endswith(".xlsx"):
			print("found .xlsx type")

# TODO
# 	--> detect what type of files are retrieved
# 	--> PDFs
# 		- detect if English?
# 		- pull out text into "blobs" for web viewing, search, use, etc.
# 		- determine which PDFs are "similar" to each other
# 	--> Spreadsheets
# 		- make viewable? (convert to CSV, or pull into tabled data)