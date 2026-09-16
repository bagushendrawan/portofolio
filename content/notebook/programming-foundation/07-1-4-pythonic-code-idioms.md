---
id: 6
slug: "1-4-pythonic-code-idioms"
title: "1.4 Pythonic Code & Idioms"
topic: "Programming Foundation"
order: 6
draft: false
---

# 1.4 Pythonic Code & Idioms

- List, dict, set comprehensions

```python
nums = [1, 2, 3, 4]

squares = [x * x for x in nums]
# [1, 4, 9, 16]
```

With conditions :

```python
evens = [x for x in nums if x % 2 == 0]
# [2, 4]
```

Dict Comprehension :

```python
squares = {x: x * x for x in nums}
# {1: 1, 2: 4, 3: 9, 4: 16}
```

Set Comprehension :

```python
nums = [1, 1, 2, 2, 3]

unique = {x for x in nums}
# {1, 2, 3}
```

- Generator expressions - memory efficient for large datasets

Very similar to list comprehension:

```python
squares = (x * x for x in range(1000000))
```

produces values only when requested.

```python
for x in squares:
    print(x)
```

- `map()`, `filter()`, `reduce()`

Transform every item.

```python
nums = [1, 2, 3]

result = map(lambda x: x * 2, nums)

list(result)
# [2, 4, 6]
```

Equivalent Pythonic version:

```python
[x * 2 for x in nums]
```

### `filter()`

Keep items matching a condition.

```python
nums = [1, 2, 3, 4]

result = filter(lambda x: x % 2 == 0, nums)

list(result)
# [2, 4]

## Same As :
[x for x in nums if x % 2 == 0]
```

### `reduce()`

Combine many values into one.

```python
from functools import reduce

nums = [1, 2, 3, 4]

result = reduce(lambda a, b: a + b, nums)

# reduce(lambda total, current: total + current, nums)
# 10
```

- Unpacking: `a, b, *rest = lst`

```python
lst = [10, 20, 30, 40, 50]
a, b, *rest = lst
```

- `any()`, `all()`, `sorted()` with `key=`

### `any()`

Returns `True` if at least one condition is true.

```python
scores = [0.4, 0.6, 0.95]

any(x > 0.9 for x in scores)
# True
```

### `all()`

Returns `True` only if every condition is true.

```python
scores = [0.8, 0.9, 0.95]

all(x > 0.7 for x in scores)
# True
```

`sorted()` with `key=`

```python
models = [
    {"name": "GPT", "score": 0.95},
    {"name": "Llama", "score": 0.91}
]

result = sorted(
    models,
    key=lambda x: x["score"]
)

## Highest first
result = sorted(
    models,
    key=lambda x: x["score"],
    reverse=True
)
```

- `collections` module: `Counter`, `defaultdict`, `deque`

### `Counter`

Counts occurrences.

```python
from collections import Counter

labels = ["cat", "dog", "cat", "cat"]

counts = Counter(labels)

## Result
Counter({"cat": 3, "dog": 1})
```

### `defaultdict`

Automatically creates a default value for missing keys.

```python
from collections import defaultdict

groups = defaultdict(list)

groups["AI"].append("GPT")
groups["AI"].append("Llama")
```

Without `defaultdict`, you'd normally need:

```python
if "AI" not in groups:
    groups["AI"] = []
```

### `deque`

A fast queue.

```python
from collections import deque

queue = deque()

queue.append("task1")
queue.append("task2")

## Remove first item:
queue.popleft()
# "task1"

## You can operate on both sides:
queue.appendleft("urgent")
queue.pop()
```
