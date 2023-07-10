import os

from fastapi import FastAPI

from data import *


app = FastAPI()

if os.getenv("ENABLE_CORS", False):
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
    return {
        '1': 'license_1',
        '2': 'license_2',
        '3': 'license_3',
        '4': 'license_4',
        '5': 'license_5',
        '6': 'license_6',
    }


@app.get('/filters')
async def get_filters():
    return {
        '1': 'topic_1',
        '2': 'topic_2',
        '3': 'topic_3',
        '4': 'topic_4',
        '5': 'topic_5',
        '6': 'topic_6',
    }


@app.get('/popular')
async def get_popular():
    return {
        '0': {'name': 'boost', 'version': 'v1.79.0'},
        '1': {'name': 'zlib', 'version': 'v1.21.2'},
        '2': {'name': 'openssl', 'version': 'v3.0.3'},
        '3': {'name': 'opengl', 'version': 'system'}
    }


@app.get('/updated')
async def get_updated():
    return {
        '0': {'name': 'opengl', 'version': 'system'},
        '1': {'name': 'boost', 'version': 'v1.79.0'},
        '2': {'name': 'zlib', 'version': 'v1.21.2'},
        '3': {'name': 'openssl', 'version': 'v3.0.3'}
    }


@app.get('/new')
async def get_new():
    return {
        '0': {'name': 'opengl', 'version': 'system'},
        '1': {'name': 'boost', 'version': 'v1.79.0'},
        '2': {'name': 'zlib', 'version': 'v1.21.2'},
        '3': {'name': 'openssl', 'version': 'v3.0.3'}
    }


@app.get('/search/{query}')
async def get_search(query='', filters='', licenses=''):
    return {
        '0': {
            'info': {
                'description': 'Lorem ipsum dolor sit amet, consectetur '
                               'adipiscing elit. Etiam nibh est, suscipit vel '
                               'convallis eget, euismod a leo. Vivamus '
                               'sagittis mi non dui iaculis tincidunt. Aliquam '
                               'metus risus, maximus sed tristique sed, '
                               'vehicula at neque. Nam nunc metus, vestibulum '
                               'id iaculis in, sodales et arcu. Nulla lorem '
                               'enim, hendrerit sit.',
                'downloads': 14,
                'labels': ['topic_1', 'topic_5', 'topic_6'],
                'licenses': ['license_1', 'license_5', 'license_6'],
                'version': 'system'
            },
            'name': 'opengl'
        },
    }


