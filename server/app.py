from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import unquote
from model import (
    licenses,
    filters,
    popular,
    updated,
    new,
    search,
    package,
    md,
    example,
    shields_io,
    options,
    packages,
    downloads,
    reference_num,
)


ENABLE_CORS = False

app = FastAPI()

if ENABLE_CORS:
    origins = ["*"]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)

@app.get('/licenses')
async def get_licenses():
    return licenses()


@app.get('/filters')
async def get_filters():
    return filters()


@app.get('/popular')
async def get_popular():
    return popular()

@app.get('/updated')
async def get_updated():
    return updated()

@app.get('/new')
async def get_new():
    return new()

@app.get('/search/{query}')
async def get_search(query='', filters=''):
    return search(query, unquote(filters))

@app.get('/package/{name}')
async def get_package(name=''):
    result = package(name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")

@app.get('/package/{name}/md')
async def get_md(name=''):
    result = md(name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")

@app.get('/package/{name}/example')
async def get_example(name=''):
    result = example(name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")

@app.get('/package/{name}/shields_io')
async def get_shields_io(name=''):
    result = shields_io(name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")

@app.get('/package/{name}/options')
async def get_options(name=''):
    result = options(name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")

@app.get('/package/{name}/packages')
async def get_packages(name=''):
        result = packages(name)
        if result:
            return result
        raise HTTPException(status_code=404, detail="Item not found")

@app.get('/package/{name}/downloads')
async def get_downloads(name=''):
        result = downloads(name)
        if result:
            return result
        raise HTTPException(status_code=404, detail="Item not found")

@app.get('/reference/num')
async def get_reference_num(name=''):
    return {'references': 10958}


@app.get("/")
async def get_root():
    return {}
