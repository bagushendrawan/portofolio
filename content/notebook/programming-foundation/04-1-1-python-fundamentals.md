---
id: 3
slug: "1-1-python-fundamentals"
title: "1.1 Python Fundamentals"
topic: "Programming Foundation"
order: 3
draft: false
---

# 1.1 Python Fundamentals

## **A. Data Types & Variables**

- Integers, floats, strings, booleans, None
- Type conversion: `int()`, `float()`, `str()`, `bool()`
- `type()` and `isinstance()`
- Mutable vs immutable types - critical for AI pipelines

---

```jsx
age = 25              # int
temperature = 36.5    # float
name = "Bagus"        # str
is_active = True      # bool
result = None         # NoneType

## Truthy Falsy

bool(0)      # False
bool(1)      # True
bool("")     # False
bool("False") # True
```

```jsx
embedding = [0.12, 0.45, 0.89]

print(type(embedding))
# <class 'list'>

x = 10

print(isinstance(x, int))
# True
```

### **Mutable vs Immutable**

- Mutable : can be changed after creation.

```jsx
list
dict
set

## Example
numbers = [1, 2, 3]

numbers[0] = 100

print(numbers)
# [100, 2, 3]
```

- Immutable : cannot be changed after creation.

```jsx
int
float
str
bool
tuple
None

## Example

name = "AI"

# name[0] = "B"
# Error

## It instead create new Name
name = "AI"
name = "BI"
```

Why does it matters?

```jsx
config = {
    "temperature": 0.7,
    "max_tokens": 500
}

new_config = config

new_config["temperature"] = 0.2

## Now
print(config)

## Result
{
    "temperature": 0.2,
    "max_tokens": 500
}

## Why? Because both variables point to the same dictionary.

config ───────┐
              ↓
        {temperature: 0.2}
              ↑
new_config ───┘
```

> **This can create subtle bugs in AI pipelines.**

If you want a separate dictionary:

```jsx
new_config = config.copy();

new_config["temperature"] = 0.2;
```

```jsx
Mutable
list, dict, set
→ modify existing object

Immutable
int, float, str, bool, tuple
→ changing value creates another object
```

## **B. Strings**

- String slicing: `s[start:stop:step]`

```jsx
s = "Artificial Intelligence"

print(s[0:10])
# Artificial

s = "abcdef"

s[0:3]    # "abc"
s[:3]     # "abc"
s[3:]     # "def"
s[::2]    # "ace"
s[::-1]   # "fedcba"
```

- Methods: `split`, `join`, `strip`, `replace`, `find`, `startswith`, `endswith`

```python
words = ["AI", "Engineer", "Roadmap"]

result = " ".join(words)

print(result)
# AI Engineer Roadmap

## Same
separator.join(list)
```

```python
text = "Machine Learning"

print(text.find("Learning"))
# 8 (start index)

## If not found:

text.find("AI")
# -1
```

```python
filename = "model.json"

filename.startswith("model")
# True

filename.endswith(".json")
# True
```

- f-strings: `f"value is {x:.2f}"`

Formatting decimals:

```python
print(f"Score: {score:.2f}")
# Score: 0.93
```

- Multiline strings with triple quotes

```python
topic = "Machine Learning"

prompt = f"""
Explain this topic:

{topic}

Use simple language.
"""
```

## **C. Collections**

- Lists - indexing, slicing, `append`, `extend`, `pop`, `sort`, `reverse`

Lists are ordered and mutable.

Add one item:

```python
models.append("Mistral")
```

Add multiple items:

```python
models.extend(["Qwen","Claude"])
```

Remove and return an item:

```python
x=models.pop()
```

- Tuples - immutability and when to prefer over lists

Tuples are ordered but immutable.

```python
shape= (1024,768)
```

You can access values:

```python
shape[0]# 1024
```

But you cannot change them:

```python
shape[0]=500# Error
```

> **Prefer a tuple when the values should not change.**

- Dictionaries - CRUD, `.keys()`, `.values()`, `.items()`, `.get()`

Dictionaries store `key: value` pairs.

```python
model= {"name":"Llama","temperature":0.7,"active":True
}
```

CRUD means Create, Read, Update, Delete.

Create:

```python
model["max_tokens"]=500
```

Read:

```python
model["name"]# "Llama"
```

Update:

```python
model["temperature"]=0.2
```

Delete:

```python
delmodel["active"]
```

Useful methods:

```python
model.keys()
# dict_keys(['name', 'temperature', 'max_tokens'])

model.values()
# dict_values(['Llama', 0.2, 500])
```

`items()` gives key-value pairs:

```python
for key,value in model.items():
	print(key,value)
```

`.get()` safely reads a key:

```python
model.get("name")
# "Llama"
```

If key doesn't exist:

```python
model.get("provider")
# None
```

You can provide a default:

```python
model.get("provider","Unknown")
# "Unknown"
```

This is safer than:

```python
model["provider"]# KeyError
```

- Sets - uniqueness, union, intersection, difference

```python
skills = {"Python", "SQL", "Python"}

print(skills)
# {'Python', 'SQL'}
```

Union combines values:

```python
a = {"Python","SQL"}
b = {"Python","Docker"}

a|b
# {'Python', 'SQL', 'Docker'}
```

Intersection finds common values:

```python
a&b
# {'Python'}
```

Difference finds values only in one set:

```python
a-b
# {'SQL'}
```

Very useful for removing duplicates:

```python
ids= [1,1,2,3,3]
unique_ids=set(ids)

# {1, 2, 3}
```

- Nested collections - list of dicts, dict of lists

A very common pattern is a list of dictionaries:

```python
models = [
    {"name":"GPT","score":0.95
    },
    {"name":"Llama","score":0.91
    }
]
```

Access:

```python
models[0]["name"]
# "GPT"
```

Loop:

```python
for model in models:
	print(model["name"],model["score"])
```

Another common structure is a dictionary of lists:

```python
results =
{
"labels": ["cat","dog","bird"],
"scores": [0.9,0.08,0.02]
}
```

Access:

```python
results["scores"][0]
# 0.9
```

## **D. Control Flow**

- `if / elif / else`

```python
score = 85

if score >= 90:
    print("Excellent")
elif score >= 75:
    print("Good")
else:
    print("Needs improvement")
```

- `for` loops - iterating over lists, dicts, ranges

Loop over a list:

```python
models= ["GPT","Llama","Qwen"]
for model in models:
	print(model)
```

Loop over a dictionary:

```python
config= {
"temperature":0.7,
"max_tokens":500
}

for key,value in config.items():
	print(key,value)
```

Loop over a range:

```python
for i in range(5):
	print(i)
```

- `while` loops and `break / continue`

```python
count = 0

while count < 3:
    print(count)
    count += 1
```

- `range()`, `enumerate()`, `zip()`

```python
range(start, stop, step)

range(5)
# 0,1,2,3,4

range(2, 5)
# 2,3,4

range(0, 10, 2)
# 0,2,4,6,8
```

```python
models = ["GPT", "Llama"]

for i in range(len(models)):
    print(i, models[i])

for i, model in enumerate(models):
    print(i, model)
```

```python
models = ["GPT", "Llama", "Qwen"]
scores = [0.95, 0.91, 0.89]

for model, score in zip(models, scores):
    print(model, score)
```
