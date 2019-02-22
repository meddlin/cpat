#
# Test File
# -- This script is purely for testing purposes, and should not be 
#


from subprocess import Popen, PIPE

import pprint

printer = pprint.PrettyPrinter(indent = 4)

# inputParams = sys.argv[1]
# params = inputParams.split(' ')

# printer.pprint("Running: " + inputParams)

res = Popen([ "python", "/home/meddlin/git/tools/metagoofil/metagoofil.py", "-d", "poolcorp.com", "-t", "doc,pdf", "-l", "200", "-n", "100", "-o", "/home/meddlin/git/cpat/tool-data/metagoofil2", "-f", "results.html"], stdout = PIPE)
printer.pprint(res.communicate()[0])

while res.poll() is None:
    time.sleep(0.5)

printer.pprint("completed metagoofil run")