from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import resolve1

file = open('/home/meddlin/git/cpat/metagoofil/REVELLE.pdf', 'rb')
parser = PDFParser(file)
document = PDFDocument(parser)

# this line found here: 
# 	https://stackoverflow.com/questions/45841012/how-can-i-get-the-total-count-of-total-pages-of-a-pdf-using-pdfminer-in-python?rq=1
print(resolve1(document.catalog['Pages'])['Count'])