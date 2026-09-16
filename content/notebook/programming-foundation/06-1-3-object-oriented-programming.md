---
id: 5
slug: "1-3-object-oriented-programming"
title: "1.3 Object Oriented Programming"
topic: "Programming Foundation"
order: 5
draft: false
---

# 1.3 Object Oriented Programming

- Classes and instances

```python
class Model:
    pass

gpt = Model()
llama = Model()
```

```python
Model is the class.

gpt and llama are instances.
```

- `__init__` constructor
  `__init__` runs when you create an object.
  ```python
  class Model:
  		def __init__(self,name,score):
  			self.name=name
  			self.score=score
  ```
  Create an object:
  ```python
  gpt=Model("GPT",0.95)
  ```
  Now:
  ```python
  gpt.name # "GPT"
  gpt.score # 0.95
  ```
- Instance methods and `self`
  ```python
  class Model:
      def __init__(self, name):
          self.name = name

      def describe(self):
          return f"Model: {self.name}"
  ```
- Class vs instance variables
  Instance variable belongs to each object.
  ```python
  class Model:
  	def __init__(self,name):
  		self.name=name
  ```
  ```python
  gpt=Model("GPT")

  llama=Model("Llama")
  ```
  Each has a different `name`.
  Class variable is shared by all instances.
  ```python
  class Model:
  	category="AI Model"
  	def __init__(self,name):
  		self.name=name
  ```
  Now:
  ```python
  gpt.category # "AI Model"
  llama.category # "AI Model"
  ```
  Mental model:
  ```
  instance variable → unique per object
  class variable    → shared by all objects
  ```
- Inheritance and `super()`
  Inheritance lets one class reuse another class.
  ```python
  class Model:
  	def predict(self):
  		return "prediction"
  ```
  Child class:
  ```python
  class LLM(Model):
  	def generate(self):
  		return "generated text"
  ```
  Now:
  ```
  model=LLM()

  model.predict()
  model.generate()
  ```
  `LLM` inherits from `Model`.
  ## `super()` lets the child class use the parent class.
  ```python
  class Model:
  	def __init__(self,name):
  		self.name=name
  ```
  ```python
  class LLM(Model):
  	def__init__(self,name,temperature):
  		super().__init__(name)
  		self.temperature=temperature
  ```
  Instead of repeating:
  ```python
  self.name=name
  ```
  we call the parent's constructor.
- Overriding methods
  A child class can replace a parent method.
  ```python
  class Model:
  	def run(self):
  		return"generic model"
  ```
  ```python
  class LLM(Model):
  	def run(self):
  		return"generating text"
  ```
  Now:
  ```python
  model=LLM()
  model.run()
  # "generating text"
  ```
  The child version overrides the parent version.
- `__repr__`, `__str__`, `__len__`, `__getitem__`
  Controls what `print(object)` shows.
  ```python
  class Model:
  	def__init__(self,name):
  		self.name=name

  	def__str__(self):
  		return self.name
  ```
  ```
  model=Model("GPT")
  print(model) # GPT
  ```
  Used for a more developer-friendly representation.
  ```python
  class Model:
  	def__init__(self,name):
  		self.name=name

  	def__repr__(self):
  		return f"Model(name='{self.name}')"
  ```
  Now:
  ```python
  model
  ```
  may display:
  ```python
  Model(name='GPT')
  ```
  Simple distinction:
  ```
  __str__  → human-friendly
  __repr__ → developer-friendly
  ```
  Lets your object work with `len()`.
  ```python
  class Dataset:
  	def__init__(self,data):
  		self.data=data

  	def__len__(self):
  		return len(self.data)
  ```
  ```python
  dataset=Dataset([10,20,30])

  len(dataset)# 3
  ```
  ### 11. `__getitem__`
  Lets you use indexing.
  ```python
  class Dataset:
  	def __init__(self,data):
  		self.data=data

  	def_ _getitem__(self,index):
  		return self.data[index]
  ```
  Now:
  ```python
  dataset=Dataset(["cat","dog","bird"])
  dataset[0]
  # "cat"
  ```
  This pattern is extremely common in PyTorch.
- `@property`, `@staticmethod`, `@classmethod`
  Lets a method behave like an attribute.
  Without property:
  ```python
  class Model:
  		def get_name(self):
  			return "GPT"
  ```
  You call:
  ```python
  model.get_name()
  ```
  With property:
  ```python
  class Model:
  	@property
  	def name(self):
  		return"GPT"
  ```
  Now:
  ```python
  model.name
  ```
  No parentheses.
  Useful when you want controlled access to data.
  A static method belongs logically to the class but does not need `self`.
  ```python
  class Model:
  	@staticmethod
  	def validate_score(score):
  		return 0<=score<=1
  ```
  Call:
  ```python
  Model.validate_score(0.9)
  # True
  ```
  It does not need an object.
  A class method receives the class as `cls`.
  ```python
  class Model:
  	provider="OpenAI"

  	@classmethod
  	def get_provider(cls):
  		return cls.provider
  ```
  Use:
  ```python
  Model.get_provider()
  # "OpenAI"
  ```
  Common use: alternative constructors.
  ```python
  class Model:
  	def__init__(self,name):
  		self.name=name

  	@classmethod
  	def from_dict(cls,data):
  		return cls(data["name"])
  ```
  Then:
  ```
  data= {"name":"GPT"}
  model=Model.from_dict(data)
  ```
  ***
  ***
- Abstract classes with `ABC` - used heavily in LangChain, LlamaIndex
  An abstract class defines a required structure.
  ```python
  from abc import ABC,abstractmethod
  ```
  ```python
  class BaseModel(ABC):
  	@abstractmethod
  	def generate(self,prompt):
  		pass
  ```
  Now a child class must implement `generate()`:
  ```python
  class GPTModel(BaseModel):
  	def generate(self,prompt):
  		return f"GPT response to:{prompt}"
  ```
  But this is invalid:
  ```python
  class BrokenModel(BaseModel):
  	pass
  ```
  Because it didn't implement `generate()`.
  This is common in AI frameworks because they define something like:
  ```python
  BaseLLM
  BaseRetriever
  BaseEmbedding
  BaseTool
  ```
  and then different implementations follow the same interface.
  For example:
  ```python
  class BaseLLM(ABC):
  	@abstractmethod
  	def generate(self,prompt):
  		pass
  ```
  Then:
  ```python
  class OpenAILLM(BaseLLM):
  	def generate(self,prompt):
          ...
  ```
  ```python
  class LocalLLM(BaseLLM):
  	def generate(self,prompt):
          ...
  ```
  Your application can then treat both as a `BaseLLM`.

### The most important mental model

```
class        → blueprint
instance     → object created from class
__init__     → setup object
self         → current object
inheritance  → reuse parent behavior
super()      → access parent
override     → replace parent behavior
ABC          → force child classes to follow a contract
```
