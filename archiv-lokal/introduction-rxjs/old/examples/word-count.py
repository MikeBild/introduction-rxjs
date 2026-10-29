#!/usr/bin/env python
import sys

wordcount={}
for word in sys.argv[1].split():
    if word not in wordcount:
        wordcount[word] = 1
    else:
        wordcount[word] += 1
print (wordcount)