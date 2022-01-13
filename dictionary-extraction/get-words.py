#!/usr/bin/env python3

import re

# Script that processes the words.txt and exclude.txt files, outputting a list of 5 letter words.
# Also inserts them into dictionary.service.ts

DICTIONARY_SERVICE_PATH = "../src/app/dictionary.service.ts"

print('Finding and sorting all unique 5 letter words, without symbols...')

valid_words_set = set()  # set to store our unique words

# Read:
with open("words.txt", "r") as source:
    for line in source:
        stripped = line.strip()
        if len(stripped) == 5 and re.match("^[A-z]{5}$", stripped):
          valid_words_set.add(stripped.lower())

valid_words = sorted(valid_words_set)

# Exclude bad words:
with open("exclude.txt", "r") as source:
    for line in source:
        stripped = line.strip()
        if stripped in valid_words:
            valid_words.remove(stripped)

# Write plain:
with open("5-letter-words.txt", "w") as dest:
    for word in sorted(valid_words):
        dest.write(f'{word}\n')


# Format with quotes:
quoted_valid_words = map(lambda raw_word: f'      "{raw_word}"', valid_words)

# Join with commas and newlines:
js_formatted_valid_words = ',\n'.join(quoted_valid_words)

# Copy the words into the dictionary service source code:
with open(DICTIONARY_SERVICE_PATH, "r") as dictionary_service_file:
    dictionary_service_source = dictionary_service_file.read().splitlines()

for i in range(0, len(dictionary_service_source)):
    if re.match(".*// PYTHON SCRIPT POPULATED START.*", dictionary_service_source[i]):
        print(f'Line {1+i} of DICTIONARY_SERVICE_PATH is start of generated block')  # Add 1 for 0 indexing
        start_comment_line = i
    if re.match(".*// PYTHON SCRIPT POPULATED END.*", dictionary_service_source[i]):
        print(f'Line {1+i} of DICTIONARY_SERVICE_PATH is end of generated block')  # Add 1 for 0 indexing
        end_comment_line = i

del dictionary_service_source[start_comment_line+1:end_comment_line]  # Remove everything in between

# for i in range(0, len(js_formatted_valid_words)):
#     dictionary_service_source.insert(1+start_comment_line+i, js_formatted_valid_words[i])

dictionary_service_source.insert(1+start_comment_line, js_formatted_valid_words)

with open(DICTIONARY_SERVICE_PATH, "w") as dictionary_service_file:
    dictionary_service_file.write('\n'.join(dictionary_service_source))

