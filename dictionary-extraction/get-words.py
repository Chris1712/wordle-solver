#!/usr/bin/env python3

import re

print('Finding and sorting all unique 5 letter words, without symbols...')

valid_words = set()  # set to store our unqiue words

# Read:
with open("words.txt", "r") as source:
    for line in source:
        stripped = line.strip()
        if len(stripped) == 5 and re.match("^[A-z]{5}$", stripped):
            valid_words.add(stripped.lower())

# Write:
with open("5-letter-words.txt", "w") as dest:
    for word in sorted(valid_words):
        dest.write(word + "\n")


