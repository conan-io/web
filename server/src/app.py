from fastapi import FastAPI, HTTPException, Depends
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
from config import settings
from db import get_db


app = FastAPI()


if settings.enable_cors:
    origins = ["*"]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)


@app.get('/licenses')
async def get_licenses(db=Depends(get_db)):
    return licenses(db)


@app.get('/filters')
async def get_filters(db=Depends(get_db)):
    return filters(db)


@app.get('/popular')
async def get_popular(db=Depends(get_db)):
    return popular(db)


@app.get('/updated')
async def get_updated(db=Depends(get_db)):
    return updated(db)


@app.get('/new')
async def get_new(db=Depends(get_db)):
    return new(db)


@app.get('/search/{query}')
async def get_search(query='', filters='', licenses='', db=Depends(get_db)):
    return search(db, query, unquote(filters), unquote(licenses))


@app.get('/package/{name}')
async def get_package(name='', db=Depends(get_db)):
    result = package(db, name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")


@app.get('/package/{name}/md')
async def get_md(name='', db=Depends(get_db)):
    result = md(db, name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")


@app.get('/package/{name}/example')
async def get_example(name='', db=Depends(get_db)):
    result = example(db, name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")


@app.get('/package/{name}/shields_io')
async def get_shields_io(name='', db=Depends(get_db)):
    result = shields_io(db, name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")


@app.get('/package/{name}/options')
async def get_options(name='', db=Depends(get_db)):
    result = options(db, name)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Item not found")


@app.get('/package/{name}/packages')
async def get_packages(name='', db=Depends(get_db)):
        result = packages(db, name)
        if result:
            return result
        raise HTTPException(status_code=404, detail="Item not found")


@app.get('/package/{name}/downloads')
async def get_downloads(name='', db=Depends(get_db)):
        result = downloads(db, name)
        if result:
            return result
        raise HTTPException(status_code=404, detail="Item not found")


@app.get('/reference/num')
async def get_reference_num(query='', filters='', licenses='', db=Depends(get_db)):
    return reference_num(db, query, unquote(filters), unquote(licenses))


@app.get("/status")
async def get_root(db=Depends(get_db)):
    return {'status': 'ok'}
