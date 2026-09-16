---
id: 7
slug: "1-5-file-i-o-data-handling"
title: "1.5 File I/O & Data Handling"
topic: "Programming Foundation"
order: 7
draft: false
---

# 1.5 File I/O & Data Handling

- Reading/writing text files with `open()` and context managers

Read file :

```python
with open("notes.txt", "r") as f:
    text = f.read()

print(text)
```

Write file :

```python
with open("notes.txt", "w") as f:
    f.write("Hello AI")
```

Append instead of overwrite:

```python
with open("notes.txt", "a") as f:
    f.write("\nNew line")
```

- Reading CSVs with `csv` module

```python
import csv

with open("models.csv", "r") as f:
    reader = csv.reader(f)

    for row in reader:
        print(row)

 ## Output
 ['name', 'score']
['GPT', '0.95']
['Llama', '0.91']
```

More convinient :

```python
with open("models.csv", "r") as f:
    reader = csv.DictReader(f)

    for row in reader:
        print(row["name"], row["score"])
```

- Reading/writing JSON: `json.load()`, `json.dump()`

```python
data = {
    "model": "GPT",
    "score": 0.95
}

import json

with open("model.json", "w") as f:
    json.dump(data, f)

## Pretty Formatting
json.dump(data, f, indent=2)
```

Read JSON:

```python
with open("model.json", "r") as f:
    data = json.load(f)

print(data["model"])
# GPT

json.dump() → Python → JSON file
json.load() → JSON file → Python
```

There are also:

These work with strings instead of files.

```python
json.dumps()
json.loads()
```

- Pickle: `pickle.dump()`, `pickle.load()`

Pickle is a way to **save Python objects into a file**, then load them back later.

```python
import pickle

model_data = {
    "name": "GPT",
    "scores": [0.9, 0.95]
}

## Save:

with open("data.pkl", "wb") as f:
    pickle.dump(model_data, f)

## Load :
with open("data.pkl", "rb") as f:
    model_data = pickle.load(f)

wb → write binary
rb → read binary
```

- `os` module: path joining, listing dirs, making dirs

### 5. `os` module

Useful for interacting with the operating system.

```python
import os

path = os.path.join("data", "train", "file.csv")

print(path)

## This is better than doing :
"data/train/file.csv"
```

because path separators differ across operating systems.

List directory:

```python
os.listdir("data")
```

Create directory:

```python
os.mkdir("output")
```

Create nested directories:

```python
os.makedirs("output/models", exist_ok=True)
```

- `pathlib.Path` - modern file path handling

6. `pathlib.Path`

This is the modern way to handle paths.

```python
from pathlib import Path

path = Path("data") / "train" / "file.csv"
```

Much cleaner than:

```python
os.path.join("data", "train", "file.csv")
```

Check if file exists:

```python
path.exists()
```

Get filename:

```python
path.name
# "file.csv"

path.suffix
# ".csv"

## Get parent:
path.parent

## Create directory:
Path("outputs").mkdir(
    parents=True,
    exist_ok=True
)

## Read text:
text = Path("notes.txt").read_text()

## Write text:
Path("notes.txt").write_text("Hello AI")
```

- `glob` - pattern matching files (useful for batch processing)

`glob` finds files matching a pattern.

Suppose you have:

```python
data/
    train1.csv
    train2.csv
    notes.txt
```

Find all CSV files:

```python
from glob import glob

files = glob("data/*.csv")

print(files)
```

Result:

```python
[
    "data/train1.csv",
    "data/train2.csv"
]
```

Recursive Search :

```python
files = Path("data").glob("**/*.csv")
```

Useful for batch processing :

```python
for file in Path("images").glob("*.jpg"):
    print(file)
```
