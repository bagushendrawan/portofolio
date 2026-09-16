---
id: 14
slug: "1-12-async-python-critical-for-ai-apis"
title: "1.12 Async Python (Critical for AI APIs)"
topic: "Programming Foundation"
order: 14
draft: false
---

# 1.12 Async Python (Critical for AI APIs)

- `async/await` syntax
  `async` and `await` let Python handle tasks that spend time **waiting**, such as:
  - calling an AI API
  - downloading data
  - querying a database
  - streaming an LLM response
  Normal function:
  ```
  defget_data():return"done"
  ```
  Async function:
  ```python
  async def get_data():
  	return "done"
  ```
  To wait for another async operation:
  ```python
  async def main():
  	result = await get_data()
  	print(result)
  ```
  Mental model:
  ```
  async  → function can pause without blocking everything
  await  → wait here for async work to finish
  ```
- `asyncio` event loop

The event loop manages async tasks.

```python
import asyncio

async def main():
    print("Hello")

asyncio.run(main())
```

`asyncio.run()` starts the event loop.

The event loop can switch between tasks while one is waiting.

This is useful because API calls spend lots of time waiting for the network.

### 3. Why async is useful

Imagine three API calls.

Normal synchronous code:

```python
response1=call_api()
response2=call_api()
response3=call_api()
```

If each takes 2 seconds:

```
2s + 2s + 2s = about 6s
```

With async, they can wait at the same time:

```
call 1 ────────>
call 2 ────────>
call 3 ────────>

≈ 2s total
```

This is called **concurrency**.

---

- `aiohttp` - async HTTP calls to AI APIs

### 4. `aiohttp`

`aiohttp` is a library for async HTTP requests.

Example:

```python
import aiohttp
import asyncio

async def fetch():
    async with aiohttp.ClientSession() as session:
        async with session.get("https://example.com") as response:
            text = await response.text()
            return text

asyncio.run(fetch())
```

Important parts:

```
await response.text()
```

Python can pause here while waiting for the network.

Good for calling many APIs concurrently.

- Concurrent API calls with `asyncio.gather()`

This is one of the most useful concepts for AI engineering.

Suppose:

```python
async def call_model(prompt):
    ...
```

You have three prompts:

```
prompts= ["Explain AI","Explain ML","Explain RAG"]
```

Instead of:

```python
r1 = await call_model(prompts[0])
r2 = await call_model(prompts[1])
r3 = await call_model(prompts[2])
```

which still waits one-by-one, use:

```python
results = await asyncio.gather(
    call_model(prompts[0]),
    call_model(prompts[1]),
    call_model(prompts[2])
)
```

Now they run concurrently.

Conceptually:

```
Task 1 ───────>
Task 2 ───────>
Task 3 ───────>
```

instead of:

```
Task 1 ───────>
               Task 2 ───────>
                              Task 3 ───────>
```

- `httpx` - async-first HTTP client used in production AI apps
  ### 6. `httpx`
  `httpx` is another HTTP client.
  It supports both sync and async code.
  Async example:
  ```python
  import httpx

  async def fetch():
      async with httpx.AsyncClient() as client:
          response = await client.get("https://example.com")

          return response.text
  ```
  It's popular in production Python APIs because it integrates nicely with frameworks like FastAPI.
  You will often see:
  ```python
  async with httpx.AsyncClient() as client:
      response = await client.post(...)
  ```
  ***
  ### 7. `aiohttp` vs `httpx`
  Simple mental model:
  ```
  aiohttp
  → mature async HTTP library

  httpx
  → modern API, supports sync + async
  → very common with FastAPI
  ```
  For new production AI apps, you'll often see `httpx`.
- Understanding why streaming LLM responses need async

### 8. Why LLM streaming needs async

A normal LLM request might work like:

```
User sends prompt

wait...
wait...
wait...

full response arrives
```

Streaming works differently:

```
"Artificial"
" intelligence"
" is"
" ..."
```

Chunks arrive over time.

You don't want your server to freeze while waiting for each chunk.

Async lets Python do:

```
receive chunk
↓
send chunk to user
↓
wait for next chunk

while other requests can still run
```

Example idea:

```
asyncforchunkinresponse:yieldchunk
```

This is very common in LLM streaming APIs.

---

### 9. Simple concurrent AI example

```python
import asyncio

async def call_model(name):
    await asyncio.sleep(2)
    return f"{name} finished"

async def main():
    results = await asyncio.gather(
        call_model("GPT"),
        call_model("Llama"),
        call_model("Gemini")
    )

    print(results)

asyncio.run(main())
```

All three wait concurrently.

Without `gather()`, that could take roughly:

```
6 seconds
```

With `gather()`:

```
about 2 seconds
```

### Mental model

```
async def         → define async function
await             → wait without blocking everything
asyncio           → runs async tasks
gather()          → run async tasks concurrently
aiohttp           → async HTTP client
httpx             → modern sync/async HTTP client
streaming         → receive/send response piece by piece
```

For AI engineering, prioritize **`async/await`, `asyncio.gather()`, `httpx`, and understanding streaming**.
