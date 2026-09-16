---
id: 10
slug: "1-8-numpy-non-negotiable-for-ai"
title: "1.8 NumPy (Non-Negotiable for AI)"
topic: "Programming Foundation"
order: 10
draft: false
---

# 1.8 NumPy (Non-Negotiable for AI)

- Array creation: `np.array()`, `np.zeros()`, `np.ones()`, `np.eye()`
  Create array:
  ```python
  a=np.array([1,2,3])
  ```
  Zeros:
  ```python
  np.zeros((2,3))
  ```
  Result:
  ```python
  [[0. 0. 0.]
   [0. 0. 0.]]
  ```
  Ones:
  ```python
  np.ones((2,3))
  ```
  Identity matrix:
  ```python
  np.eye(3)
  ```
  Result:
  ```python
  [[1. 0. 0.]
   [0. 1. 0.]
   [0. 0. 1.]]
  ```
  Think:
  ```python
  array() → custom values
  zeros() → all 0
  ones()  → all 1
  eye()   → identity matrix
  ```
- Array shape, ndim, dtype
  ### 2. `shape`, `ndim`, `dtype`
  ```python
  a=np.array([
      [1,2,3],
      [4,5,6]
  ])
  ```
  Shape:
  ```python
  a.shape# (2, 3)
  ```
  Meaning:
  ```python
  2 rows
  3 columns
  ```
  Dimensions:
  ```python
  a.ndim# 2
  ```
  Data type:
  ```python
  a.dtype# usually int64 or similar
  ```
  For AI, common dtypes are:
  ```python
  float32
  float16
  int64
  ```
- Reshaping: `reshape()`, `flatten()`, `ravel()`
  ### 3. Reshaping
  ```python
  a=np.array([1,2,3,4,5,6])
  ```
  Reshape:
  ```python
  a.reshape(2,3)
  ```
  Result:
  ```python
  [[1,2,3],
   [4,5,6]]
  ```
  `flatten()` converts to 1D:
  ```python
  b=np.array([[1,2], [3,4]])

  b.flatten() # [1, 2, 3, 4]
  ```
  `ravel()` also flattens:
  ```python
  b.ravel()
  ```
  Main difference:
  ```python
  flatten() → usually creates a copy
  ravel()   → tries to return a view, cheaper memory-wise
  ```
- Stacking: `np.stack()`, `np.hstack()`, `np.vstack()`
  ### 4. Stacking
  Given:
  ```python
  a=np.array([1,2])
  b=np.array([3,4])
  ```
  `np.stack()` adds a new dimension:
  ```python
  np.stack([a,b])
  ```
  Result:
  ```python
  [[1,2],
   [3,4]]
  ```
  Horizontal stack:
  ```python
  np.hstack([a,b])
  # [1, 2, 3, 4]
  ```
  Vertical stack:
  ```python
  np.vstack([a,b])
  ```
  Result:
  ```python
  [[1,2],
   [3,4]]
  ```
  Mental model:
  ```python
  stack  → add new axis
  hstack → side by side
  vstack → top to bottom
  ```
- Boolean indexing, `np.where()`
  ### 5. Boolean indexing
  ```python
  a=np.array([1,2,3,4,5])
  ```
  Filter values:
  ```python
  a[a>3]
  # [4, 5]
  ```
  What happens internally:
  ```python
  a>3
  ```
  gives:
  ```python
  [False,False,False,True,True]
  ```
  Then NumPy keeps the `True` positions.
  Very useful in data filtering.
  `np.where()`:
  ```python
  np.where(a>3,1,0)
  ```
  Result:
  ```python
  [0,0,0,1,1]
  ```
  Meaning:
  ```
  if condition true  → 1
  else                → 0
  ```
- Broadcasting rules
  ### 6. Broadcasting
  Broadcasting lets NumPy operate on arrays with different shapes when compatible.
  Example:
  ```python
  a=np.array([1,2,3])

  a+10
  ```
  Result:
  ```
  [11,12,13]
  ```
  NumPy behaves as if `10` were:
  ```
  [10,10,10]
  ```
  Another example:
  ```python
  a=np.array([
      [1,2,3],
      [4,5,6]
  ])

  b=np.array([10,20,30])

  a+b
  ```
  Result:
  ```
  [[11,22,33],
   [14,25,36]]
  ```
  Mental model:
  > NumPy automatically stretches smaller compatible shapes.
  Very important in neural networks.
- `np.dot()` and `@` operator
  ### 7. `np.dot()` and `@`
  Vector dot product:
  ```python
  a=np.array([1,2])
  b=np.array([3,4])
  np.dot(a,b)
  ```
  Calculation:
  ```
  1×3 + 2×4 = 11
  ```
  So:
  ```
  # 11
  ```
  For matrices:
  ```
  A@B
  ```
  means matrix multiplication.
  Example:
  ```python
  A=np.array([
      [1,2],
      [3,4]
  ])

  B=np.array([
      [5,6],
      [7,8]
  ])

  A@B
  ```
  For matrix multiplication, `@` is usually clearer.
- Matrix operations: `np.linalg.inv()`, `np.linalg.eig()`
  ### 8. Matrix operations
  Inverse:
  ```python
  A=np.array([
      [1,2],
      [3,4]
  ])

  np.linalg.inv(A)
  ```
  The inverse is a matrix such that:
  ```python
  A @ A⁻¹ = I
  ```
  Eigenvalues and eigenvectors:
  ```python
  values,vectors=np.linalg.eig(A)
  ```
  Returns:
  ```python
  values  → eigenvalues
  vectors → eigenvectors
  ```
  These matter later in PCA and linear algebra.
- Aggregations with `axis=` argument
  ### 9. Aggregations with `axis=`
  ```python
  a=np.array([
      [1,2,3],
      [4,5,6]
  ])
  ```
  Total sum:
  ```python
  a.sum()# 21
  ```
  Column-wise:
  ```python
  a.sum(axis=0)# [5, 7, 9]
  ```
  Row-wise:
  ```python
  a.sum(axis=1)# [6, 15]
  ```
  Easy mental model for a 2D array:
  ```python
  axis=0 → go down rows → result per column
  axis=1 → go across columns → result per row
  ```
  Works with:
  ```python
  a.mean(axis=0)
  a.max(axis=1)
  a.min(axis=0)
  ```
- `np.random` module
  ### 10. `np.random`
  Generate random values.
  ```python
  np.random.random(3)
  ```
  Example result:
  ```python
  [0.21,0.84,0.43]
  ```
  Random integers:
  ```python
  np.random.randint(0,10,size=5)
  ```
  Normal distribution:
  ```python
  np.random.normal(loc=0,scale=1,size=5
  )
  ```
  Reproducible randomness:
  ```python
  np.random.seed(42)
  ```
