---
id: 13
slug: "1-11-python-for-ai-workflows"
title: "1.11 Python for AI Workflows"
topic: "Programming Foundation"
order: 13
draft: false
---

# 1.11 Python for AI Workflows

### 1.11 Python for AI Workflows

- Jupyter notebooks - cells, magic commands
- Google Colab - GPU access
- `tqdm` - progress bars for training loops
  ### 3. `tqdm`
  `tqdm` gives you a progress bar.
  Without it:
  ```python
  for i in range(100):
  	process(i)
  ```
  With it:
  ```python
  from tqdm import tqdm

  for i in tqdm(range(100)):
  	process(i)
  ```
  You get a progress indicator like:
  ```
  73%|███████▎  | 73/100
  ```
  Very common in training loops:
  ```python
  for batch in tqdm(dataloader):
  	train(batch)
  ```
- `argparse` - CLI arguments for scripts
  Used to pass parameters from the terminal.
  Example script:
  ```python
  import argparse

  parser = argparse.ArgumentParser()

  parser.add_argument("--epochs", type=int, default=10)
  parser.add_argument("--lr", type=float, default=0.001)

  args = parser.parse_args()

  print(args.epochs)
  print(args.lr)
  ```
  Run:
  ```python
  python train.py --epochs 20 --lr 0.0001
  ```
- `hydra` or `yaml` configs - managing experiment configs
  Instead of hardcoding settings:
  ```python
  learning_rate=0.001
  batch_size=32
  epochs=10
  ```
  Put them in:
  ```
  learning_rate: 0.001
  batch_size: 32
  epochs: 10
  ```
  Then read:
  ```python
  import yaml

  with open("config.yaml") asf:
  	config=yaml.safe_load(f)
  	print(config["batch_size"])
  ```
  ### 6. Hydra
  Hydra is a library for managing more complex configs.
  Instead of manually loading YAML, Hydra can combine configs and override them from the terminal.
  Example idea:
  ```python
  python train.py model=llama batch_size=64
  ```
  You don't need Hydra for simple projects.
  Use YAML first. Hydra becomes useful when experiments get complicated.
- `dotenv` - managing API keys (CRITICAL for AI projects)

```python
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
```

- Seeding for reproducibility: `random`, `numpy`, `torch`

Random operations can produce different results every run.

Example:

```python
import random

print(random.random())
```

Different every time.

To make it more reproducible:

```python
random.seed(42)
```

For NumPy:

```python
import numpy as np
np.random.seed(42)
```

For PyTorch:

```python
import torch
torch.manual_seed(42)
```

Often:

```python
seed=42
random.seed(seed)
np.random.seed(seed)
torch.manual_seed(seed)
```

Why?

If you're training/testing models, you want results to be as consistent as possible between runs.

Important: seeding improves reproducibility, but GPU operations can still sometimes be nondeterministic.

- Saving/loading models: `pickle`, `joblib`, `torch.save()`

### 9. Saving/loading with `pickle`

As we discussed earlier:

```python
import pickle

with open("data.pkl","wb") asf:
	pickle.dump(data,f)
```

Load:

```python
with open("data.pkl","rb") asf:
	data=pickle.load(f)
```

Good for general Python objects.

---

### 10. `joblib`

Similar to pickle, commonly used for ML models.

Example with scikit-learn:

```python
import joblib

joblib.dump(model,"model.joblib")
```

Load:

```python
model=joblib.load("model.joblib")
```

Common for:

```python
scikit-learn models
large NumPy arrays
preprocessing objects
```

For example:

```python
joblib.dump(scaler,"scaler.joblib")
```

---

### 11. `torch.save()`

PyTorch has its own recommended model-saving mechanism.

Save model weights:

```python
import torch

torch.save(model.state_dict(),"model.pt")
```

Load:

```python
model.load_state_dict(torch.load("model.pt"))
```

Usually you create the model structure first:

```python
model=MyModel()model.load_state_dict(torch.load("model.pt"))
```

Then:

```python
model.eval()
```

for inference.

---

### Pickle vs Joblib vs PyTorch

Simple mental model:

```
pickle
→ general Python objects

joblib
→ common for scikit-learn / NumPy-heavy objects

torch.save()
→ PyTorch models and tensors
```

### Typical AI project

You may eventually have something like:

```
project/
├── train.py
├── config.yaml
├── .env
├── notebook.ipynb
├── models/
│   └── model.pt
└── data/
```
