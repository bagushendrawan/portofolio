---
id: 4
slug: "1-2-functions"
title: "1.2 Functions"
topic: "Programming Foundation"
order: 4
draft: false
---

# 1.2 Functions

### 1.2 Functions

- Defining functions with `def`
- Positional vs keyword arguments
- Default argument values
- `args` and `*kwargs` - used constantly in AI SDKs
- `args` collects extra positional arguments into a tuple.
  ```python
  def add_all(*args):
  	print(args)

  add_all(1,2,3)
  ```
  Output:
  ```python
  (1,2,3)
  ```
  Useful example:
  ```python
  def add_all(*numbers):
  	return sum(numbers)

  add_all(1,2,3,4)
  # 10
  ```
  Think:
  ```
  *args = extra positional arguments
  ```

  - `*kwargs` collects extra keyword arguments into a dictionary.
  ```python
  def create_model(**kwargs):
  	print(kwargs)

  create_model(
  	model="gpt",
  	temperature=0.7,
  	max_tokens=500
  	)
  ```
  Output:
  ```
  {
  "model":"gpt",
  "temperature":0.7,
  "max_tokens":500
  }
  ```
  Think:
  ```
  **kwargs = extra keyword arguments
  ```
- Return values, tuple unpacking
  A function can return multiple values.
  ```python
  def evaluate():
  	return 0.92,0.15
  ```
  Python actually returns a tuple:
  ```python
  result=evaluate()
  print(result)
  # (0.92, 0.15)
  ```
  You can unpack it:
  ```python
  accuracy,loss=evaluate()
  print(accuracy)
  # 0.92

  print(loss)
  # 0.15
  ```
  Very common in ML:
  ```python
  loss, accuracy = model.evaluate()
  ```
- Lambda functions

```python
models = [
{"name": "GPT", "score": 0.95},
{"name": "Llama", "score": 0.91} ]

models.sort(key=lambda x: x["score"])

## Same As
def get_score(x):
    return x["score"]

models.sort(key=get_score)
```

- Recursion

```python
def countdown(n):
    if n == 0:
        return

    print(n)
    countdown(n - 1)
```

- Docstrings

```python
def generate(prompt, temperature=0.7):
    """
    Generate an AI response.

    Args:
        prompt: Input text.
        temperature: Controls randomness.

    Returns:
        Generated response.
    """

    return "response"

print(generate.__doc__)
```
