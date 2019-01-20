import glob, os
import sys

# Taken from here: https://stackoverflow.com/questions/3964681/find-all-files-in-a-directory-with-extension-txt-in-python

# os.chdir("/home/meddlin/git/cpat/tool-scripts/python")
# for file in glob.glob("*.py")
# 	print(file)

import os
for root, dirs, files in os.walk("/home/meddlin/git/cpat/tool-scripts/python"):
	for file in files:
		if file.endswith(".py"):
			print(os.path.join(root, file))

sys.stdout.flush()