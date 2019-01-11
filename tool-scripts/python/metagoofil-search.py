import sys
import subprocess

res = subprocess.check_output([ "python", "metagoofil.py", "-d", "poolcorp.com", "-t", "doc,pdf", "-l", "200", "n", "-100", "-o", "~/git/cpat/metagoofil", "-f", "results.html" ])
