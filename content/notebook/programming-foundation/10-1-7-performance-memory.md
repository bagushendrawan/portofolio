---
id: 9
slug: "1-7-performance-memory"
title: "1.7 Performance & Memory"
topic: "Programming Foundation"
order: 9
draft: false
---

# 1.7 Performance & Memory

- Generators and `yield` - critical for streaming AI responses
  A generator produces values **one at a time** instead of storing everything in memory.

```python
def numbers():
    yield 1
    yield 2
    yield 3
```

```python
for x in numbers():
    print(x)
```

- `itertools` module

`itertools` provides efficient tools for iterating over data.
Example: `chain()`

```python
from itertools import chain

a = [1, 2]
b = [3, 4]

result = chain(a, b)

print(list(result))
# [1, 2, 3, 4]
```

`islice()` lets you slice an iterator:

```python
from itertools import islice

nums = range(1000000)

first_five = islice(nums, 5)

print(list(first_five))
# [0, 1, 2, 3, 4]
```

`combinations()`:

```python
from itertools import combinations

items = ["A", "B", "C"]

print(list(combinations(items, 2)))
```

Result:

```python
[("A", "B"), ("A", "C"), ("B", "C")]
```

- `timeit` and `cProfile` for benchmarking

Measures execution speed.

```python
import timeit

result = timeit.timeit(
    "sum(range(1000))",
    number=10000
)

print(result)
```

It runs the code many times to get a more reliable measurement.

Useful for comparing approaches:

```python
timeit.timeit(
    "[x * 2 for x in range(1000)]",
    number=10000
)
```

Use `timeit` for small performance tests.

### 4. `cProfile`

Profiles an entire program or function.

```python
import cProfile

def process():
    total = 0

    for i in range(1000000):
        total += i

cProfile.run("process()")
```

It tells you:

- which functions were called
- how many times
- how much time each took

Think:

```python
timeit   → benchmark small code
cProfile → find slow parts of larger code
```

- Shallow vs deep copy

Shallow Copy

```python
original = [
    [1, 2],
    [3, 4]
	]
```

```python
import copy

copied = copy.copy(original)
```

The outer list is copied, but inner objects are still shared.

```python
copied[0][0] = 999

print(original)
```

```python
[
    [999, 2],
    [3, 4]
]
```

Conceptually:

```python
original ──┐
           ├──> [1, 2]
copied ────┘
```

Both still reference the same nested list.

6. Deep copy

Deep copy recursively copies nested objects too.

```python
copied = copy.deepcopy(original)
```

Now :

```python
copied[0][0] = 999
```

will not change `original`.

- Vectorization preference over Python loops

With NumPy:

```python
import numpy as np

numbers = np.array([1, 2, 3, 4])

result = numbers * 2
```

This is vectorization.

Instead of processing each element manually in Python, NumPy performs the operation in optimized low-level code.

Example :

```python
a = np.array([1, 2, 3])
b = np.array([10, 20, 30])

a + b
```
