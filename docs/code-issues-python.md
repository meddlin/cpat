## Python Notes

**Currently: get a metagoofil search kicked off from clien-side JS**

- Name: /home/meddlin/git/cpat/tool-scripts/python/metagoofil-search.py
- Cmd: -d poolcorp.com -t doc,pdf -l 200 -n 100 -o /home/meddlin/git/cpat/tool-data/metagoofil2 -f results.html
- Path: /home/meddlin/git/tools/metagoofil/metagoofil.py

- cmd: -d poolcorp.com -t doc,pdf -l 25 -n 10 -o /home/meddlin/git/cpat/tool-data/metagoofil2 -f results.html

**Format datetime to string**

```python
import datetime

datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
```

Ref: [https://stackoverflow.com/questions/7999935/python-datetime-to-string-without-microsecond-component](https://stackoverflow.com/questions/7999935/python-datetime-to-string-without-microsecond-component)

More on `strftime()`

[https://www.programiz.com/python-programming/datetime/strftime](https://www.programiz.com/python-programming/datetime/strftime)

**Pull file type from file location string**

```python
os.path.splitext('file-name-here')
```

Ref: [https://stackoverflow.com/questions/541390/extracting-extension-from-filename-in-python](https://stackoverflow.com/questions/541390/extracting-extension-from-filename-in-python)


**subprocess: Popen vs. call**

A useful distinction

Ref: [https://stackoverflow.com/questions/7681715/whats-the-difference-between-subprocess-popen-and-call-how-can-i-use-them](https://stackoverflow.com/questions/7681715/whats-the-difference-between-subprocess-popen-and-call-how-can-i-use-them)