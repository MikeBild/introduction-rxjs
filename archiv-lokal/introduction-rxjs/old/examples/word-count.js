#!/usr/bin/env node
const wordcount = {};

process.argv[2]
  .replace(/[.,?!;()"'-]/g, ' ')
  .replace(/\s+/g, ' ')
  .toLowerCase()
  .split(' ')
  .forEach(function (word) {
    if (!(wordcount.hasOwnProperty(word))) wordcount[word] = 0;
    wordcount[word]++;
  });

console.log(wordcount)