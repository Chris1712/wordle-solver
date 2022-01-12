#!/usr/bin/env python3

import re

print('Finding and sorting all unique 5 letter words, without symbols...')

valid_words_set = set()  # set to store our unqiue words

# Read:
with open("words.txt", "r") as source:
    for line in source:
        stripped = line.strip()
        if len(stripped) == 5 and re.match("^[A-z]{5}$", stripped):
          valid_words_set.add(stripped.lower())

valid_words = sorted(valid_words_set)

# Write plain:
with open("5-letter-words.txt", "w") as dest:
    for word in sorted(valid_words):
        dest.write(f'"{word}",\n')


# Format with quotes:
quoted_valid_words = map(lambda raw_word: f'"{raw_word}"', valid_words)

# Join with commas and newlines:
js_formatted_valid_words = ',\n'.join(quoted_valid_words)

# Write formatted:
with open("5-letter-words-formatted.txt", "w") as dest:
    dest.write(js_formatted_valid_words)