@app.get('/package/{name}')
async def get_package(name=''):
    return {
       "3.0.5":{
          "name":"openssl",
          "info":{
             "version":"3.0.5",
             "licenses":[
                "Apache-2.0"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "3.0.4":{
          "name":"openssl",
          "info":{
             "version":"3.0.4",
             "licenses":[
                "Apache-2.0"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "3.0.3":{
          "name":"openssl",
          "info":{
             "version":"3.0.3",
             "licenses":[
                "Apache-2.0"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.1.1q":{
          "name":"openssl",
          "info":{
             "version":"1.1.1q",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.1.1p":{
          "name":"openssl",
          "info":{
             "version":"1.1.1p",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.1.1o":{
          "name":"openssl",
          "info":{
             "version":"1.1.1o",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.1.0l":{
          "name":"openssl",
          "info":{
             "version":"1.1.0l",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       },
       "1.0.2u":{
          "name":"openssl",
          "info":{
             "version":"1.0.2u",
             "licenses":[
                "OpenSSL"
             ],
             "labels":[
                "tls",
                "ssl",
                "security",
                "encryption",
                "openssl"
             ],
             "downloads":0,
             "description":"A toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols"
          }
       }
    }



@app.get('/package/{name}/md')
async def get_md(name=''):
    return {
        '3.0.5': {'md': md_use_it},
        '3.0.4': {'md': md_use_it},
        '3.0.3': {'md': md_use_it},
        '1.1.1q': {'md': md_use_it},
        '1.1.1p': {'md': md_use_it},
        '1.1.1o': {'md': md_use_it},
        '1.1.0l': {},  # No markdown
        '1.0.2u': {}  # No markdown
    }


@app.get('/package/{name}/example')
async def get_example(name=''):
    return {
        '3.0.5': {'md': md_example},
        '3.0.4': {'md': md_example},
        '3.0.3': {'md': md_example},
        '1.1.1q': {'md': md_example},
        '1.1.1p': {'md': md_example},
        '1.1.1o': {'md': md_example},
        '1.1.0l': {'md': md_example},
        '1.0.2u': {'md': md_example}
    }


@app.get('/package/{name}/options')
async def get_options(name=''):
    return {
        '3.0.5': {'md': options_md},
        '3.0.4': {'md': options_md},
        '3.0.3': {'md': options_md},
        '1.1.1q': {'md': options_md},
        '1.1.1p': {'md': options_md},
        '1.1.1o': {'md': options_md},
        '1.1.0l': {'md': options_md},
        '1.0.2u': {'md': options_md}
    }


@app.get('/package/{name}/packages')
async def get_packages(name=''):
    return {
        '3.0.5': {'md': packages_md},
        '3.0.4': {'md': packages_md},
        '3.0.3': {'md': packages_md},
        '1.1.1q': {'md': packages_md},
        '1.1.1p': {'md': packages_md},
        '1.1.1o': {'md': packages_md},
        '1.1.0l': {'md': packages_md},
        '1.0.2u': {'md': packages_md}
    }


@app.get('/package/{name}/downloads')
async def get_downloads(name=''):
    return {
        '3.0.5': {
        'downloads': [
                {'date': '2022-06-26', 'downloads': 7},
                {'date': '2022-06-27', 'downloads': 46},
                {'date': '2022-06-28', 'downloads': 35},
                {'date': '2022-06-29', 'downloads': 14}
            ]
        },
        '3.0.4': {
        'downloads': [
                {'date': '2022-06-26', 'downloads': 7},
                {'date': '2022-06-27', 'downloads': 46},
                {'date': '2022-06-28', 'downloads': 35},
                {'date': '2022-06-29', 'downloads': 14}
            ]
        },
        '3.0.3': {
        'downloads': [
                {'date': '2022-06-26', 'downloads': 7},
                {'date': '2022-06-27', 'downloads': 46},
                {'date': '2022-06-28', 'downloads': 35},
                {'date': '2022-06-29', 'downloads': 14}
            ]
        },
        '1.1.1q': {
        'downloads': [
                {'date': '2022-06-26', 'downloads': 7},
                {'date': '2022-06-27', 'downloads': 46},
                {'date': '2022-06-28', 'downloads': 35},
                {'date': '2022-06-29', 'downloads': 14}
            ]
        },
        '1.1.1p': {
        'downloads': [
                {'date': '2022-06-26', 'downloads': 7},
                {'date': '2022-06-27', 'downloads': 46},
                {'date': '2022-06-28', 'downloads': 35},
                {'date': '2022-06-29', 'downloads': 14}
            ]
        },
        '1.1.1o': {
        'downloads': [
                {'date': '2022-06-26', 'downloads': 7},
                {'date': '2022-06-27', 'downloads': 46},
                {'date': '2022-06-28', 'downloads': 35},
                {'date': '2022-06-29', 'downloads': 14}
            ]
        },
        '1.1.0l': {
        'downloads': [
                {'date': '2022-06-26', 'downloads': 7},
                {'date': '2022-06-27', 'downloads': 46},
                {'date': '2022-06-28', 'downloads': 35},
                {'date': '2022-06-29', 'downloads': 14}
            ]
        },
        '1.0.2u': {
        'downloads': [
                {'date': '2022-06-26', 'downloads': 7},
                {'date': '2022-06-27', 'downloads': 46},
                {'date': '2022-06-28', 'downloads': 35},
                {'date': '2022-06-29', 'downloads': 14}
            ]
        }
    }


@app.get('/reference/num')
async def get_reference_num(query='', filters='', licenses=''):
    return {'references': 1}


@app.get("/status")
async def get_root():
    return {"status": "ok"}
