---
id: 8
slug: "1-6-error-handling-debugging"
title: "1.6 Error Handling & Debugging"
topic: "Programming Foundation"
order: 8
draft: false
---

# 1.6 Error Handling & Debugging

- `try / except / finally`
  Use `try` when code might fail.

```python
try:
    x = 10 / 0
except:
    print("Something went wrong")
finally:
    print("Finished")
```

Output:

```python
Something went wrong
Finished
```

```python
try     → run risky code
except  → handle error
finally → always runs
```

- Catching specific exceptions

```python
try:
    x = int(input())
    result = 10 / x

except ValueError:
    print("Please enter a number")

except ZeroDivisionError:
    print("Number cannot be zero")
```

- Raising exceptions: `raise ValueError("message")`

Sometimes you want to create an error intentionally when input is invalid.

```python
def set_temperature(temp):
    if temp < 0:
        raise ValueError("Temperature cannot be negative")

    return temp
```

- Custom exception classes

You can create your own error type.

```python
class ModelError(Exception):
    pass
```

Then:

```python
def load_model(name):
    if name == "":
        raise ModelError("Model name is required")
```

Catch it:

```python
try:
    load_model("")
except ModelError as e:
    print(e)
```

- `logging` module - DEBUG, INFO, WARNING, ERROR

`logging` is better than using many `print()` statements.

```python
import logging

logging.basicConfig(level=logging.INFO)
```

Then:

```python
logging.debug("Detailed debugging info")
logging.info("Model loaded")
logging.warning("Memory usage is high")
logging.error("Model failed")
```

Levels:

```python
DEBUG   → detailed developer information
INFO    → normal events
WARNING → something suspicious
ERROR   → something failed
```

You can also include the traceback:

```python
try:
    model = load_model()
except Exception:
    logging.exception("Failed to load model")
```

`logging.exception()` is very useful because it logs the error plus traceback.

- `pdb` and `breakpoint()`

A debugger lets you stop your program and inspect variables.

Modern Python:

```python
def calculate(x):
    result = x * 2

    breakpoint()

    return result
```

When Python reaches:

```python
breakpoint()
```

execution pauses.

Common debugger commands:

```python
n → next line
c → continue
p x → print x
q → quit
```

- Reading tracebacks
