---
id: 12
slug: "1-10-code-quality-project-structure"
title: "1.10 Code Quality & Project Structure"
topic: "Programming Foundation"
order: 12
draft: false
---

# 1.10 Code Quality & Project Structure

- Virtual environments: `venv` or `conda`
- `requirements.txt` and `pip freeze`
- Writing modular code - splitting into files and modules
  ### 3. Modular code
  Instead of putting everything in one file:
  ```python
  app.py
  ```
  split responsibilities:
  ```
  project/
  ├── main.py
  ├── model.py
  ├── utils.py
  └── config.py
  ```
  Example:
  ```python
  # utils.py
  def clean_text(text):
  	return text.strip().lower()
  ```
  Then:
  ```python
  # main.py

  from utils import clean_text
  text=clean_text(" HELLO ")
  ```
  This makes code easier to maintain and test.
- `__init__.py` - making a folder a package
  ### 4. `__init__.py`
  Suppose:
  ```
  project/
  └── ai/
      ├── __init__.py
      ├── model.py
      └── utils.py
  ```
  `__init__.py` tells Python this folder can behave as a package.
  Then you can do:
  ```python
  from ai.model import Model
  ```
  It can also expose convenient imports:
  ```python
  # ai/__init__.py

  from .model import Model
  ```
  Then:
  ```python
  from ai import Model
  ```
- Type hints: `def fn(x: int) -> str:`
- `dataclasses` - cleaner data containers

### 6. `dataclasses`

Useful for classes that mainly store data.

Normal class:

```python
class ModelConfig:
	def__init__(self,name,temperature):
		self.name=name
		self.temperature=temperature
```

With dataclass:

```python
from dataclasses import dataclass

@dataclass
class ModelConfig:
	name:str
	temperature:float
```

Use:

```
config=ModelConfig(name="GPT",temperature=0.7
)
```

Python automatically creates things like `__init__()` and `__repr__()`.

Very useful for configuration objects and structured data.

- Unit tests with `pytest`
  ### 7. Unit tests with `pytest`
  Tests verify your code behaves correctly.
  Function:
  ```python
  def add(a,b):
  	return a+b
  ```
  Test:
  ```
  def test_add():
  	assert add(2,3) == 5
  ```
  Run:
  ```python
  pytest
  ```
  If correct:
  ```
  PASSED
  ```
  Another example:
  ```python
  def test_clean_text():
  	assert clean_text(" HELLO ") == "hello"
  ```
  A unit test checks a small piece of code independently.
- Linting with `ruff` or `flake8`, formatting with `black`
  ### 8. Linting
  A linter finds suspicious or messy code.
  Example:
  ```
  x=10

  unused_variable=20
  ```
  Tools like `ruff` can warn that `unused_variable` is never used.
  Run:
  ```
  ruff check .
  ```
  `ruff` is popular because it is very fast and can replace many older linting tools.
