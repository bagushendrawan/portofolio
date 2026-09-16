---
id: 11
slug: "1-9-pandas-essential-for-data-work"
title: "1.9 Pandas (Essential for Data Work)"
topic: "Programming Foundation"
order: 11
draft: false
---

# 1.9 Pandas (Essential for Data Work)

- DataFrames & Series creation
  ### 1. DataFrame & Series
  A **Series** is one column.
  ```python
  import pandas as pd

  scores=pd.Series([90,85,88])
  ```
  A **DataFrame** is a table.
  ```python
  df=pd.DataFrame(
  {
  "name": ["GPT","Llama","Qwen"],
  "score": [0.95,0.91,0.89]
  })
  ```
  Think:
  ```
  Series    → one column
  DataFrame → full table
  ```
- `df.head()`, `df.info()`, `df.describe()`, `df.shape`
  ### 2. Inspecting data
  First rows:
  ```python
  df.head()
  ```
  Column types and nulls:
  ```python
  df.info()
  ```
  Summary statistics:
  ```python
  df.describe()
  ```
  Shape:
  ```python
  df.shape# (3, 2)
  ```
  Meaning:
  ```python
  3 rows
  2 columns
  ```
- `loc` vs `iloc` indexing
  ### 3. `loc` vs `iloc`
  `loc` uses labels.
  ```python
  df.loc[0,"name"]
  # "GPT"
  ```
  `iloc` uses numeric positions.
  ```python
  df.iloc[0,0]
  # "GPT"
  ```
  Think:
  ```python
  loc  → label/name
  iloc → integer position
  ```
  Select rows:
  ```python
  df.loc[0:1]
  ```
  Select by positions:
  ```
  df.iloc[0:2]
  ```
- Boolean filtering
  ### 4. Boolean filtering
  Filter rows based on a condition.
  ```python
  df[df["score"]>0.9]
  ```
  Result:
  ```python
  GPT    0.95
  Llama  0.91
  ```
  Multiple conditions:
  ```python
  df[
      (df["score"]>0.9)&
      (df["name"]!="GPT")
  ]
  ```
  Use:
  ```python
  & → and
  | → or
  ```
- Handling missing values: `isna()`, `dropna()`, `fillna()`
  ### 5. Missing values
  Example:
  ```python
  df=pd.DataFrame(
  {
  "name": ["GPT","Llama","Qwen"],
  "score": [0.95,None,0.89]
  })
  ```
  Check missing:
  ```python
  df.isna()
  ```
  Count missing:
  ```python
  df.isna().sum()
  ```
  Remove missing rows:
  ```python
  df.dropna()
  ```
  Fill missing values:
  ```python
  df["score"] = df["score"].fillna(0)
  ```
  Or fill with mean:
  ```python
  df["score"] = df["score"].fillna(df["score"].mean()
  )
  ```
- `groupby()`, `agg()`, `pivot_table()`, `value_counts()`
  Suppose:
  ```python
  df=pd.DataFrame({
  "model": ["GPT","GPT","Llama","Llama"],
  "score": [0.9,0.95,0.8,0.85]
  })
  ```
  Average per model:
  ```python
  df.groupby("model")["score"].mean()
  ```
  Result:
  ```
  GPT      0.925
  Llama    0.825
  ```
  Think:
  > group rows first, then calculate something.
- `merge()`, `concat()`, `melt()`, `pivot()`
  ### 7. `agg()`
  Perform multiple aggregations.
  ```python
  df.groupby("model")["score"].agg(
  ["mean","min","max"])
  ```
  You can also name them:
  ```python
  df.groupby("model").agg(avg_score=("score","mean"),max_score=("score","max"))
  ```
  Very common in analytics.
- Parsing dates: `pd.to_datetime()`
  ### 8. `pivot_table()`
  Summarize data into a table.
  ```python
  df=pd.DataFrame({
  "model": ["GPT","GPT","Llama","Llama"],
  "dataset": ["A","B","A","B"],
  "score": [0.9,0.95,0.8,0.85]
  })
  ```
  ```python
  pd.pivot_table(df,values="score",index="model",columns="dataset",aggfunc="mean")
  ```
  Result conceptually:
  ```
  dataset    A     B
  model

  GPT       0.90  0.95
  Llama     0.80  0.85
  ```
  ### 9. `value_counts()`
  Counts unique values.
  ```python
  labels=pd.Series(
  ["cat","dog","cat","cat"])

  labels.value_counts()
  ```
  Result:
  ```
  cat    3
  dog    1
  ```
  Very useful for checking class distribution in datasets.
  ### 10. `merge()`
  Join DataFrames like SQL JOIN.
  ```python
  models=pd.DataFrame({"id": [1,2],"name": ["GPT","Llama"]
  })

  scores=pd.DataFrame({"id": [1,2],"score": [0.95,0.91]
  })
  ```
  Merge:
  ```python
  result=models.merge(scores,on="id")
  ```
  Result:
  ```
  id  name   score
  1   GPT    0.95
  2   Llama  0.91
  ```
  You can specify:
  ```
  how="left" how="right" how="inner" how="outer"
  ```
  ### 11. `concat()`
  Combine DataFrames.
  Rows:
  ```python
  df1=pd.DataFrame({"name": ["GPT"]
  })

  df2=pd.DataFrame({"name": ["Llama"]
  })

  pd.concat([df1,df2])
  ```
  Combine columns:
  ```python
  pd.concat(
      [df1,df2],axis=1
  )
  ```
  Think:
  ```
  merge  → join based on key
  concat → stick tables together
  ```
  ### 12. `melt()`
  Converts wide data into long format.
  Before:
  ```python
  model   test_A   test_B
  GPT      0.9      0.95
  Llama    0.8      0.85
  ```
  ```python
  df.melt(id_vars="model",var_name="test",value_name="score")
  ```
  After:
  ```python
  model   test     score
  GPT     test_A   0.90
  GPT     test_B   0.95
  Llama   test_A   0.80
  Llama   test_B   0.85
  ```
  Very useful for plotting and analysis.
  ### 13. `pivot()`
  Does roughly the opposite of `melt()`.
  From:
  ```python
  model   test     score
  GPT     A        0.90
  GPT     B        0.95
  ```
  To:
  ```python
  df.pivot(index="model",columns="test",values="score")
  ```
  Result:
  ```python
  test     A      B
  model

  GPT     0.90   0.95
  ```
  Important difference:
  ```python
  pivot()       → reshapes, expects unique combinations
  pivot_table() → can aggregate duplicates
  ```
  ### 14. Parsing dates
  CSV dates often start as strings:
  ```python
  df["date"]
  ```
  Example:
  ```python
  "2026-09-16"
  ```
  Convert:
  ```python
  df["date"]=pd.to_datetime(df["date"])
  ```
  Now you can do:
  ```python
  df["date"].dt.year
  df["date"].dt.month
  df["date"].dt.day
  ```
  Filter dates:
  ```python
  df[df["date"]>="2026-01-01"]
  ```
