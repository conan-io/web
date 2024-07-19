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
        "0": {"id": 5, "filter": "AAFSDKPSL-2.0"},
        "1": {"id": 55, "filter": "AFL-2.1"},
        "2": {"id": 56, "filter": "(AFL-2.1 OR GPL-2.0-or-later) AND DocumentRef-COPYING"},
        "3": {"id": 43, "filter": "AGPL-3.0"},
        "4": {"id": 52, "filter": "AGPL-3.0-later"},
        "5": {"id": 155, "filter": "AGPL-3.0-or-later"},
        "6": {"id": 85, "filter": "Apache"},
        "7": {"id": 16, "filter": "Apache 2.0"},
        "8": {"id": 7, "filter": "Apache-2.0"},
        "9": {"id": 121, "filter": "Apache-2.0 WITH LLVM-exception"}
    }


@app.get('/topics')
async def get_topics():
    return {
        "0": {"id": 2663, "filter": "0mq"},
        "1": {"id": 320, "filter": "2d"},
        "2": {"id": 1116, "filter": "2d-geometric"},
        "3": {"id": 293, "filter": "2d-graphics"},
        "4": {"id": 1022, "filter": "2hdm"},
        "5": {"id": 50, "filter": "3d"},
        "6": {"id": 51, "filter": "3d"},
        "7": {"id": 1073, "filter": "3D"},
        "8": {"id": 1145, "filter": "3d-vector"},
        "9": {"id": 162, "filter": "3mf"}
    }


@app.get('/popular')
async def get_popular():
    return {
        "0":{"name":"zlib","total_downloads":190492},
        "1":{"name":"fmt","total_downloads":103628},
        "2":{"name":"openssl","total_downloads":94401},
        "3":{"name":"meson","total_downloads":90789},
        "4":{"name":"boost","total_downloads":86396},
        "5":{"name":"gtest","total_downloads":85525},
        "6":{"name":"nlohmann_json","total_downloads":81825},
        "7":{"name":"bzip2","total_downloads":76715},
        "8":{"name":"cmake","total_downloads":68334},
        "9":{"name":"spdlog","total_downloads":65284}
    }


@app.get('/updated')
async def get_updated():
    return {
        "0":{"name":"metal-cpp","version":"13"},
        "1":{"name":"yyjson","version":"0.10.0"},
        "2":{"name":"meshoptimizer","version":"0.21"},
        "3":{"name":"libcoro","version":"0.10"},
        "4":{"name":"libjxl","version":"0.10.3"},
        "5":{"name":"openexr","version":"2.4.0"},
        "6":{"name":"blend2d","version":"0.11.3"},
        "7":{"name":"c-ares","version":"1.32.1"},
        "8":{"name":"strong_type","version":"v15"},
        "9":{"name":"llvm-openmp","version":"10.0.0"}
    }


@app.get('/new')
async def get_new():
    return {
        "0":{"name":"metal-cpp","version":"14.2"},
        "1":{"name":"metal-cpp","version":"13"},
        "2":{"name":"metal-cpp","version":"13.3"},
        "3":{"name":"metal-cpp","version":"14"},
        "4":{"name":"yyjson","version":"0.10.0"},
        "5":{"name":"meshoptimizer","version":"0.21"},
        "6":{"name":"libcoro","version":"0.12"},
        "7":{"name":"libjxl","version":"0.10.3"},
        "8":{"name":"c-ares","version":"1.32.1"},
        "9":{"name":"blend2d","version":"0.11.3"}
    }


@app.get('/search/{query}')
async def get_search(query='', filters='', licenses=''):
    return {
        "0": {
            "name": "7bitconf",
            "info": {
                "version": "1.2.0",
                "description": "7bitConf is a simple C++17 centralized configuration provider library.",
                "timestamp": "2024-02-24",
                "age": 145,
                "licenses": {
                    "MIT": 4
                },
                "labels": {
                    "configuration": 6,
                    "configuration-files": 8,
                    "cpp17": 5,
                    "provider": 7
                },
                "packages": {
                    "929b2ad6edabe408b1175e4af36ae1144c2edf21": {"package_id": "929b2ad6edabe408b1175e4af36ae1144c2edf21", "os": "Windows", "arch": "x86_64"},
                    "9d083b2eb4523c6c48f48dd4bc477770f327aeca": {"package_id": "9d083b2eb4523c6c48f48dd4bc477770f327aeca", "os": "Macos", "arch": "armv8"},
                    "4c9f775f8c90bb3d45ec5e34b488430a249292e5": {"package_id": "4c9f775f8c90bb3d45ec5e34b488430a249292e5", "os": "Macos", "arch": "armv8"},
                    "7178f06528148a0509079132096da29cf8282774": {"package_id": "7178f06528148a0509079132096da29cf8282774", "os": "Macos", "arch": "x86_64"},
                    "1b22825ebbd7ccfa91289ed05982c66b277fdd9b": {"package_id": "1b22825ebbd7ccfa91289ed05982c66b277fdd9b", "os": "Windows", "arch": "x86_64"},
                    "c8b79f623ca08ddca692e826bdd00b402cc4db9c": {"package_id": "c8b79f623ca08ddca692e826bdd00b402cc4db9c", "os": "Windows", "arch": "x86_64"},
                    "cffc38aa35ee100c9d0c5f3132330e9de615c52f": {"package_id": "cffc38aa35ee100c9d0c5f3132330e9de615c52f", "os": "Linux", "arch": "x86_64"},
                    "0d4dc2e2cb9f9189e9326a8778ee9e5559fc4442": {"package_id": "0d4dc2e2cb9f9189e9326a8778ee9e5559fc4442", "os": "Macos", "arch": "x86_64"},
                    "da39a3ee5e6b4b0d3255bfef95601890afd80709": {"package_id": "da39a3ee5e6b4b0d3255bfef95601890afd80709", "os": None, "arch": None},
                    "afd4a576a9b99499a107d50812973524044045f4": {"package_id": "afd4a576a9b99499a107d50812973524044045f4", "os": "Linux", "arch": "x86_64"},
                    "5341bea8dc5b976bb938af687ae90f6f028f4e22": {"package_id": "5341bea8dc5b976bb938af687ae90f6f028f4e22", "os": "Windows", "arch": "x86_64"}
                }
            }
        },
        "1": {
            "name": "7bitdi",
            "info": {
                "version": "3.3.0",
                "description": "a simple C++ dependency injection library.",
                "timestamp": "2024-05-12",
                "age": 67,
                "licenses": {
                    "MIT": 4
                },
                "labels": {
                    "cpp17": 5,
                    "dependency-injector": 9,
                    "header-only": 11,
                    "injector": 10
                },
                "packages": {
                    "578fa3b966639c03968a1a94f83a6b0298a25f86": {"package_id": "578fa3b966639c03968a1a94f83a6b0298a25f86", "os": "Windows", "arch": "x86_64"},
                    "8a60e115e67b08b7f496f537ae6816289038523c": {"package_id": "8a60e115e67b08b7f496f537ae6816289038523c", "os": "Macos", "arch": "armv8"},
                    "2b49243ee37cf1adf4173e6921d87c7a525750d3": {"package_id": "2b49243ee37cf1adf4173e6921d87c7a525750d3", "os": "Windows", "arch": "x86_64"},
                    "6f97caa63ffbc095f43c9e4ed2947725b532b1b0": {"package_id": "6f97caa63ffbc095f43c9e4ed2947725b532b1b0", "os": "Windows", "arch": "x86_64"},
                    "71ea5f21daafa86239b92e204286619fa090d095": {"package_id": "71ea5f21daafa86239b92e204286619fa090d095", "os": "Macos", "arch": "x86_64"},
                    "407e348883a733a60a81841754fcea413d23b0d6": {"package_id": "407e348883a733a60a81841754fcea413d23b0d6", "os": "Macos", "arch": "armv8"},
                    "72e3212fb3f8ffcaefad01888a6200261292c34d": {"package_id": "72e3212fb3f8ffcaefad01888a6200261292c34d", "os": "Macos", "arch": "x86_64"},
                    "b0fd969ecd8350702126b7f9e85f53ba51d2b232": {"package_id": "b0fd969ecd8350702126b7f9e85f53ba51d2b232", "os": "Linux", "arch": "x86_64"},
                    "5036e0999ea5679c6040c35ec08bb056916e4977": {"package_id": "5036e0999ea5679c6040c35ec08bb056916e4977", "os": "Linux", "arch": "x86_64"},
                    "da39a3ee5e6b4b0d3255bfef95601890afd80709": {"package_id": "da39a3ee5e6b4b0d3255bfef95601890afd80709", "os": None, "arch": None},
                    "6c86771c21873d0cd178764973e89b321ba6b776": {"package_id": "6c86771c21873d0cd178764973e89b321ba6b776", "os": "Windows", "arch": "x86_64"}
                }
            }
        },
        "2": {
            "name": "7zip",
            "info": {
                "version": "23.01",
                "description": "7-Zip is a file archiver with a high compression ratio",
                "timestamp": "2023-10-18",
                "age": 275,
                "licenses": {
                    "BSD-3-Clause": 2,
                    "LGPL-2.1-or-later": 1,
                    "Unrar": 3
                },
                "labels": {
                    "archive": 1,
                    "compression": 2,
                    "decompression": 3,
                    "zip": 4
                },
                "packages": {
                    "522dcea5982a3f8a5b624c16477e47195da2f84f": {"package_id": "522dcea5982a3f8a5b624c16477e47195da2f84f", "os": "Windows", "arch": "x86_64"}
                }
            }
        },
        "3": {
            "name": "aaf",
            "info": {
                "version": "1.2.0",
                "description": "A cross-platform SDK for AAF. AAF is a metadata management system and file format for use in professional multimedia creation and authoring.",
                "timestamp": "2023-07-15",
                "age": 369,
                "licenses": {
                    "AAFSDKPSL-2.0": 6
                },
                "labels": {
                    "crossplatform": 17,
                    "multimedia": 16
                },
                "packages": {
                    "a6f692d6fe4683b7fb168ebc617a94c7fba80f6d": {"package_id": "a6f692d6fe4683b7fb168ebc617a94c7fba80f6d", "os": "Windows", "arch": "x86_64"},
                    "67a91cff2c323a6a8b32382924a35569aca6faa4": {"package_id": "67a91cff2c323a6a8b32382924a35569aca6faa4", "os": "Macos", "arch": "armv8"},
                    "d3bbd2f20874c33a6984a34a869378a6a2662ecc": {"package_id": "d3bbd2f20874c33a6984a34a869378a6a2662ecc", "os": "Macos", "arch": "x86_64"},
                    "a95d46979e11b9d83b30c1ee312ec6feed73cca3": {"package_id": "a95d46979e11b9d83b30c1ee312ec6feed73cca3", "os": "Windows", "arch": "x86_64"},
                    "aac5b4ebd60053c2a9c25e398daea28265f40f5d": {"package_id": "aac5b4ebd60053c2a9c25e398daea28265f40f5d", "os": "Linux", "arch": "x86_64"},
                    "9065d293e2b2eb2b2a9a8355e2f6cdcfc8582703": {"package_id": "9065d293e2b2eb2b2a9a8355e2f6cdcfc8582703", "os": "Windows", "arch": "x86_64"},
                    "7f2d72960064b9b4b4a61da50fb2227d59a0c2d7": {"package_id": "7f2d72960064b9b4b4a61da50fb2227d59a0c2d7", "os": "Macos", "arch": "x86_64"},
                    "7327527e23c4de9c8462d0547c89a6875154997e": {"package_id": "7327527e23c4de9c8462d0547c89a6875154997e", "os": "Windows", "arch": "x86_64"},
                    "ad46ffbda43f44c86aaf77f870ed932c89c048bf": {"package_id": "ad46ffbda43f44c86aaf77f870ed932c89c048bf", "os": "Macos", "arch": "armv8"},
                    "fb1de0c56c193384ba823f860e684ee49b079c99": {"package_id": "fb1de0c56c193384ba823f860e684ee49b079c99", "os": "Linux", "arch": "x86_64"}
                }
            }
        },
        "4": {
            "name": "aaplus",
            "info": {
                "version": "2.53",
                "description": "AA+ is a C++ implementation for the algorithms as presented in the book \"Astronomical Algorithms\" by Jean Meeus",
                "timestamp": "2023-12-26",
                "age": 206,
                "licenses": {
                    "Unlicense": 5
                },
                "labels": {
                    "aa+": 12,
                    "astronomical-algorithms": 14,
                    "astronomy": 13,
                    "orbital-mechanics": 15
                },
                "packages": {
                    "e793beb630e09fb7da5ecef726f377462cd2ae0d": {"package_id": "e793beb630e09fb7da5ecef726f377462cd2ae0d", "os": "Macos", "arch": "armv8"},
                    "fc491156b442836722612d1aa8a8c57e406447b6": {"package_id": "fc491156b442836722612d1aa8a8c57e406447b6", "os": "Linux", "arch": "x86_64"},
                    "dfa8c31b225ffb8dfcf6a48ffd071f448777ae71": {"package_id": "dfa8c31b225ffb8dfcf6a48ffd071f448777ae71", "os": "Windows", "arch": "x86_64"},
                    "13be611585c95453f1cbbd053cea04b3e64470ca": {"package_id": "13be611585c95453f1cbbd053cea04b3e64470ca", "os": "Linux", "arch": "x86_64"},
                    "c61e9af79e5b573dcc59aa722ab481a49519393e": {"package_id": "c61e9af79e5b573dcc59aa722ab481a49519393e", "os": "Macos", "arch": "armv8"},
                    "a60be37676823331e6c4ba6bb1dd4938e81fb17a": {"package_id": "a60be37676823331e6c4ba6bb1dd4938e81fb17a", "os": "Windows", "arch": "x86_64"},
                    "ec2a9de6feab3c0b86da78a55456ffb819b1912b": {"package_id": "ec2a9de6feab3c0b86da78a55456ffb819b1912b", "os": "Macos", "arch": "x86_64"},
                    "bfac49f477c2b8a07274dbc39ebe0ccf5a1f85bb": {"package_id": "bfac49f477c2b8a07274dbc39ebe0ccf5a1f85bb", "os": "Macos", "arch": "x86_64"},
                    "dee9f7f985eb1c20e3c41afaa8c35e2a34b5ae0b": {"package_id": "dee9f7f985eb1c20e3c41afaa8c35e2a34b5ae0b", "os": "Windows", "arch": "x86_64"},
                    "8a7bc3bb230a7341224fa09bd37626591ba56f3a": {"package_id": "8a7bc3bb230a7341224fa09bd37626591ba56f3a", "os": "Windows", "arch": "x86_64"}
                }
            }
        }
    }


@app.get('/package/{name}')
async def get_package(name=''):
    return {
        "0": {
            "name": name,
            "info": {
            "version": "20240116.2",
            "description": "Abseil Common Libraries (C++) from Google",
            "status": "ok",
            "homepage": "https://github.com/abseil/abseil-cpp",
            "timestamp": "2024-07-04",
            "recipe_revision": "996c9b7c09f1f561bdf2e2f3c889a8cb",
            "licenses": {"Apache-2.0": 7 },
            "labels": {"algorithm": 18, "common": 21, "container": 19, "google": 20, "utility": 22},
            "packages": {
                "e793beb630e09fb7da5ecef726f377462cd2ae0d": {
                "package_id": "e793beb630e09fb7da5ecef726f377462cd2ae0d",
                "os": "Macos",
                "arch": "armv8",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "ec2a9de6feab3c0b86da78a55456ffb819b1912b": {
                "package_id": "ec2a9de6feab3c0b86da78a55456ffb819b1912b",
                "os": "Macos",
                "arch": "x86_64",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "2401fa1d188d289bb25c37cfa3317e13e377a351": {
                "package_id": "2401fa1d188d289bb25c37cfa3317e13e377a351",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "192",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "False"
                },
                "requires": []
                },
                "bfac49f477c2b8a07274dbc39ebe0ccf5a1f85bb": {
                "package_id": "bfac49f477c2b8a07274dbc39ebe0ccf5a1f85bb",
                "os": "Macos",
                "arch": "x86_64",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "79c7c02f38aba9a2251f4091daf91ea3b11c0234": {
                "package_id": "79c7c02f38aba9a2251f4091daf91ea3b11c0234",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "193",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "fc491156b442836722612d1aa8a8c57e406447b6": {
                "package_id": "fc491156b442836722612d1aa8a8c57e406447b6",
                "os": "Linux",
                "arch": "x86_64",
                "compiler": "gcc",
                "compiler_cppstd": "17",
                "compiler_version": "11",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "9bdee485ef71c14ac5f8a657202632bdb8b4482b": {
                "package_id": "9bdee485ef71c14ac5f8a657202632bdb8b4482b",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "193",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "False"
                },
                "requires": []
                },
                "18ff13b488eb6ad8b3de7e4298eee0e6b9445eb2": {
                "package_id": "18ff13b488eb6ad8b3de7e4298eee0e6b9445eb2",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "192",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "c61e9af79e5b573dcc59aa722ab481a49519393e": {
                "package_id": "c61e9af79e5b573dcc59aa722ab481a49519393e",
                "os": "Macos",
                "arch": "armv8",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "13be611585c95453f1cbbd053cea04b3e64470ca": {
                "package_id": "13be611585c95453f1cbbd053cea04b3e64470ca",
                "os": "Linux",
                "arch": "x86_64",
                "compiler": "gcc",
                "compiler_cppstd": "17",
                "compiler_version": "11",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                }
            },
            "downloads": 0
            }
        },
        "1": {
            "name": name,
            "info": {
            "version": "20240116.1",
            "description": "Abseil Common Libraries (C++) from Google",
            "status": "ok",
            "homepage": "https://github.com/abseil/abseil-cpp",
            "timestamp": "2024-07-04",
            "recipe_revision": "751a57a9b9651051dbf2e147c8660aff",
            "licenses": {"Apache-2.0": 7},
            "labels": {"algorithm": 18, "common": 21, "container": 19, "google": 20, "utility": 22},
            "packages": {
                "e793beb630e09fb7da5ecef726f377462cd2ae0d": {
                "package_id": "e793beb630e09fb7da5ecef726f377462cd2ae0d",
                "os": "Macos",
                "arch": "armv8",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "c61e9af79e5b573dcc59aa722ab481a49519393e": {
                "package_id": "c61e9af79e5b573dcc59aa722ab481a49519393e",
                "os": "Macos",
                "arch": "armv8",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "ec2a9de6feab3c0b86da78a55456ffb819b1912b": {
                "package_id": "ec2a9de6feab3c0b86da78a55456ffb819b1912b",
                "os": "Macos",
                "arch": "x86_64",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "79c7c02f38aba9a2251f4091daf91ea3b11c0234": {
                "package_id": "79c7c02f38aba9a2251f4091daf91ea3b11c0234",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "193",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "fc491156b442836722612d1aa8a8c57e406447b6": {
                "package_id": "fc491156b442836722612d1aa8a8c57e406447b6",
                "os": "Linux",
                "arch": "x86_64",
                "compiler": "gcc",
                "compiler_cppstd": "17",
                "compiler_version": "11",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "13be611585c95453f1cbbd053cea04b3e64470ca": {
                "package_id": "13be611585c95453f1cbbd053cea04b3e64470ca",
                "os": "Linux",
                "arch": "x86_64",
                "compiler": "gcc",
                "compiler_cppstd": "17",
                "compiler_version": "11",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "9bdee485ef71c14ac5f8a657202632bdb8b4482b": {
                "package_id": "9bdee485ef71c14ac5f8a657202632bdb8b4482b",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "193",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "False"
                },
                "requires": []
                },
                "bfac49f477c2b8a07274dbc39ebe0ccf5a1f85bb": {
                "package_id": "bfac49f477c2b8a07274dbc39ebe0ccf5a1f85bb",
                "os": "Macos",
                "arch": "x86_64",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "18ff13b488eb6ad8b3de7e4298eee0e6b9445eb2": {
                "package_id": "18ff13b488eb6ad8b3de7e4298eee0e6b9445eb2",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "192",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "2401fa1d188d289bb25c37cfa3317e13e377a351": {
                "package_id": "2401fa1d188d289bb25c37cfa3317e13e377a351",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "192",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "False"
                },
                "requires": []
                }
            },
            "downloads": 0
            }
        },
        "2": {
            "name": name,
            "info": {
            "version": "20230125.2",
            "description": "Abseil Common Libraries (C++) from Google",
            "status": "unmaintained",
            "homepage": "https://github.com/abseil/abseil-cpp",
            "timestamp": "2024-01-23",
            "recipe_revision": "d88bebf75bb56cd9d09021b44d217d03",
            "licenses": {"Apache-2.0": 7},
            "labels": {"algorithm": 18, "common": 21, "container": 19, "google": 20, "utility": 22},
            "packages": {
                "ec2a9de6feab3c0b86da78a55456ffb819b1912b": {
                "package_id": "ec2a9de6feab3c0b86da78a55456ffb819b1912b",
                "os": "Macos",
                "arch": "x86_64",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "9bdee485ef71c14ac5f8a657202632bdb8b4482b": {
                "package_id": "9bdee485ef71c14ac5f8a657202632bdb8b4482b",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "193",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "False"
                },
                "requires": []
                },
                "bfac49f477c2b8a07274dbc39ebe0ccf5a1f85bb": {
                "package_id": "bfac49f477c2b8a07274dbc39ebe0ccf5a1f85bb",
                "os": "Macos",
                "arch": "x86_64",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "fc491156b442836722612d1aa8a8c57e406447b6": {
                "package_id": "fc491156b442836722612d1aa8a8c57e406447b6",
                "os": "Linux",
                "arch": "x86_64",
                "compiler": "gcc",
                "compiler_cppstd": "17",
                "compiler_version": "11",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "13be611585c95453f1cbbd053cea04b3e64470ca": {
                "package_id": "13be611585c95453f1cbbd053cea04b3e64470ca",
                "os": "Linux",
                "arch": "x86_64",
                "compiler": "gcc",
                "compiler_cppstd": "17",
                "compiler_version": "11",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "c61e9af79e5b573dcc59aa722ab481a49519393e": {
                "package_id": "c61e9af79e5b573dcc59aa722ab481a49519393e",
                "os": "Macos",
                "arch": "armv8",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "2401fa1d188d289bb25c37cfa3317e13e377a351": {
                "package_id": "2401fa1d188d289bb25c37cfa3317e13e377a351",
                "os": "Windows",
                "arch": "x86_64",
                "compiler": "msvc",
                "compiler_cppstd": "14",
                "compiler_version": "192",
                "build_type": "Release",
                "compiler_runtime": "dynamic",
                "compiler_runtime_type": "Release",
                "options": {
                    "shared": "False"
                },
                "requires": []
                },
                "e793beb630e09fb7da5ecef726f377462cd2ae0d": {
                "package_id": "e793beb630e09fb7da5ecef726f377462cd2ae0d",
                "os": "Macos",
                "arch": "armv8",
                "compiler": "apple-clang",
                "compiler_cppstd": "17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "81e7ccbdab18d49038f8dd7d434f19d9a2156e0b": {
                "package_id": "81e7ccbdab18d49038f8dd7d434f19d9a2156e0b",
                "os": "Macos",
                "arch": "x86_64",
                "compiler": "apple-clang",
                "compiler_cppstd": "gnu17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "8631cf963dbbb4d7a378a64a6fd1dc57558bc2fe": {
                "package_id": "8631cf963dbbb4d7a378a64a6fd1dc57558bc2fe",
                "os": "Linux",
                "arch": "x86_64",
                "compiler": "gcc",
                "compiler_cppstd": "gnu17",
                "compiler_version": "11",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "fb75dc6551441b61026abd7ad1cc655b6c1dc482": {
                "package_id": "fb75dc6551441b61026abd7ad1cc655b6c1dc482",
                "os": "Macos",
                "arch": "armv8",
                "compiler": "apple-clang",
                "compiler_cppstd": "gnu17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                },
                "b5494123a5bd37aa6b4c8cc3adc4063c59b65750": {
                "package_id": "b5494123a5bd37aa6b4c8cc3adc4063c59b65750",
                "os": "Linux",
                "arch": "x86_64",
                "compiler": "gcc",
                "compiler_cppstd": "gnu17",
                "compiler_version": "11",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "6ee0a36559a467c2becbb0cc2c99401c8b4ca465": {
                "package_id": "6ee0a36559a467c2becbb0cc2c99401c8b4ca465",
                "os": "Macos",
                "arch": "armv8",
                "compiler": "apple-clang",
                "compiler_cppstd": "gnu17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "shared": "True"
                },
                "requires": []
                },
                "de9831d946d78d4bac4951fac08e31bd50880567": {
                "package_id": "de9831d946d78d4bac4951fac08e31bd50880567",
                "os": "Macos",
                "arch": "x86_64",
                "compiler": "apple-clang",
                "compiler_cppstd": "gnu17",
                "compiler_version": "13",
                "build_type": "Release",
                "compiler_runtime": None,
                "compiler_runtime_type": None,
                "options": {
                    "fPIC": "True",
                    "shared": "False"
                },
                "requires": []
                }
            },
            "downloads": 0
            }
        },
    }

@app.get('/package/{name}/use_it')
async def get_md(name=''):
    return {
  "20230125.2": {
    "use_it": {
      "headers": [
        "absl/memory/memory.h",
        "absl/crc/crc32c.h",
        "absl/crc/internal/crc_internal.h",
        "absl/crc/internal/crc32c.h",
        "absl/crc/internal/crc.h",
        "absl/crc/internal/cpu_detect.h",
        "absl/crc/internal/crc32_x86_arm_combined_simd.h",
        "absl/crc/internal/non_temporal_memcpy.h",
        "absl/crc/internal/non_temporal_arm_intrinsics.h",
        "absl/crc/internal/crc_memcpy.h",
        "absl/crc/internal/crc_cord_state.h",
        "absl/crc/internal/crc32c_inline.h",
        "absl/profiling/internal/exponential_biased.h",
        "absl/profiling/internal/periodic_sampler.h",
        "absl/profiling/internal/sample_recorder.h",
        "absl/flags/usage.h",
        "absl/flags/declare.h",
        "absl/flags/config.h",
        "absl/flags/usage_config.h",
        "absl/flags/flag.h",
        "absl/flags/parse.h",
        "absl/flags/reflection.h",
        "absl/flags/marshalling.h",
        "absl/flags/commandlineflag.h",
        "absl/flags/internal/sequence_lock.h",
        "absl/flags/internal/usage.h",
        "absl/flags/internal/path_util.h",
        "absl/flags/internal/flag_msvc.inc",
        "absl/flags/internal/registry.h",
        "absl/flags/internal/program_name.h",
        "absl/flags/internal/flag.h",
        "absl/flags/internal/parse.h",
        "absl/flags/internal/private_handle_accessor.h",
        "absl/flags/internal/commandlineflag.h",
        "absl/synchronization/barrier.h",
        "absl/synchronization/mutex.h",
        "absl/synchronization/notification.h",
        "absl/synchronization/blocking_counter.h",
        "absl/synchronization/internal/kernel_timeout.h",
        "absl/synchronization/internal/waiter.h",
        "absl/synchronization/internal/futex.h",
        "absl/synchronization/internal/thread_pool.h",
        "absl/synchronization/internal/graphcycles.h",
        "absl/synchronization/internal/per_thread_sem.h",
        "absl/synchronization/internal/create_thread_identity.h",
        "absl/hash/hash.h",
        "absl/hash/hash_testing.h",
        "absl/hash/internal/spy_hash_state.h",
        "absl/hash/internal/low_level_hash.h",
        "absl/hash/internal/hash.h",
        "absl/hash/internal/city.h",
        "absl/utility/utility.h",
        "absl/log/scoped_mock_log.h",
        "absl/log/log_basic_test_impl.h",
        "absl/log/log.h",
        "absl/log/die_if_null.h",
        "absl/log/check_test_impl.h",
        "absl/log/check.h",
        "absl/log/globals.h",
        "absl/log/structured.h",
        "absl/log/absl_check.h",
        "absl/log/log_sink_registry.h",
        "absl/log/log_sink.h",
        "absl/log/log_entry.h",
        "absl/log/absl_log.h",
        "absl/log/log_streamer.h",
        "absl/log/flags.h",
        "absl/log/initialize.h",
        "absl/log/internal/check_op.h",
        "absl/log/internal/strip.h",
        "absl/log/internal/voidify.h",
        "absl/log/internal/log_impl.h",
        "absl/log/internal/nullguard.h",
        "absl/log/internal/log_message.h",
        "absl/log/internal/check_impl.h",
        "absl/log/internal/test_matchers.h",
        "absl/log/internal/globals.h",
        "absl/log/internal/append_truncated.h",
        "absl/log/internal/test_actions.h",
        "absl/log/internal/structured.h",
        "absl/log/internal/proto.h",
        "absl/log/internal/nullstream.h",
        "absl/log/internal/config.h",
        "absl/log/internal/conditions.h",
        "absl/log/internal/test_helpers.h",
        "absl/log/internal/flags.h",
        "absl/log/internal/log_sink_set.h",
        "absl/log/internal/log_format.h",
        "absl/random/gaussian_distribution.h",
        "absl/random/log_uniform_int_distribution.h",
        "absl/random/seed_gen_exception.h",
        "absl/random/bit_gen_ref.h",
        "absl/random/exponential_distribution.h",
        "absl/random/poisson_distribution.h",
        "absl/random/seed_sequences.h",
        "absl/random/beta_distribution.h",
        "absl/random/random.h",
        "absl/random/uniform_int_distribution.h",
        "absl/random/mocking_bit_gen.h",
        "absl/random/distributions.h",
        "absl/random/mock_distributions.h",
        "absl/random/zipf_distribution.h",
        "absl/random/uniform_real_distribution.h",
        "absl/random/discrete_distribution.h",
        "absl/random/bernoulli_distribution.h",
        "absl/random/internal/fast_uniform_bits.h",
        "absl/random/internal/uniform_helper.h",
        "absl/random/internal/platform.h",
        "absl/random/internal/distribution_caller.h",
        "absl/random/internal/salted_seed_seq.h",
        "absl/random/internal/nanobenchmark.h",
        "absl/random/internal/randen_slow.h",
        "absl/random/internal/traits.h",
        "absl/random/internal/seed_material.h",
        "absl/random/internal/randen_detect.h",
        "absl/random/internal/randen.h",
        "absl/random/internal/randen_hwaes.h",
        "absl/random/internal/iostream_state_saver.h",
        "absl/random/internal/generate_real.h",
        "absl/random/internal/sequence_urbg.h",
        "absl/random/internal/fastmath.h",
        "absl/random/internal/pool_urbg.h",
        "absl/random/internal/randen_traits.h",
        "absl/random/internal/explicit_seed_seq.h",
        "absl/random/internal/chi_square.h",
        "absl/random/internal/pcg_engine.h",
        "absl/random/internal/mock_overload_set.h",
        "absl/random/internal/mock_helpers.h",
        "absl/random/internal/nonsecure_base.h",
        "absl/random/internal/wide_multiply.h",
        "absl/random/internal/distribution_test_util.h",
        "absl/random/internal/randen_engine.h",
        "absl/strings/substitute.h",
        "absl/strings/strip.h",
        "absl/strings/str_replace.h",
        "absl/strings/escaping.h",
        "absl/strings/cord.h",
        "absl/strings/str_cat.h",
        "absl/strings/cord_test_helpers.h",
        "absl/strings/cord_buffer.h",
        "absl/strings/charconv.h",
        "absl/strings/string_view.h",
        "absl/strings/str_format.h",
        "absl/strings/str_join.h",
        "absl/strings/str_split.h",
        "absl/strings/ascii.h",
        "absl/strings/cordz_test_helpers.h",
        "absl/strings/cord_analysis.h",
        "absl/strings/match.h",
        "absl/strings/numbers.h",
        "absl/strings/internal/cord_rep_flat.h",
        "absl/strings/internal/cord_rep_crc.h",
        "absl/strings/internal/stl_type_traits.h",
        "absl/strings/internal/cord_rep_ring_reader.h",
        "absl/strings/internal/cord_rep_btree.h",
        "absl/strings/internal/cord_rep_consume.h",
        "absl/strings/internal/numbers_test_common.h",
        "absl/strings/internal/cordz_update_scope.h",
        "absl/strings/internal/string_constant.h",
        "absl/strings/internal/memutil.h",
        "absl/strings/internal/charconv_parse.h",
        "absl/strings/internal/cord_data_edge.h",
        "absl/strings/internal/stringify_sink.h",
        "absl/strings/internal/utf8.h",
        "absl/strings/internal/cord_rep_ring.h",
        "absl/strings/internal/char_map.h",
        "absl/strings/internal/cordz_functions.h",
        "absl/strings/internal/escaping.h",
        "absl/strings/internal/resize_uninitialized.h",
        "absl/strings/internal/damerau_levenshtein_distance.h",
        "absl/strings/internal/cordz_update_tracker.h",
        "absl/strings/internal/pow10_helper.h",
        "absl/strings/internal/escaping_test_common.h",
        "absl/strings/internal/ostringstream.h",
        "absl/strings/internal/str_join_internal.h",
        "absl/strings/internal/cordz_statistics.h",
        "absl/strings/internal/cord_internal.h",
        "absl/strings/internal/cordz_info.h",
        "absl/strings/internal/cord_rep_btree_navigator.h",
        "absl/strings/internal/str_split_internal.h",
        "absl/strings/internal/cordz_handle.h",
        "absl/strings/internal/cord_rep_test_util.h",
        "absl/strings/internal/cord_rep_btree_reader.h",
        "absl/strings/internal/cordz_sample_token.h",
        "absl/strings/internal/has_absl_stringify.h",
        "absl/strings/internal/charconv_bigint.h",
        "absl/strings/internal/str_format/parser.h",
        "absl/strings/internal/str_format/output.h",
        "absl/strings/internal/str_format/arg.h",
        "absl/strings/internal/str_format/checker.h",
        "absl/strings/internal/str_format/extension.h",
        "absl/strings/internal/str_format/float_conversion.h",
        "absl/strings/internal/str_format/bind.h",
        "absl/strings/internal/str_format/constexpr_parser.h",
        "absl/functional/any_invocable.h",
        "absl/functional/bind_front.h",
        "absl/functional/function_ref.h",
        "absl/functional/internal/any_invocable.h",
        "absl/functional/internal/function_ref.h",
        "absl/functional/internal/front_binder.h",
        "absl/container/flat_hash_set.h",
        "absl/container/btree_test.h",
        "absl/container/inlined_vector.h",
        "absl/container/flat_hash_map.h",
        "absl/container/btree_map.h",
        "absl/container/node_hash_set.h",
        "absl/container/fixed_array.h",
        "absl/container/btree_set.h",
        "absl/container/node_hash_map.h",
        "absl/container/internal/tracked.h",
        "absl/container/internal/unordered_map_members_test.h",
        "absl/container/internal/raw_hash_set.h",
        "absl/container/internal/unordered_map_constructor_test.h",
        "absl/container/internal/unordered_set_lookup_test.h",
        "absl/container/internal/hash_policy_traits.h",
        "absl/container/internal/hash_function_defaults.h",
        "absl/container/internal/common_policy_traits.h",
        "absl/container/internal/inlined_vector.h",
        "absl/container/internal/counting_allocator.h",
        "absl/container/internal/hashtable_debug_hooks.h",
        "absl/container/internal/unordered_set_modifiers_test.h",
        "absl/container/internal/hashtablez_sampler.h",
        "absl/container/internal/layout.h",
        "absl/container/internal/unordered_set_members_test.h",
        "absl/container/internal/hash_generator_testing.h",
        "absl/container/internal/raw_hash_map.h",
        "absl/container/internal/hashtable_debug.h",
        "absl/container/internal/unordered_set_constructor_test.h",
        "absl/container/internal/common.h",
        "absl/container/internal/btree_container.h",
        "absl/container/internal/unordered_map_lookup_test.h",
        "absl/container/internal/test_instance_tracker.h",
        "absl/container/internal/unordered_map_modifiers_test.h",
        "absl/container/internal/hash_policy_testing.h",
        "absl/container/internal/container_memory.h",
        "absl/container/internal/compressed_tuple.h",
        "absl/container/internal/node_slot_policy.h",
        "absl/container/internal/btree.h",
        "absl/base/const_init.h",
        "absl/base/casts.h",
        "absl/base/attributes.h",
        "absl/base/optimization.h",
        "absl/base/options.h",
        "absl/base/thread_annotations.h",
        "absl/base/call_once.h",
        "absl/base/log_severity.h",
        "absl/base/policy_checks.h",
        "absl/base/dynamic_annotations.h",
        "absl/base/config.h",
        "absl/base/port.h",
        "absl/base/macros.h",
        "absl/base/internal/cycleclock.h",
        "absl/base/internal/per_thread_tls.h",
        "absl/base/internal/scheduling_mode.h",
        "absl/base/internal/invoke.h",
        "absl/base/internal/spinlock_wait.h",
        "absl/base/internal/spinlock.h",
        "absl/base/internal/low_level_scheduling.h",
        "absl/base/internal/cycleclock_config.h",
        "absl/base/internal/spinlock_linux.inc",
        "absl/base/internal/exception_testing.h",
        "absl/base/internal/pretty_function.h",
        "absl/base/internal/spinlock_akaros.inc",
        "absl/base/internal/throw_delegate.h",
        "absl/base/internal/unscaledcycleclock.h",
        "absl/base/internal/thread_annotations.h",
        "absl/base/internal/tsan_mutex_interface.h",
        "absl/base/internal/inline_variable_testing.h",
        "absl/base/internal/direct_mmap.h",
        "absl/base/internal/identity.h",
        "absl/base/internal/dynamic_annotations.h",
        "absl/base/internal/raw_logging.h",
        "absl/base/internal/sysinfo.h",
        "absl/base/internal/thread_identity.h",
        "absl/base/internal/hide_ptr.h",
        "absl/base/internal/low_level_alloc.h",
        "absl/base/internal/spinlock_win32.inc",
        "absl/base/internal/strerror.h",
        "absl/base/internal/inline_variable.h",
        "absl/base/internal/fast_type_id.h",
        "absl/base/internal/unscaledcycleclock_config.h",
        "absl/base/internal/scoped_set_env.h",
        "absl/base/internal/exception_safety_testing.h",
        "absl/base/internal/unaligned_access.h",
        "absl/base/internal/prefetch.h",
        "absl/base/internal/errno_saver.h",
        "absl/base/internal/atomic_hook.h",
        "absl/base/internal/endian.h",
        "absl/base/internal/spinlock_posix.inc",
        "absl/base/internal/atomic_hook_test_helper.h",
        "absl/debugging/symbolize_darwin.inc",
        "absl/debugging/leak_check.h",
        "absl/debugging/stacktrace.h",
        "absl/debugging/symbolize_unimplemented.inc",
        "absl/debugging/symbolize_elf.inc",
        "absl/debugging/failure_signal_handler.h",
        "absl/debugging/symbolize_win32.inc",
        "absl/debugging/symbolize_emscripten.inc",
        "absl/debugging/symbolize.h",
        "absl/debugging/internal/stacktrace_arm-inl.inc",
        "absl/debugging/internal/stack_consumption.h",
        "absl/debugging/internal/vdso_support.h",
        "absl/debugging/internal/examine_stack.h",
        "absl/debugging/internal/stacktrace_x86-inl.inc",
        "absl/debugging/internal/stacktrace_aarch64-inl.inc",
        "absl/debugging/internal/stacktrace_win32-inl.inc",
        "absl/debugging/internal/stacktrace_unimplemented-inl.inc",
        "absl/debugging/internal/stacktrace_emscripten-inl.inc",
        "absl/debugging/internal/elf_mem_image.h",
        "absl/debugging/internal/stacktrace_riscv-inl.inc",
        "absl/debugging/internal/stacktrace_generic-inl.inc",
        "absl/debugging/internal/stacktrace_config.h",
        "absl/debugging/internal/address_is_readable.h",
        "absl/debugging/internal/stacktrace_powerpc-inl.inc",
        "absl/debugging/internal/demangle.h",
        "absl/debugging/internal/symbolize.h",
        "absl/meta/type_traits.h",
        "absl/cleanup/cleanup.h",
        "absl/cleanup/internal/cleanup.h",
        "absl/algorithm/algorithm.h",
        "absl/algorithm/container.h",
        "absl/numeric/bits.h",
        "absl/numeric/int128.h",
        "absl/numeric/int128_have_intrinsic.inc",
        "absl/numeric/int128_no_intrinsic.inc",
        "absl/numeric/internal/bits.h",
        "absl/numeric/internal/representation.h",
        "absl/types/variant.h",
        "absl/types/any.h",
        "absl/types/optional.h",
        "absl/types/bad_variant_access.h",
        "absl/types/span.h",
        "absl/types/bad_any_cast.h",
        "absl/types/compare.h",
        "absl/types/bad_optional_access.h",
        "absl/types/internal/variant.h",
        "absl/types/internal/optional.h",
        "absl/types/internal/conformance_archetype.h",
        "absl/types/internal/span.h",
        "absl/types/internal/conformance_testing.h",
        "absl/types/internal/conformance_testing_helpers.h",
        "absl/types/internal/parentheses.h",
        "absl/types/internal/conformance_profile.h",
        "absl/types/internal/transform_args.h",
        "absl/types/internal/conformance_aliases.h",
        "absl/status/status_payload_printer.h",
        "absl/status/statusor.h",
        "absl/status/status.h",
        "absl/status/internal/status_internal.h",
        "absl/status/internal/statusor_internal.h",
        "absl/time/time.h",
        "absl/time/clock.h",
        "absl/time/civil_time.h",
        "absl/time/internal/test_util.h",
        "absl/time/internal/get_current_time_posix.inc",
        "absl/time/internal/get_current_time_chrono.inc",
        "absl/time/internal/cctz/src/time_zone_impl.h",
        "absl/time/internal/cctz/src/time_zone_info.h",
        "absl/time/internal/cctz/src/tzfile.h",
        "absl/time/internal/cctz/src/time_zone_fixed.h",
        "absl/time/internal/cctz/src/time_zone_posix.h",
        "absl/time/internal/cctz/src/time_zone_if.h",
        "absl/time/internal/cctz/src/time_zone_libc.h",
        "absl/time/internal/cctz/include/cctz/time_zone.h",
        "absl/time/internal/cctz/include/cctz/zone_info_source.h",
        "absl/time/internal/cctz/include/cctz/civil_time.h",
        "absl/time/internal/cctz/include/cctz/civil_time_detail.h"
      ],
      "requires": [],
      "properties": {
        "cmake_file_name": "absl",
        "cmake_build_modules": [
          "/root/.conan2/p/b/abseiea8fc4d33c29a/p/lib/cmake/conan_trick/cxx_std.cmake"
        ]
      },
      "package_type": "static-library",
      "build_requires": [],
      "components_properties": {
        "absl_any": {
          "pkg_config_name": "absl_any",
          "cmake_target_name": "absl::any"
        },
        "absl_log": {
          "pkg_config_name": "absl_log",
          "cmake_target_name": "absl::log"
        },
        "absl_base": {
          "pkg_config_name": "absl_base",
          "cmake_target_name": "absl::base"
        },
        "absl_bits": {
          "pkg_config_name": "absl_bits",
          "cmake_target_name": "absl::bits"
        },
        "absl_city": {
          "pkg_config_name": "absl_city",
          "cmake_target_name": "absl::city"
        },
        "absl_cord": {
          "pkg_config_name": "absl_cord",
          "cmake_target_name": "absl::cord"
        },
        "absl_hash": {
          "pkg_config_name": "absl_hash",
          "cmake_target_name": "absl::hash"
        },
        "absl_meta": {
          "pkg_config_name": "absl_meta",
          "cmake_target_name": "absl::meta"
        },
        "absl_span": {
          "pkg_config_name": "absl_span",
          "cmake_target_name": "absl::span"
        },
        "absl_time": {
          "pkg_config_name": "absl_time",
          "cmake_target_name": "absl::time"
        },
        "absl_btree": {
          "pkg_config_name": "absl_btree",
          "cmake_target_name": "absl::btree"
        },
        "absl_check": {
          "pkg_config_name": "absl_check",
          "cmake_target_name": "absl::check"
        },
        "absl_flags": {
          "pkg_config_name": "absl_flags",
          "cmake_target_name": "absl::flags"
        },
        "absl_config": {
          "pkg_config_name": "absl_config",
          "cmake_target_name": "absl::config"
        },
        "absl_crc32c": {
          "pkg_config_name": "absl_crc32c",
          "cmake_target_name": "absl::crc32c"
        },
        "absl_endian": {
          "pkg_config_name": "absl_endian",
          "cmake_target_name": "absl::endian"
        },
        "absl_int128": {
          "pkg_config_name": "absl_int128",
          "cmake_target_name": "absl::int128"
        },
        "absl_layout": {
          "pkg_config_name": "absl_layout",
          "cmake_target_name": "absl::layout"
        },
        "absl_memory": {
          "pkg_config_name": "absl_memory",
          "cmake_target_name": "absl::memory"
        },
        "absl_status": {
          "pkg_config_name": "absl_status",
          "cmake_target_name": "absl::status"
        },
        "absl_cleanup": {
          "pkg_config_name": "absl_cleanup",
          "cmake_target_name": "absl::cleanup"
        },
        "absl_compare": {
          "pkg_config_name": "absl_compare",
          "cmake_target_name": "absl::compare"
        },
        "absl_numeric": {
          "pkg_config_name": "absl_numeric",
          "cmake_target_name": "absl::numeric"
        },
        "absl_strings": {
          "pkg_config_name": "absl_strings",
          "cmake_target_name": "absl::strings"
        },
        "absl_utility": {
          "pkg_config_name": "absl_utility",
          "cmake_target_name": "absl::utility"
        },
        "absl_variant": {
          "pkg_config_name": "absl_variant",
          "cmake_target_name": "absl::variant"
        },
        "absl_absl_log": {
          "pkg_config_name": "absl_absl_log",
          "cmake_target_name": "absl::absl_log"
        },
        "absl_log_sink": {
          "pkg_config_name": "absl_log_sink",
          "cmake_target_name": "absl::log_sink"
        },
        "absl_optional": {
          "pkg_config_name": "absl_optional",
          "cmake_target_name": "absl::optional"
        },
        "absl_prefetch": {
          "pkg_config_name": "absl_prefetch",
          "cmake_target_name": "absl::prefetch"
        },
        "absl_statusor": {
          "pkg_config_name": "absl_statusor",
          "cmake_target_name": "absl::statusor"
        },
        "absl_strerror": {
          "pkg_config_name": "absl_strerror",
          "cmake_target_name": "absl::strerror"
        },
        "absl_algorithm": {
          "pkg_config_name": "absl_algorithm",
          "cmake_target_name": "absl::algorithm"
        },
        "absl_debugging": {
          "pkg_config_name": "absl_debugging",
          "cmake_target_name": "absl::debugging"
        },
        "absl_log_entry": {
          "pkg_config_name": "absl_log_entry",
          "cmake_target_name": "absl::log_entry"
        },
        "absl_log_flags": {
          "pkg_config_name": "absl_log_flags",
          "cmake_target_name": "absl::log_flags"
        },
        "absl_symbolize": {
          "pkg_config_name": "absl_symbolize",
          "cmake_target_name": "absl::symbolize"
        },
        "absl_time_zone": {
          "pkg_config_name": "absl_time_zone",
          "cmake_target_name": "absl::time_zone"
        },
        "absl_absl_check": {
          "pkg_config_name": "absl_absl_check",
          "cmake_target_name": "absl::absl_check"
        },
        "absl_bind_front": {
          "pkg_config_name": "absl_bind_front",
          "cmake_target_name": "absl::bind_front"
        },
        "absl_civil_time": {
          "pkg_config_name": "absl_civil_time",
          "cmake_target_name": "absl::civil_time"
        },
        "absl_cordz_info": {
          "pkg_config_name": "absl_cordz_info",
          "cmake_target_name": "absl::cordz_info"
        },
        "absl_leak_check": {
          "pkg_config_name": "absl_leak_check",
          "cmake_target_name": "absl::leak_check"
        },
        "absl_stacktrace": {
          "pkg_config_name": "absl_stacktrace",
          "cmake_target_name": "absl::stacktrace"
        },
        "absl_str_format": {
          "pkg_config_name": "absl_str_format",
          "cmake_target_name": "absl::str_format"
        },
        "absl_atomic_hook": {
          "pkg_config_name": "absl_atomic_hook",
          "cmake_target_name": "absl::atomic_hook"
        },
        "absl_die_if_null": {
          "pkg_config_name": "absl_die_if_null",
          "cmake_target_name": "absl::die_if_null"
        },
        "absl_errno_saver": {
          "pkg_config_name": "absl_errno_saver",
          "cmake_target_name": "absl::errno_saver"
        },
        "absl_fixed_array": {
          "pkg_config_name": "absl_fixed_array",
          "cmake_target_name": "absl::fixed_array"
        },
        "absl_flags_parse": {
          "pkg_config_name": "absl_flags_parse",
          "cmake_target_name": "absl::flags_parse"
        },
        "absl_flags_usage": {
          "pkg_config_name": "absl_flags_usage",
          "cmake_target_name": "absl::flags_usage"
        },
        "absl_log_globals": {
          "pkg_config_name": "absl_log_globals",
          "cmake_target_name": "absl::log_globals"
        },
        "absl_type_traits": {
          "pkg_config_name": "absl_type_traits",
          "cmake_target_name": "absl::type_traits"
        },
        "absl_bad_any_cast": {
          "pkg_config_name": "absl_bad_any_cast",
          "cmake_target_name": "absl::bad_any_cast"
        },
        "absl_cordz_handle": {
          "pkg_config_name": "absl_cordz_handle",
          "cmake_target_name": "absl::cordz_handle"
        },
        "absl_core_headers": {
          "pkg_config_name": "absl_core_headers",
          "cmake_target_name": "absl::core_headers"
        },
        "absl_crc_internal": {
          "pkg_config_name": "absl_crc_internal",
          "cmake_target_name": "absl::crc_internal"
        },
        "absl_fast_type_id": {
          "pkg_config_name": "absl_fast_type_id",
          "cmake_target_name": "absl::fast_type_id"
        },
        "absl_flags_config": {
          "pkg_config_name": "absl_flags_config",
          "cmake_target_name": "absl::flags_config"
        },
        "absl_function_ref": {
          "pkg_config_name": "absl_function_ref",
          "cmake_target_name": "absl::function_ref"
        },
        "absl_log_severity": {
          "pkg_config_name": "absl_log_severity",
          "cmake_target_name": "absl::log_severity"
        },
        "absl_log_streamer": {
          "pkg_config_name": "absl_log_streamer",
          "cmake_target_name": "absl::log_streamer"
        },
        "absl_raw_hash_map": {
          "pkg_config_name": "absl_raw_hash_map",
          "cmake_target_name": "absl::raw_hash_map"
        },
        "absl_raw_hash_set": {
          "pkg_config_name": "absl_raw_hash_set",
          "cmake_target_name": "absl::raw_hash_set"
        },
        "absl_any_invocable": {
          "pkg_config_name": "absl_any_invocable",
          "cmake_target_name": "absl::any_invocable"
        },
        "absl_base_internal": {
          "pkg_config_name": "absl_base_internal",
          "cmake_target_name": "absl::base_internal"
        },
        "absl_cord_internal": {
          "pkg_config_name": "absl_cord_internal",
          "cmake_target_name": "absl::cord_internal"
        },
        "absl_examine_stack": {
          "pkg_config_name": "absl_examine_stack",
          "cmake_target_name": "absl::examine_stack"
        },
        "absl_flat_hash_map": {
          "pkg_config_name": "absl_flat_hash_map",
          "cmake_target_name": "absl::flat_hash_map"
        },
        "absl_flat_hash_set": {
          "pkg_config_name": "absl_flat_hash_set",
          "cmake_target_name": "absl::flat_hash_set"
        },
        "absl_node_hash_map": {
          "pkg_config_name": "absl_node_hash_map",
          "cmake_target_name": "absl::node_hash_map"
        },
        "absl_node_hash_set": {
          "pkg_config_name": "absl_node_hash_set",
          "cmake_target_name": "absl::node_hash_set"
        },
        "absl_random_random": {
          "pkg_config_name": "absl_random_random",
          "cmake_target_name": "absl::random_random"
        },
        "absl_spinlock_wait": {
          "pkg_config_name": "absl_spinlock_wait",
          "cmake_target_name": "absl::spinlock_wait"
        },
        "absl_crc_cord_state": {
          "pkg_config_name": "absl_crc_cord_state",
          "cmake_target_name": "absl::crc_cord_state"
        },
        "absl_crc_cpu_detect": {
          "pkg_config_name": "absl_crc_cpu_detect",
          "cmake_target_name": "absl::crc_cpu_detect"
        },
        "absl_flags_internal": {
          "pkg_config_name": "absl_flags_internal",
          "cmake_target_name": "absl::flags_internal"
        },
        "absl_inlined_vector": {
          "pkg_config_name": "absl_inlined_vector",
          "cmake_target_name": "absl::inlined_vector"
        },
        "absl_log_initialize": {
          "pkg_config_name": "absl_log_initialize",
          "cmake_target_name": "absl::log_initialize"
        },
        "absl_log_structured": {
          "pkg_config_name": "absl_log_structured",
          "cmake_target_name": "absl::log_structured"
        },
        "absl_low_level_hash": {
          "pkg_config_name": "absl_low_level_hash",
          "cmake_target_name": "absl::low_level_hash"
        },
        "absl_scoped_set_env": {
          "pkg_config_name": "absl_scoped_set_env",
          "cmake_target_name": "absl::scoped_set_env"
        },
        "absl_throw_delegate": {
          "pkg_config_name": "absl_throw_delegate",
          "cmake_target_name": "absl::throw_delegate"
        },
        "absl_cordz_functions": {
          "pkg_config_name": "absl_cordz_functions",
          "cmake_target_name": "absl::cordz_functions"
        },
        "absl_flags_path_util": {
          "pkg_config_name": "absl_flags_path_util",
          "cmake_target_name": "absl::flags_path_util"
        },
        "absl_hashtable_debug": {
          "pkg_config_name": "absl_hashtable_debug",
          "cmake_target_name": "absl::hashtable_debug"
        },
        "absl_malloc_internal": {
          "pkg_config_name": "absl_malloc_internal",
          "cmake_target_name": "absl::malloc_internal"
        },
        "absl_pretty_function": {
          "pkg_config_name": "absl_pretty_function",
          "cmake_target_name": "absl::pretty_function"
        },
        "absl_sample_recorder": {
          "pkg_config_name": "absl_sample_recorder",
          "cmake_target_name": "absl::sample_recorder"
        },
        "absl_synchronization": {
          "pkg_config_name": "absl_synchronization",
          "cmake_target_name": "absl::synchronization"
        },
        "absl_cleanup_internal": {
          "pkg_config_name": "absl_cleanup_internal",
          "cmake_target_name": "absl::cleanup_internal"
        },
        "absl_compressed_tuple": {
          "pkg_config_name": "absl_compressed_tuple",
          "cmake_target_name": "absl::compressed_tuple"
        },
        "absl_container_common": {
          "pkg_config_name": "absl_container_common",
          "cmake_target_name": "absl::container_common"
        },
        "absl_container_memory": {
          "pkg_config_name": "absl_container_memory",
          "cmake_target_name": "absl::container_memory"
        },
        "absl_cordz_statistics": {
          "pkg_config_name": "absl_cordz_statistics",
          "cmake_target_name": "absl::cordz_statistics"
        },
        "absl_flags_reflection": {
          "pkg_config_name": "absl_flags_reflection",
          "cmake_target_name": "absl::flags_reflection"
        },
        "absl_node_slot_policy": {
          "pkg_config_name": "absl_node_slot_policy",
          "cmake_target_name": "absl::node_slot_policy"
        },
        "absl_periodic_sampler": {
          "pkg_config_name": "absl_periodic_sampler",
          "cmake_target_name": "absl::periodic_sampler"
        },
        "absl_strings_internal": {
          "pkg_config_name": "absl_strings_internal",
          "cmake_target_name": "absl::strings_internal"
        },
        "absl_bad_any_cast_impl": {
          "pkg_config_name": "absl_bad_any_cast_impl",
          "cmake_target_name": "absl::bad_any_cast_impl"
        },
        "absl_demangle_internal": {
          "pkg_config_name": "absl_demangle_internal",
          "cmake_target_name": "absl::demangle_internal"
        },
        "absl_flags_marshalling": {
          "pkg_config_name": "absl_flags_marshalling",
          "cmake_target_name": "absl::flags_marshalling"
        },
        "absl_log_sink_registry": {
          "pkg_config_name": "absl_log_sink_registry",
          "cmake_target_name": "absl::log_sink_registry"
        },
        "absl_bad_variant_access": {
          "pkg_config_name": "absl_bad_variant_access",
          "cmake_target_name": "absl::bad_variant_access"
        },
        "absl_cordz_sample_token": {
          "pkg_config_name": "absl_cordz_sample_token",
          "cmake_target_name": "absl::cordz_sample_token"
        },
        "absl_cordz_update_scope": {
          "pkg_config_name": "absl_cordz_update_scope",
          "cmake_target_name": "absl::cordz_update_scope"
        },
        "absl_counting_allocator": {
          "pkg_config_name": "absl_counting_allocator",
          "cmake_target_name": "absl::counting_allocator"
        },
        "absl_debugging_internal": {
          "pkg_config_name": "absl_debugging_internal",
          "cmake_target_name": "absl::debugging_internal"
        },
        "absl_exponential_biased": {
          "pkg_config_name": "absl_exponential_biased",
          "cmake_target_name": "absl::exponential_biased"
        },
        "absl_flags_program_name": {
          "pkg_config_name": "absl_flags_program_name",
          "cmake_target_name": "absl::flags_program_name"
        },
        "absl_hash_policy_traits": {
          "pkg_config_name": "absl_hash_policy_traits",
          "cmake_target_name": "absl::hash_policy_traits"
        },
        "absl_hashtablez_sampler": {
          "pkg_config_name": "absl_hashtablez_sampler",
          "cmake_target_name": "absl::hashtablez_sampler"
        },
        "absl_log_internal_flags": {
          "pkg_config_name": "absl_log_internal_flags",
          "cmake_target_name": "absl::log_internal_flags"
        },
        "absl_log_internal_proto": {
          "pkg_config_name": "absl_log_internal_proto",
          "cmake_target_name": "absl::log_internal_proto"
        },
        "absl_log_internal_strip": {
          "pkg_config_name": "absl_log_internal_strip",
          "cmake_target_name": "absl::log_internal_strip"
        },
        "absl_random_bit_gen_ref": {
          "pkg_config_name": "absl_random_bit_gen_ref",
          "cmake_target_name": "absl::random_bit_gen_ref"
        },
        "absl_algorithm_container": {
          "pkg_config_name": "absl_algorithm_container",
          "cmake_target_name": "absl::algorithm_container"
        },
        "absl_bad_optional_access": {
          "pkg_config_name": "absl_bad_optional_access",
          "cmake_target_name": "absl::bad_optional_access"
        },
        "absl_dynamic_annotations": {
          "pkg_config_name": "absl_dynamic_annotations",
          "cmake_target_name": "absl::dynamic_annotations"
        },
        "absl_log_internal_config": {
          "pkg_config_name": "absl_log_internal_config",
          "cmake_target_name": "absl::log_internal_config"
        },
        "absl_log_internal_format": {
          "pkg_config_name": "absl_log_internal_format",
          "cmake_target_name": "absl::log_internal_format"
        },
        "absl_non_temporal_memcpy": {
          "pkg_config_name": "absl_non_temporal_memcpy",
          "cmake_target_name": "absl::non_temporal_memcpy"
        },
        "absl_str_format_internal": {
          "pkg_config_name": "absl_str_format_internal",
          "cmake_target_name": "absl::str_format_internal"
        },
        "absl_common_policy_traits": {
          "pkg_config_name": "absl_common_policy_traits",
          "cmake_target_name": "absl::common_policy_traits"
        },
        "absl_cordz_update_tracker": {
          "pkg_config_name": "absl_cordz_update_tracker",
          "cmake_target_name": "absl::cordz_update_tracker"
        },
        "absl_flags_usage_internal": {
          "pkg_config_name": "absl_flags_usage_internal",
          "cmake_target_name": "absl::flags_usage_internal"
        },
        "absl_graphcycles_internal": {
          "pkg_config_name": "absl_graphcycles_internal",
          "cmake_target_name": "absl::graphcycles_internal"
        },
        "absl_log_internal_globals": {
          "pkg_config_name": "absl_log_internal_globals",
          "cmake_target_name": "absl::log_internal_globals"
        },
        "absl_log_internal_message": {
          "pkg_config_name": "absl_log_internal_message",
          "cmake_target_name": "absl::log_internal_message"
        },
        "absl_log_internal_voidify": {
          "pkg_config_name": "absl_log_internal_voidify",
          "cmake_target_name": "absl::log_internal_voidify"
        },
        "absl_random_distributions": {
          "pkg_config_name": "absl_random_distributions",
          "cmake_target_name": "absl::random_distributions"
        },
        "absl_raw_logging_internal": {
          "pkg_config_name": "absl_raw_logging_internal",
          "cmake_target_name": "absl::raw_logging_internal"
        },
        "absl_flags_commandlineflag": {
          "pkg_config_name": "absl_flags_commandlineflag",
          "cmake_target_name": "absl::flags_commandlineflag"
        },
        "absl_hashtable_debug_hooks": {
          "pkg_config_name": "absl_hashtable_debug_hooks",
          "cmake_target_name": "absl::hashtable_debug_hooks"
        },
        "absl_log_internal_check_op": {
          "pkg_config_name": "absl_log_internal_check_op",
          "cmake_target_name": "absl::log_internal_check_op"
        },
        "absl_log_internal_log_impl": {
          "pkg_config_name": "absl_log_internal_log_impl",
          "cmake_target_name": "absl::log_internal_log_impl"
        },
        "absl_random_seed_sequences": {
          "pkg_config_name": "absl_random_seed_sequences",
          "cmake_target_name": "absl::random_seed_sequences"
        },
        "absl_failure_signal_handler": {
          "pkg_config_name": "absl_failure_signal_handler",
          "cmake_target_name": "absl::failure_signal_handler"
        },
        "absl_hash_function_defaults": {
          "pkg_config_name": "absl_hash_function_defaults",
          "cmake_target_name": "absl::hash_function_defaults"
        },
        "absl_log_internal_nullguard": {
          "pkg_config_name": "absl_log_internal_nullguard",
          "cmake_target_name": "absl::log_internal_nullguard"
        },
        "absl_numeric_representation": {
          "pkg_config_name": "absl_numeric_representation",
          "cmake_target_name": "absl::numeric_representation"
        },
        "absl_random_internal_randen": {
          "pkg_config_name": "absl_random_internal_randen",
          "cmake_target_name": "absl::random_internal_randen"
        },
        "absl_random_internal_traits": {
          "pkg_config_name": "absl_random_internal_traits",
          "cmake_target_name": "absl::random_internal_traits"
        },
        "absl_inlined_vector_internal": {
          "pkg_config_name": "absl_inlined_vector_internal",
          "cmake_target_name": "absl::inlined_vector_internal"
        },
        "absl_kernel_timeout_internal": {
          "pkg_config_name": "absl_kernel_timeout_internal",
          "cmake_target_name": "absl::kernel_timeout_internal"
        },
        "absl_log_internal_check_impl": {
          "pkg_config_name": "absl_log_internal_check_impl",
          "cmake_target_name": "absl::log_internal_check_impl"
        },
        "absl_log_internal_conditions": {
          "pkg_config_name": "absl_log_internal_conditions",
          "cmake_target_name": "absl::log_internal_conditions"
        },
        "absl_log_internal_nullstream": {
          "pkg_config_name": "absl_log_internal_nullstream",
          "cmake_target_name": "absl::log_internal_nullstream"
        },
        "absl_log_internal_structured": {
          "pkg_config_name": "absl_log_internal_structured",
          "cmake_target_name": "absl::log_internal_structured"
        },
        "absl_random_internal_fastmath": {
          "pkg_config_name": "absl_random_internal_fastmath",
          "cmake_target_name": "absl::random_internal_fastmath"
        },
        "absl_random_internal_platform": {
          "pkg_config_name": "absl_random_internal_platform",
          "cmake_target_name": "absl::random_internal_platform"
        },
        "absl_log_internal_log_sink_set": {
          "pkg_config_name": "absl_log_internal_log_sink_set",
          "cmake_target_name": "absl::log_internal_log_sink_set"
        },
        "absl_random_internal_pool_urbg": {
          "pkg_config_name": "absl_random_internal_pool_urbg",
          "cmake_target_name": "absl::random_internal_pool_urbg"
        },
        "absl_random_seed_gen_exception": {
          "pkg_config_name": "absl_random_seed_gen_exception",
          "cmake_target_name": "absl::random_seed_gen_exception"
        },
        "absl_random_internal_pcg_engine": {
          "pkg_config_name": "absl_random_internal_pcg_engine",
          "cmake_target_name": "absl::random_internal_pcg_engine"
        },
        "absl_non_temporal_arm_intrinsics": {
          "pkg_config_name": "absl_non_temporal_arm_intrinsics",
          "cmake_target_name": "absl::non_temporal_arm_intrinsics"
        },
        "absl_random_internal_randen_slow": {
          "pkg_config_name": "absl_random_internal_randen_slow",
          "cmake_target_name": "absl::random_internal_randen_slow"
        },
        "absl_random_internal_mock_helpers": {
          "pkg_config_name": "absl_random_internal_mock_helpers",
          "cmake_target_name": "absl::random_internal_mock_helpers"
        },
        "absl_random_internal_randen_hwaes": {
          "pkg_config_name": "absl_random_internal_randen_hwaes",
          "cmake_target_name": "absl::random_internal_randen_hwaes"
        },
        "absl_flags_private_handle_accessor": {
          "pkg_config_name": "absl_flags_private_handle_accessor",
          "cmake_target_name": "absl::flags_private_handle_accessor"
        },
        "absl_log_internal_append_truncated": {
          "pkg_config_name": "absl_log_internal_append_truncated",
          "cmake_target_name": "absl::log_internal_append_truncated"
        },
        "absl_random_internal_generate_real": {
          "pkg_config_name": "absl_random_internal_generate_real",
          "cmake_target_name": "absl::random_internal_generate_real"
        },
        "absl_random_internal_randen_engine": {
          "pkg_config_name": "absl_random_internal_randen_engine",
          "cmake_target_name": "absl::random_internal_randen_engine"
        },
        "absl_random_internal_seed_material": {
          "pkg_config_name": "absl_random_internal_seed_material",
          "cmake_target_name": "absl::random_internal_seed_material"
        },
        "absl_random_internal_wide_multiply": {
          "pkg_config_name": "absl_random_internal_wide_multiply",
          "cmake_target_name": "absl::random_internal_wide_multiply"
        },
        "absl_flags_commandlineflag_internal": {
          "pkg_config_name": "absl_flags_commandlineflag_internal",
          "cmake_target_name": "absl::flags_commandlineflag_internal"
        },
        "absl_random_internal_nonsecure_base": {
          "pkg_config_name": "absl_random_internal_nonsecure_base",
          "cmake_target_name": "absl::random_internal_nonsecure_base"
        },
        "absl_random_internal_uniform_helper": {
          "pkg_config_name": "absl_random_internal_uniform_helper",
          "cmake_target_name": "absl::random_internal_uniform_helper"
        },
        "absl_random_internal_salted_seed_seq": {
          "pkg_config_name": "absl_random_internal_salted_seed_seq",
          "cmake_target_name": "absl::random_internal_salted_seed_seq"
        },
        "absl_random_internal_fast_uniform_bits": {
          "pkg_config_name": "absl_random_internal_fast_uniform_bits",
          "cmake_target_name": "absl::random_internal_fast_uniform_bits"
        },
        "absl_random_internal_randen_hwaes_impl": {
          "pkg_config_name": "absl_random_internal_randen_hwaes_impl",
          "cmake_target_name": "absl::random_internal_randen_hwaes_impl"
        },
        "absl_random_internal_distribution_caller": {
          "pkg_config_name": "absl_random_internal_distribution_caller",
          "cmake_target_name": "absl::random_internal_distribution_caller"
        },
        "absl_random_internal_iostream_state_saver": {
          "pkg_config_name": "absl_random_internal_iostream_state_saver",
          "cmake_target_name": "absl::random_internal_iostream_state_saver"
        },
        "absl_random_internal_distribution_test_util": {
          "pkg_config_name": "absl_random_internal_distribution_test_util",
          "cmake_target_name": "absl::random_internal_distribution_test_util"
        }
      }
    },
    "recipe_revision": "24e0584aa2ae6d2fb9e9cd0027354ee2"
  },
   "20240116.1": {
    "use_it": {
      "headers": [
        "absl/flags/config.h",
        "absl/flags/marshalling.h",
        "absl/flags/reflection.h",
        "absl/flags/parse.h",
        "absl/flags/usage.h",
        "absl/flags/flag.h",
        "absl/flags/commandlineflag.h",
        "absl/flags/declare.h",
        "absl/flags/usage_config.h",
        "absl/flags/internal/registry.h",
        "absl/flags/internal/parse.h",
        "absl/flags/internal/usage.h",
        "absl/flags/internal/sequence_lock.h",
        "absl/flags/internal/program_name.h",
        "absl/flags/internal/flag.h",
        "absl/flags/internal/private_handle_accessor.h",
        "absl/flags/internal/commandlineflag.h",
        "absl/flags/internal/path_util.h",
        "absl/time/time.h",
        "absl/time/clock.h",
        "absl/time/civil_time.h",
        "absl/time/internal/get_current_time_chrono.inc",
        "absl/time/internal/test_util.h",
        "absl/time/internal/get_current_time_posix.inc",
        "absl/time/internal/cctz/include/cctz/civil_time_detail.h",
        "absl/time/internal/cctz/include/cctz/civil_time.h",
        "absl/time/internal/cctz/include/cctz/time_zone.h",
        "absl/time/internal/cctz/include/cctz/zone_info_source.h",
        "absl/time/internal/cctz/src/time_zone_posix.h",
        "absl/time/internal/cctz/src/time_zone_impl.h",
        "absl/time/internal/cctz/src/time_zone_fixed.h",
        "absl/time/internal/cctz/src/time_zone_if.h",
        "absl/time/internal/cctz/src/time_zone_info.h",
        "absl/time/internal/cctz/src/time_zone_libc.h",
        "absl/time/internal/cctz/src/tzfile.h",
        "absl/random/mock_distributions.h",
        "absl/random/seed_gen_exception.h",
        "absl/random/beta_distribution.h",
        "absl/random/bernoulli_distribution.h",
        "absl/random/mocking_bit_gen.h",
        "absl/random/discrete_distribution.h",
        "absl/random/log_uniform_int_distribution.h",
        "absl/random/exponential_distribution.h",
        "absl/random/seed_sequences.h",
        "absl/random/zipf_distribution.h",
        "absl/random/random.h",
        "absl/random/uniform_real_distribution.h",
        "absl/random/bit_gen_ref.h",
        "absl/random/gaussian_distribution.h",
        "absl/random/distributions.h",
        "absl/random/uniform_int_distribution.h",
        "absl/random/poisson_distribution.h",
        "absl/random/internal/traits.h",
        "absl/random/internal/wide_multiply.h",
        "absl/random/internal/seed_material.h",
        "absl/random/internal/nanobenchmark.h",
        "absl/random/internal/explicit_seed_seq.h",
        "absl/random/internal/randen_hwaes.h",
        "absl/random/internal/chi_square.h",
        "absl/random/internal/salted_seed_seq.h",
        "absl/random/internal/fastmath.h",
        "absl/random/internal/randen_traits.h",
        "absl/random/internal/sequence_urbg.h",
        "absl/random/internal/mock_overload_set.h",
        "absl/random/internal/uniform_helper.h",
        "absl/random/internal/platform.h",
        "absl/random/internal/mock_helpers.h",
        "absl/random/internal/randen_engine.h",
        "absl/random/internal/iostream_state_saver.h",
        "absl/random/internal/pcg_engine.h",
        "absl/random/internal/distribution_caller.h",
        "absl/random/internal/generate_real.h",
        "absl/random/internal/nonsecure_base.h",
        "absl/random/internal/randen_slow.h",
        "absl/random/internal/fast_uniform_bits.h",
        "absl/random/internal/randen.h",
        "absl/random/internal/distribution_test_util.h",
        "absl/random/internal/randen_detect.h",
        "absl/random/internal/pool_urbg.h",
        "absl/hash/hash_testing.h",
        "absl/hash/hash.h",
        "absl/hash/internal/spy_hash_state.h",
        "absl/hash/internal/low_level_hash.h",
        "absl/hash/internal/hash_test.h",
        "absl/hash/internal/hash.h",
        "absl/hash/internal/city.h",
        "absl/types/span.h",
        "absl/types/variant.h",
        "absl/types/bad_optional_access.h",
        "absl/types/bad_variant_access.h",
        "absl/types/compare.h",
        "absl/types/optional.h",
        "absl/types/bad_any_cast.h",
        "absl/types/any.h",
        "absl/types/internal/span.h",
        "absl/types/internal/variant.h",
        "absl/types/internal/optional.h",
        "absl/memory/memory.h",
        "absl/functional/any_invocable.h",
        "absl/functional/overload.h",
        "absl/functional/function_ref.h",
        "absl/functional/bind_front.h",
        "absl/functional/internal/any_invocable.h",
        "absl/functional/internal/front_binder.h",
        "absl/functional/internal/function_ref.h",
        "absl/crc/crc32c.h",
        "absl/crc/internal/crc32_x86_arm_combined_simd.h",
        "absl/crc/internal/crc_memcpy.h",
        "absl/crc/internal/non_temporal_arm_intrinsics.h",
        "absl/crc/internal/non_temporal_memcpy.h",
        "absl/crc/internal/crc32c.h",
        "absl/crc/internal/cpu_detect.h",
        "absl/crc/internal/crc.h",
        "absl/crc/internal/crc32c_inline.h",
        "absl/crc/internal/crc_cord_state.h",
        "absl/crc/internal/crc_internal.h",
        "absl/meta/type_traits.h",
        "absl/status/statusor.h",
        "absl/status/status_payload_printer.h",
        "absl/status/status.h",
        "absl/status/internal/status_internal.h",
        "absl/status/internal/statusor_internal.h",
        "absl/utility/utility.h",
        "absl/utility/internal/if_constexpr.h",
        "absl/synchronization/blocking_counter.h",
        "absl/synchronization/mutex.h",
        "absl/synchronization/barrier.h",
        "absl/synchronization/notification.h",
        "absl/synchronization/internal/sem_waiter.h",
        "absl/synchronization/internal/thread_pool.h",
        "absl/synchronization/internal/futex_waiter.h",
        "absl/synchronization/internal/kernel_timeout.h",
        "absl/synchronization/internal/per_thread_sem.h",
        "absl/synchronization/internal/pthread_waiter.h",
        "absl/synchronization/internal/waiter_base.h",
        "absl/synchronization/internal/futex.h",
        "absl/synchronization/internal/stdcpp_waiter.h",
        "absl/synchronization/internal/win32_waiter.h",
        "absl/synchronization/internal/create_thread_identity.h",
        "absl/synchronization/internal/graphcycles.h",
        "absl/synchronization/internal/waiter.h",
        "absl/base/config.h",
        "absl/base/no_destructor.h",
        "absl/base/options.h",
        "absl/base/thread_annotations.h",
        "absl/base/attributes.h",
        "absl/base/nullability.h",
        "absl/base/port.h",
        "absl/base/policy_checks.h",
        "absl/base/const_init.h",
        "absl/base/prefetch.h",
        "absl/base/log_severity.h",
        "absl/base/dynamic_annotations.h",
        "absl/base/call_once.h",
        "absl/base/optimization.h",
        "absl/base/macros.h",
        "absl/base/casts.h",
        "absl/base/internal/endian.h",
        "absl/base/internal/inline_variable.h",
        "absl/base/internal/scheduling_mode.h",
        "absl/base/internal/throw_delegate.h",
        "absl/base/internal/sysinfo.h",
        "absl/base/internal/invoke.h",
        "absl/base/internal/atomic_hook.h",
        "absl/base/internal/errno_saver.h",
        "absl/base/internal/fast_type_id.h",
        "absl/base/internal/unaligned_access.h",
        "absl/base/internal/scoped_set_env.h",
        "absl/base/internal/spinlock_linux.inc",
        "absl/base/internal/strerror.h",
        "absl/base/internal/spinlock_win32.inc",
        "absl/base/internal/thread_identity.h",
        "absl/base/internal/unscaledcycleclock.h",
        "absl/base/internal/nullability_impl.h",
        "absl/base/internal/unscaledcycleclock_config.h",
        "absl/base/internal/identity.h",
        "absl/base/internal/spinlock_posix.inc",
        "absl/base/internal/inline_variable_testing.h",
        "absl/base/internal/spinlock_akaros.inc",
        "absl/base/internal/hide_ptr.h",
        "absl/base/internal/cycleclock.h",
        "absl/base/internal/low_level_scheduling.h",
        "absl/base/internal/exception_testing.h",
        "absl/base/internal/direct_mmap.h",
        "absl/base/internal/spinlock.h",
        "absl/base/internal/exception_safety_testing.h",
        "absl/base/internal/dynamic_annotations.h",
        "absl/base/internal/atomic_hook_test_helper.h",
        "absl/base/internal/tsan_mutex_interface.h",
        "absl/base/internal/per_thread_tls.h",
        "absl/base/internal/cycleclock_config.h",
        "absl/base/internal/low_level_alloc.h",
        "absl/base/internal/pretty_function.h",
        "absl/base/internal/spinlock_wait.h",
        "absl/base/internal/raw_logging.h",
        "absl/cleanup/cleanup.h",
        "absl/cleanup/internal/cleanup.h",
        "absl/numeric/int128_no_intrinsic.inc",
        "absl/numeric/bits.h",
        "absl/numeric/int128_have_intrinsic.inc",
        "absl/numeric/int128.h",
        "absl/numeric/internal/bits.h",
        "absl/numeric/internal/representation.h",
        "absl/container/flat_hash_set.h",
        "absl/container/inlined_vector.h",
        "absl/container/fixed_array.h",
        "absl/container/btree_set.h",
        "absl/container/node_hash_map.h",
        "absl/container/btree_test.h",
        "absl/container/flat_hash_map.h",
        "absl/container/btree_map.h",
        "absl/container/node_hash_set.h",
        "absl/container/internal/unordered_map_members_test.h",
        "absl/container/internal/unordered_set_modifiers_test.h",
        "absl/container/internal/unordered_map_lookup_test.h",
        "absl/container/internal/hashtablez_sampler.h",
        "absl/container/internal/unordered_map_modifiers_test.h",
        "absl/container/internal/unordered_map_constructor_test.h",
        "absl/container/internal/unordered_set_lookup_test.h",
        "absl/container/internal/inlined_vector.h",
        "absl/container/internal/layout.h",
        "absl/container/internal/btree.h",
        "absl/container/internal/raw_hash_map.h",
        "absl/container/internal/hash_function_defaults.h",
        "absl/container/internal/common.h",
        "absl/container/internal/tracked.h",
        "absl/container/internal/unordered_set_constructor_test.h",
        "absl/container/internal/common_policy_traits.h",
        "absl/container/internal/test_allocator.h",
        "absl/container/internal/node_slot_policy.h",
        "absl/container/internal/hashtable_debug.h",
        "absl/container/internal/btree_container.h",
        "absl/container/internal/compressed_tuple.h",
        "absl/container/internal/container_memory.h",
        "absl/container/internal/hash_generator_testing.h",
        "absl/container/internal/hash_policy_traits.h",
        "absl/container/internal/hash_policy_testing.h",
        "absl/container/internal/test_instance_tracker.h",
        "absl/container/internal/raw_hash_set.h",
        "absl/container/internal/hashtable_debug_hooks.h",
        "absl/container/internal/unordered_set_members_test.h",
        "absl/profiling/internal/exponential_biased.h",
        "absl/profiling/internal/sample_recorder.h",
        "absl/profiling/internal/periodic_sampler.h",
        "absl/strings/charconv.h",
        "absl/strings/cord_buffer.h",
        "absl/strings/substitute.h",
        "absl/strings/str_split.h",
        "absl/strings/numbers.h",
        "absl/strings/escaping.h",
        "absl/strings/strip.h",
        "absl/strings/charset.h",
        "absl/strings/cordz_test_helpers.h",
        "absl/strings/ascii.h",
        "absl/strings/str_replace.h",
        "absl/strings/cord.h",
        "absl/strings/cord_test_helpers.h",
        "absl/strings/has_absl_stringify.h",
        "absl/strings/cord_analysis.h",
        "absl/strings/str_join.h",
        "absl/strings/has_ostream_operator.h",
        "absl/strings/match.h",
        "absl/strings/str_cat.h",
        "absl/strings/string_view.h",
        "absl/strings/str_format.h",
        "absl/strings/internal/cordz_functions.h",
        "absl/strings/internal/numbers_test_common.h",
        "absl/strings/internal/str_split_internal.h",
        "absl/strings/internal/memutil.h",
        "absl/strings/internal/cordz_update_tracker.h",
        "absl/strings/internal/string_constant.h",
        "absl/strings/internal/escaping.h",
        "absl/strings/internal/cord_rep_consume.h",
        "absl/strings/internal/cord_rep_crc.h",
        "absl/strings/internal/str_join_internal.h",
        "absl/strings/internal/escaping_test_common.h",
        "absl/strings/internal/cord_rep_btree_navigator.h",
        "absl/strings/internal/stl_type_traits.h",
        "absl/strings/internal/cord_data_edge.h",
        "absl/strings/internal/cord_rep_test_util.h",
        "absl/strings/internal/cordz_handle.h",
        "absl/strings/internal/cord_rep_flat.h",
        "absl/strings/internal/ostringstream.h",
        "absl/strings/internal/cordz_info.h",
        "absl/strings/internal/has_absl_stringify.h",
        "absl/strings/internal/charconv_parse.h",
        "absl/strings/internal/utf8.h",
        "absl/strings/internal/cord_internal.h",
        "absl/strings/internal/cordz_update_scope.h",
        "absl/strings/internal/cordz_statistics.h",
        "absl/strings/internal/cord_rep_btree.h",
        "absl/strings/internal/stringify_sink.h",
        "absl/strings/internal/cord_rep_btree_reader.h",
        "absl/strings/internal/cordz_sample_token.h",
        "absl/strings/internal/charconv_bigint.h",
        "absl/strings/internal/damerau_levenshtein_distance.h",
        "absl/strings/internal/pow10_helper.h",
        "absl/strings/internal/resize_uninitialized.h",
        "absl/strings/internal/str_format/float_conversion.h",
        "absl/strings/internal/str_format/extension.h",
        "absl/strings/internal/str_format/output.h",
        "absl/strings/internal/str_format/constexpr_parser.h",
        "absl/strings/internal/str_format/parser.h",
        "absl/strings/internal/str_format/bind.h",
        "absl/strings/internal/str_format/checker.h",
        "absl/strings/internal/str_format/arg.h",
        "absl/algorithm/algorithm.h",
        "absl/algorithm/container.h",
        "absl/log/absl_check.h",
        "absl/log/log_sink.h",
        "absl/log/die_if_null.h",
        "absl/log/log_basic_test_impl.inc",
        "absl/log/structured.h",
        "absl/log/absl_vlog_is_on.h",
        "absl/log/log.h",
        "absl/log/scoped_mock_log.h",
        "absl/log/check.h",
        "absl/log/log_sink_registry.h",
        "absl/log/absl_log.h",
        "absl/log/initialize.h",
        "absl/log/globals.h",
        "absl/log/log_entry.h",
        "absl/log/flags.h",
        "absl/log/vlog_is_on.h",
        "absl/log/log_streamer.h",
        "absl/log/check_test_impl.inc",
        "absl/log/internal/config.h",
        "absl/log/internal/conditions.h",
        "absl/log/internal/structured.h",
        "absl/log/internal/strip.h",
        "absl/log/internal/log_format.h",
        "absl/log/internal/nullguard.h",
        "absl/log/internal/check_op.h",
        "absl/log/internal/test_matchers.h",
        "absl/log/internal/voidify.h",
        "absl/log/internal/globals.h",
        "absl/log/internal/vlog_config.h",
        "absl/log/internal/fnmatch.h",
        "absl/log/internal/log_sink_set.h",
        "absl/log/internal/log_message.h",
        "absl/log/internal/nullstream.h",
        "absl/log/internal/check_impl.h",
        "absl/log/internal/test_actions.h",
        "absl/log/internal/append_truncated.h",
        "absl/log/internal/test_helpers.h",
        "absl/log/internal/flags.h",
        "absl/log/internal/proto.h",
        "absl/log/internal/log_impl.h",
        "absl/debugging/symbolize.h",
        "absl/debugging/symbolize_unimplemented.inc",
        "absl/debugging/symbolize_elf.inc",
        "absl/debugging/leak_check.h",
        "absl/debugging/failure_signal_handler.h",
        "absl/debugging/symbolize_emscripten.inc",
        "absl/debugging/symbolize_win32.inc",
        "absl/debugging/symbolize_darwin.inc",
        "absl/debugging/stacktrace.h",
        "absl/debugging/internal/stacktrace_arm-inl.inc",
        "absl/debugging/internal/stacktrace_config.h",
        "absl/debugging/internal/stacktrace_aarch64-inl.inc",
        "absl/debugging/internal/stack_consumption.h",
        "absl/debugging/internal/symbolize.h",
        "absl/debugging/internal/stacktrace_emscripten-inl.inc",
        "absl/debugging/internal/stacktrace_unimplemented-inl.inc",
        "absl/debugging/internal/examine_stack.h",
        "absl/debugging/internal/stacktrace_x86-inl.inc",
        "absl/debugging/internal/stacktrace_powerpc-inl.inc",
        "absl/debugging/internal/stacktrace_riscv-inl.inc",
        "absl/debugging/internal/stacktrace_win32-inl.inc",
        "absl/debugging/internal/stacktrace_generic-inl.inc",
        "absl/debugging/internal/elf_mem_image.h",
        "absl/debugging/internal/demangle.h",
        "absl/debugging/internal/address_is_readable.h",
        "absl/debugging/internal/vdso_support.h"
      ],
      "requires": [],
      "properties": {
        "cmake_file_name": "absl",
        "cmake_build_modules": [
          "/root/.conan2/p/abseidc6452259fdc3/p/lib/cmake/conan_trick/cxx_std.cmake"
        ]
      },
      "package_type": "static-library",
      "build_requires": [],
      "components_properties": {
        "absl_any": {
          "pkg_config_name": "absl_any",
          "cmake_target_name": "absl::any"
        },
        "absl_log": {
          "pkg_config_name": "absl_log",
          "cmake_target_name": "absl::log"
        },
        "absl_base": {
          "pkg_config_name": "absl_base",
          "cmake_target_name": "absl::base"
        },
        "absl_bits": {
          "pkg_config_name": "absl_bits",
          "cmake_target_name": "absl::bits"
        },
        "absl_city": {
          "pkg_config_name": "absl_city",
          "cmake_target_name": "absl::city"
        },
        "absl_cord": {
          "pkg_config_name": "absl_cord",
          "cmake_target_name": "absl::cord"
        },
        "absl_hash": {
          "pkg_config_name": "absl_hash",
          "cmake_target_name": "absl::hash"
        },
        "absl_meta": {
          "pkg_config_name": "absl_meta",
          "cmake_target_name": "absl::meta"
        },
        "absl_span": {
          "pkg_config_name": "absl_span",
          "cmake_target_name": "absl::span"
        },
        "absl_time": {
          "pkg_config_name": "absl_time",
          "cmake_target_name": "absl::time"
        },
        "absl_btree": {
          "pkg_config_name": "absl_btree",
          "cmake_target_name": "absl::btree"
        },
        "absl_check": {
          "pkg_config_name": "absl_check",
          "cmake_target_name": "absl::check"
        },
        "absl_flags": {
          "pkg_config_name": "absl_flags",
          "cmake_target_name": "absl::flags"
        },
        "absl_config": {
          "pkg_config_name": "absl_config",
          "cmake_target_name": "absl::config"
        },
        "absl_crc32c": {
          "pkg_config_name": "absl_crc32c",
          "cmake_target_name": "absl::crc32c"
        },
        "absl_endian": {
          "pkg_config_name": "absl_endian",
          "cmake_target_name": "absl::endian"
        },
        "absl_int128": {
          "pkg_config_name": "absl_int128",
          "cmake_target_name": "absl::int128"
        },
        "absl_layout": {
          "pkg_config_name": "absl_layout",
          "cmake_target_name": "absl::layout"
        },
        "absl_memory": {
          "pkg_config_name": "absl_memory",
          "cmake_target_name": "absl::memory"
        },
        "absl_status": {
          "pkg_config_name": "absl_status",
          "cmake_target_name": "absl::status"
        },
        "absl_charset": {
          "pkg_config_name": "absl_charset",
          "cmake_target_name": "absl::charset"
        },
        "absl_cleanup": {
          "pkg_config_name": "absl_cleanup",
          "cmake_target_name": "absl::cleanup"
        },
        "absl_compare": {
          "pkg_config_name": "absl_compare",
          "cmake_target_name": "absl::compare"
        },
        "absl_numeric": {
          "pkg_config_name": "absl_numeric",
          "cmake_target_name": "absl::numeric"
        },
        "absl_strings": {
          "pkg_config_name": "absl_strings",
          "cmake_target_name": "absl::strings"
        },
        "absl_utility": {
          "pkg_config_name": "absl_utility",
          "cmake_target_name": "absl::utility"
        },
        "absl_variant": {
          "pkg_config_name": "absl_variant",
          "cmake_target_name": "absl::variant"
        },
        "absl_absl_log": {
          "pkg_config_name": "absl_absl_log",
          "cmake_target_name": "absl::absl_log"
        },
        "absl_log_sink": {
          "pkg_config_name": "absl_log_sink",
          "cmake_target_name": "absl::log_sink"
        },
        "absl_optional": {
          "pkg_config_name": "absl_optional",
          "cmake_target_name": "absl::optional"
        },
        "absl_overload": {
          "pkg_config_name": "absl_overload",
          "cmake_target_name": "absl::overload"
        },
        "absl_prefetch": {
          "pkg_config_name": "absl_prefetch",
          "cmake_target_name": "absl::prefetch"
        },
        "absl_statusor": {
          "pkg_config_name": "absl_statusor",
          "cmake_target_name": "absl::statusor"
        },
        "absl_strerror": {
          "pkg_config_name": "absl_strerror",
          "cmake_target_name": "absl::strerror"
        },
        "absl_algorithm": {
          "pkg_config_name": "absl_algorithm",
          "cmake_target_name": "absl::algorithm"
        },
        "absl_debugging": {
          "pkg_config_name": "absl_debugging",
          "cmake_target_name": "absl::debugging"
        },
        "absl_log_entry": {
          "pkg_config_name": "absl_log_entry",
          "cmake_target_name": "absl::log_entry"
        },
        "absl_log_flags": {
          "pkg_config_name": "absl_log_flags",
          "cmake_target_name": "absl::log_flags"
        },
        "absl_symbolize": {
          "pkg_config_name": "absl_symbolize",
          "cmake_target_name": "absl::symbolize"
        },
        "absl_time_zone": {
          "pkg_config_name": "absl_time_zone",
          "cmake_target_name": "absl::time_zone"
        },
        "absl_absl_check": {
          "pkg_config_name": "absl_absl_check",
          "cmake_target_name": "absl::absl_check"
        },
        "absl_bind_front": {
          "pkg_config_name": "absl_bind_front",
          "cmake_target_name": "absl::bind_front"
        },
        "absl_civil_time": {
          "pkg_config_name": "absl_civil_time",
          "cmake_target_name": "absl::civil_time"
        },
        "absl_cordz_info": {
          "pkg_config_name": "absl_cordz_info",
          "cmake_target_name": "absl::cordz_info"
        },
        "absl_leak_check": {
          "pkg_config_name": "absl_leak_check",
          "cmake_target_name": "absl::leak_check"
        },
        "absl_stacktrace": {
          "pkg_config_name": "absl_stacktrace",
          "cmake_target_name": "absl::stacktrace"
        },
        "absl_str_format": {
          "pkg_config_name": "absl_str_format",
          "cmake_target_name": "absl::str_format"
        },
        "absl_vlog_is_on": {
          "pkg_config_name": "absl_vlog_is_on",
          "cmake_target_name": "absl::vlog_is_on"
        },
        "absl_atomic_hook": {
          "pkg_config_name": "absl_atomic_hook",
          "cmake_target_name": "absl::atomic_hook"
        },
        "absl_die_if_null": {
          "pkg_config_name": "absl_die_if_null",
          "cmake_target_name": "absl::die_if_null"
        },
        "absl_errno_saver": {
          "pkg_config_name": "absl_errno_saver",
          "cmake_target_name": "absl::errno_saver"
        },
        "absl_fixed_array": {
          "pkg_config_name": "absl_fixed_array",
          "cmake_target_name": "absl::fixed_array"
        },
        "absl_flags_parse": {
          "pkg_config_name": "absl_flags_parse",
          "cmake_target_name": "absl::flags_parse"
        },
        "absl_flags_usage": {
          "pkg_config_name": "absl_flags_usage",
          "cmake_target_name": "absl::flags_usage"
        },
        "absl_log_globals": {
          "pkg_config_name": "absl_log_globals",
          "cmake_target_name": "absl::log_globals"
        },
        "absl_nullability": {
          "pkg_config_name": "absl_nullability",
          "cmake_target_name": "absl::nullability"
        },
        "absl_string_view": {
          "pkg_config_name": "absl_string_view",
          "cmake_target_name": "absl::string_view"
        },
        "absl_type_traits": {
          "pkg_config_name": "absl_type_traits",
          "cmake_target_name": "absl::type_traits"
        },
        "absl_bad_any_cast": {
          "pkg_config_name": "absl_bad_any_cast",
          "cmake_target_name": "absl::bad_any_cast"
        },
        "absl_cordz_handle": {
          "pkg_config_name": "absl_cordz_handle",
          "cmake_target_name": "absl::cordz_handle"
        },
        "absl_core_headers": {
          "pkg_config_name": "absl_core_headers",
          "cmake_target_name": "absl::core_headers"
        },
        "absl_crc_internal": {
          "pkg_config_name": "absl_crc_internal",
          "cmake_target_name": "absl::crc_internal"
        },
        "absl_fast_type_id": {
          "pkg_config_name": "absl_fast_type_id",
          "cmake_target_name": "absl::fast_type_id"
        },
        "absl_flags_config": {
          "pkg_config_name": "absl_flags_config",
          "cmake_target_name": "absl::flags_config"
        },
        "absl_function_ref": {
          "pkg_config_name": "absl_function_ref",
          "cmake_target_name": "absl::function_ref"
        },
        "absl_if_constexpr": {
          "pkg_config_name": "absl_if_constexpr",
          "cmake_target_name": "absl::if_constexpr"
        },
        "absl_log_severity": {
          "pkg_config_name": "absl_log_severity",
          "cmake_target_name": "absl::log_severity"
        },
        "absl_log_streamer": {
          "pkg_config_name": "absl_log_streamer",
          "cmake_target_name": "absl::log_streamer"
        },
        "absl_raw_hash_map": {
          "pkg_config_name": "absl_raw_hash_map",
          "cmake_target_name": "absl::raw_hash_map"
        },
        "absl_raw_hash_set": {
          "pkg_config_name": "absl_raw_hash_set",
          "cmake_target_name": "absl::raw_hash_set"
        },
        "absl_any_invocable": {
          "pkg_config_name": "absl_any_invocable",
          "cmake_target_name": "absl::any_invocable"
        },
        "absl_base_internal": {
          "pkg_config_name": "absl_base_internal",
          "cmake_target_name": "absl::base_internal"
        },
        "absl_cord_internal": {
          "pkg_config_name": "absl_cord_internal",
          "cmake_target_name": "absl::cord_internal"
        },
        "absl_examine_stack": {
          "pkg_config_name": "absl_examine_stack",
          "cmake_target_name": "absl::examine_stack"
        },
        "absl_flat_hash_map": {
          "pkg_config_name": "absl_flat_hash_map",
          "cmake_target_name": "absl::flat_hash_map"
        },
        "absl_flat_hash_set": {
          "pkg_config_name": "absl_flat_hash_set",
          "cmake_target_name": "absl::flat_hash_set"
        },
        "absl_no_destructor": {
          "pkg_config_name": "absl_no_destructor",
          "cmake_target_name": "absl::no_destructor"
        },
        "absl_node_hash_map": {
          "pkg_config_name": "absl_node_hash_map",
          "cmake_target_name": "absl::node_hash_map"
        },
        "absl_node_hash_set": {
          "pkg_config_name": "absl_node_hash_set",
          "cmake_target_name": "absl::node_hash_set"
        },
        "absl_random_random": {
          "pkg_config_name": "absl_random_random",
          "cmake_target_name": "absl::random_random"
        },
        "absl_spinlock_wait": {
          "pkg_config_name": "absl_spinlock_wait",
          "cmake_target_name": "absl::spinlock_wait"
        },
        "absl_crc_cord_state": {
          "pkg_config_name": "absl_crc_cord_state",
          "cmake_target_name": "absl::crc_cord_state"
        },
        "absl_crc_cpu_detect": {
          "pkg_config_name": "absl_crc_cpu_detect",
          "cmake_target_name": "absl::crc_cpu_detect"
        },
        "absl_flags_internal": {
          "pkg_config_name": "absl_flags_internal",
          "cmake_target_name": "absl::flags_internal"
        },
        "absl_inlined_vector": {
          "pkg_config_name": "absl_inlined_vector",
          "cmake_target_name": "absl::inlined_vector"
        },
        "absl_log_initialize": {
          "pkg_config_name": "absl_log_initialize",
          "cmake_target_name": "absl::log_initialize"
        },
        "absl_log_structured": {
          "pkg_config_name": "absl_log_structured",
          "cmake_target_name": "absl::log_structured"
        },
        "absl_low_level_hash": {
          "pkg_config_name": "absl_low_level_hash",
          "cmake_target_name": "absl::low_level_hash"
        },
        "absl_scoped_set_env": {
          "pkg_config_name": "absl_scoped_set_env",
          "cmake_target_name": "absl::scoped_set_env"
        },
        "absl_test_allocator": {
          "pkg_config_name": "absl_test_allocator",
          "cmake_target_name": "absl::test_allocator"
        },
        "absl_throw_delegate": {
          "pkg_config_name": "absl_throw_delegate",
          "cmake_target_name": "absl::throw_delegate"
        },
        "absl_absl_vlog_is_on": {
          "pkg_config_name": "absl_absl_vlog_is_on",
          "cmake_target_name": "absl::absl_vlog_is_on"
        },
        "absl_cordz_functions": {
          "pkg_config_name": "absl_cordz_functions",
          "cmake_target_name": "absl::cordz_functions"
        },
        "absl_flags_path_util": {
          "pkg_config_name": "absl_flags_path_util",
          "cmake_target_name": "absl::flags_path_util"
        },
        "absl_hashtable_debug": {
          "pkg_config_name": "absl_hashtable_debug",
          "cmake_target_name": "absl::hashtable_debug"
        },
        "absl_malloc_internal": {
          "pkg_config_name": "absl_malloc_internal",
          "cmake_target_name": "absl::malloc_internal"
        },
        "absl_pretty_function": {
          "pkg_config_name": "absl_pretty_function",
          "cmake_target_name": "absl::pretty_function"
        },
        "absl_sample_recorder": {
          "pkg_config_name": "absl_sample_recorder",
          "cmake_target_name": "absl::sample_recorder"
        },
        "absl_synchronization": {
          "pkg_config_name": "absl_synchronization",
          "cmake_target_name": "absl::synchronization"
        },
        "absl_cleanup_internal": {
          "pkg_config_name": "absl_cleanup_internal",
          "cmake_target_name": "absl::cleanup_internal"
        },
        "absl_compressed_tuple": {
          "pkg_config_name": "absl_compressed_tuple",
          "cmake_target_name": "absl::compressed_tuple"
        },
        "absl_container_common": {
          "pkg_config_name": "absl_container_common",
          "cmake_target_name": "absl::container_common"
        },
        "absl_container_memory": {
          "pkg_config_name": "absl_container_memory",
          "cmake_target_name": "absl::container_memory"
        },
        "absl_cordz_statistics": {
          "pkg_config_name": "absl_cordz_statistics",
          "cmake_target_name": "absl::cordz_statistics"
        },
        "absl_flags_reflection": {
          "pkg_config_name": "absl_flags_reflection",
          "cmake_target_name": "absl::flags_reflection"
        },
        "absl_node_slot_policy": {
          "pkg_config_name": "absl_node_slot_policy",
          "cmake_target_name": "absl::node_slot_policy"
        },
        "absl_periodic_sampler": {
          "pkg_config_name": "absl_periodic_sampler",
          "cmake_target_name": "absl::periodic_sampler"
        },
        "absl_strings_internal": {
          "pkg_config_name": "absl_strings_internal",
          "cmake_target_name": "absl::strings_internal"
        },
        "absl_bad_any_cast_impl": {
          "pkg_config_name": "absl_bad_any_cast_impl",
          "cmake_target_name": "absl::bad_any_cast_impl"
        },
        "absl_demangle_internal": {
          "pkg_config_name": "absl_demangle_internal",
          "cmake_target_name": "absl::demangle_internal"
        },
        "absl_flags_marshalling": {
          "pkg_config_name": "absl_flags_marshalling",
          "cmake_target_name": "absl::flags_marshalling"
        },
        "absl_log_sink_registry": {
          "pkg_config_name": "absl_log_sink_registry",
          "cmake_target_name": "absl::log_sink_registry"
        },
        "absl_bad_variant_access": {
          "pkg_config_name": "absl_bad_variant_access",
          "cmake_target_name": "absl::bad_variant_access"
        },
        "absl_cordz_sample_token": {
          "pkg_config_name": "absl_cordz_sample_token",
          "cmake_target_name": "absl::cordz_sample_token"
        },
        "absl_cordz_update_scope": {
          "pkg_config_name": "absl_cordz_update_scope",
          "cmake_target_name": "absl::cordz_update_scope"
        },
        "absl_debugging_internal": {
          "pkg_config_name": "absl_debugging_internal",
          "cmake_target_name": "absl::debugging_internal"
        },
        "absl_exponential_biased": {
          "pkg_config_name": "absl_exponential_biased",
          "cmake_target_name": "absl::exponential_biased"
        },
        "absl_flags_program_name": {
          "pkg_config_name": "absl_flags_program_name",
          "cmake_target_name": "absl::flags_program_name"
        },
        "absl_hash_policy_traits": {
          "pkg_config_name": "absl_hash_policy_traits",
          "cmake_target_name": "absl::hash_policy_traits"
        },
        "absl_hashtablez_sampler": {
          "pkg_config_name": "absl_hashtablez_sampler",
          "cmake_target_name": "absl::hashtablez_sampler"
        },
        "absl_log_internal_flags": {
          "pkg_config_name": "absl_log_internal_flags",
          "cmake_target_name": "absl::log_internal_flags"
        },
        "absl_log_internal_proto": {
          "pkg_config_name": "absl_log_internal_proto",
          "cmake_target_name": "absl::log_internal_proto"
        },
        "absl_log_internal_strip": {
          "pkg_config_name": "absl_log_internal_strip",
          "cmake_target_name": "absl::log_internal_strip"
        },
        "absl_random_bit_gen_ref": {
          "pkg_config_name": "absl_random_bit_gen_ref",
          "cmake_target_name": "absl::random_bit_gen_ref"
        },
        "absl_algorithm_container": {
          "pkg_config_name": "absl_algorithm_container",
          "cmake_target_name": "absl::algorithm_container"
        },
        "absl_bad_optional_access": {
          "pkg_config_name": "absl_bad_optional_access",
          "cmake_target_name": "absl::bad_optional_access"
        },
        "absl_dynamic_annotations": {
          "pkg_config_name": "absl_dynamic_annotations",
          "cmake_target_name": "absl::dynamic_annotations"
        },
        "absl_log_internal_config": {
          "pkg_config_name": "absl_log_internal_config",
          "cmake_target_name": "absl::log_internal_config"
        },
        "absl_log_internal_format": {
          "pkg_config_name": "absl_log_internal_format",
          "cmake_target_name": "absl::log_internal_format"
        },
        "absl_non_temporal_memcpy": {
          "pkg_config_name": "absl_non_temporal_memcpy",
          "cmake_target_name": "absl::non_temporal_memcpy"
        },
        "absl_str_format_internal": {
          "pkg_config_name": "absl_str_format_internal",
          "cmake_target_name": "absl::str_format_internal"
        },
        "absl_common_policy_traits": {
          "pkg_config_name": "absl_common_policy_traits",
          "cmake_target_name": "absl::common_policy_traits"
        },
        "absl_cordz_update_tracker": {
          "pkg_config_name": "absl_cordz_update_tracker",
          "cmake_target_name": "absl::cordz_update_tracker"
        },
        "absl_flags_usage_internal": {
          "pkg_config_name": "absl_flags_usage_internal",
          "cmake_target_name": "absl::flags_usage_internal"
        },
        "absl_graphcycles_internal": {
          "pkg_config_name": "absl_graphcycles_internal",
          "cmake_target_name": "absl::graphcycles_internal"
        },
        "absl_has_ostream_operator": {
          "pkg_config_name": "absl_has_ostream_operator",
          "cmake_target_name": "absl::has_ostream_operator"
        },
        "absl_log_internal_fnmatch": {
          "pkg_config_name": "absl_log_internal_fnmatch",
          "cmake_target_name": "absl::log_internal_fnmatch"
        },
        "absl_log_internal_globals": {
          "pkg_config_name": "absl_log_internal_globals",
          "cmake_target_name": "absl::log_internal_globals"
        },
        "absl_log_internal_message": {
          "pkg_config_name": "absl_log_internal_message",
          "cmake_target_name": "absl::log_internal_message"
        },
        "absl_log_internal_voidify": {
          "pkg_config_name": "absl_log_internal_voidify",
          "cmake_target_name": "absl::log_internal_voidify"
        },
        "absl_random_distributions": {
          "pkg_config_name": "absl_random_distributions",
          "cmake_target_name": "absl::random_distributions"
        },
        "absl_raw_logging_internal": {
          "pkg_config_name": "absl_raw_logging_internal",
          "cmake_target_name": "absl::raw_logging_internal"
        },
        "absl_vlog_config_internal": {
          "pkg_config_name": "absl_vlog_config_internal",
          "cmake_target_name": "absl::vlog_config_internal"
        },
        "absl_flags_commandlineflag": {
          "pkg_config_name": "absl_flags_commandlineflag",
          "cmake_target_name": "absl::flags_commandlineflag"
        },
        "absl_hashtable_debug_hooks": {
          "pkg_config_name": "absl_hashtable_debug_hooks",
          "cmake_target_name": "absl::hashtable_debug_hooks"
        },
        "absl_log_internal_check_op": {
          "pkg_config_name": "absl_log_internal_check_op",
          "cmake_target_name": "absl::log_internal_check_op"
        },
        "absl_log_internal_log_impl": {
          "pkg_config_name": "absl_log_internal_log_impl",
          "cmake_target_name": "absl::log_internal_log_impl"
        },
        "absl_random_seed_sequences": {
          "pkg_config_name": "absl_random_seed_sequences",
          "cmake_target_name": "absl::random_seed_sequences"
        },
        "absl_failure_signal_handler": {
          "pkg_config_name": "absl_failure_signal_handler",
          "cmake_target_name": "absl::failure_signal_handler"
        },
        "absl_hash_function_defaults": {
          "pkg_config_name": "absl_hash_function_defaults",
          "cmake_target_name": "absl::hash_function_defaults"
        },
        "absl_log_internal_nullguard": {
          "pkg_config_name": "absl_log_internal_nullguard",
          "cmake_target_name": "absl::log_internal_nullguard"
        },
        "absl_numeric_representation": {
          "pkg_config_name": "absl_numeric_representation",
          "cmake_target_name": "absl::numeric_representation"
        },
        "absl_random_internal_randen": {
          "pkg_config_name": "absl_random_internal_randen",
          "cmake_target_name": "absl::random_internal_randen"
        },
        "absl_random_internal_traits": {
          "pkg_config_name": "absl_random_internal_traits",
          "cmake_target_name": "absl::random_internal_traits"
        },
        "absl_inlined_vector_internal": {
          "pkg_config_name": "absl_inlined_vector_internal",
          "cmake_target_name": "absl::inlined_vector_internal"
        },
        "absl_kernel_timeout_internal": {
          "pkg_config_name": "absl_kernel_timeout_internal",
          "cmake_target_name": "absl::kernel_timeout_internal"
        },
        "absl_log_internal_check_impl": {
          "pkg_config_name": "absl_log_internal_check_impl",
          "cmake_target_name": "absl::log_internal_check_impl"
        },
        "absl_log_internal_conditions": {
          "pkg_config_name": "absl_log_internal_conditions",
          "cmake_target_name": "absl::log_internal_conditions"
        },
        "absl_log_internal_nullstream": {
          "pkg_config_name": "absl_log_internal_nullstream",
          "cmake_target_name": "absl::log_internal_nullstream"
        },
        "absl_log_internal_structured": {
          "pkg_config_name": "absl_log_internal_structured",
          "cmake_target_name": "absl::log_internal_structured"
        },
        "absl_random_internal_fastmath": {
          "pkg_config_name": "absl_random_internal_fastmath",
          "cmake_target_name": "absl::random_internal_fastmath"
        },
        "absl_random_internal_platform": {
          "pkg_config_name": "absl_random_internal_platform",
          "cmake_target_name": "absl::random_internal_platform"
        },
        "absl_log_internal_log_sink_set": {
          "pkg_config_name": "absl_log_internal_log_sink_set",
          "cmake_target_name": "absl::log_internal_log_sink_set"
        },
        "absl_random_internal_pool_urbg": {
          "pkg_config_name": "absl_random_internal_pool_urbg",
          "cmake_target_name": "absl::random_internal_pool_urbg"
        },
        "absl_random_seed_gen_exception": {
          "pkg_config_name": "absl_random_seed_gen_exception",
          "cmake_target_name": "absl::random_seed_gen_exception"
        },
        "absl_random_internal_pcg_engine": {
          "pkg_config_name": "absl_random_internal_pcg_engine",
          "cmake_target_name": "absl::random_internal_pcg_engine"
        },
        "absl_non_temporal_arm_intrinsics": {
          "pkg_config_name": "absl_non_temporal_arm_intrinsics",
          "cmake_target_name": "absl::non_temporal_arm_intrinsics"
        },
        "absl_random_internal_randen_slow": {
          "pkg_config_name": "absl_random_internal_randen_slow",
          "cmake_target_name": "absl::random_internal_randen_slow"
        },
        "absl_random_internal_mock_helpers": {
          "pkg_config_name": "absl_random_internal_mock_helpers",
          "cmake_target_name": "absl::random_internal_mock_helpers"
        },
        "absl_random_internal_randen_hwaes": {
          "pkg_config_name": "absl_random_internal_randen_hwaes",
          "cmake_target_name": "absl::random_internal_randen_hwaes"
        },
        "absl_flags_private_handle_accessor": {
          "pkg_config_name": "absl_flags_private_handle_accessor",
          "cmake_target_name": "absl::flags_private_handle_accessor"
        },
        "absl_log_internal_append_truncated": {
          "pkg_config_name": "absl_log_internal_append_truncated",
          "cmake_target_name": "absl::log_internal_append_truncated"
        },
        "absl_random_internal_generate_real": {
          "pkg_config_name": "absl_random_internal_generate_real",
          "cmake_target_name": "absl::random_internal_generate_real"
        },
        "absl_random_internal_randen_engine": {
          "pkg_config_name": "absl_random_internal_randen_engine",
          "cmake_target_name": "absl::random_internal_randen_engine"
        },
        "absl_random_internal_seed_material": {
          "pkg_config_name": "absl_random_internal_seed_material",
          "cmake_target_name": "absl::random_internal_seed_material"
        },
        "absl_random_internal_wide_multiply": {
          "pkg_config_name": "absl_random_internal_wide_multiply",
          "cmake_target_name": "absl::random_internal_wide_multiply"
        },
        "absl_flags_commandlineflag_internal": {
          "pkg_config_name": "absl_flags_commandlineflag_internal",
          "cmake_target_name": "absl::flags_commandlineflag_internal"
        },
        "absl_random_internal_nonsecure_base": {
          "pkg_config_name": "absl_random_internal_nonsecure_base",
          "cmake_target_name": "absl::random_internal_nonsecure_base"
        },
        "absl_random_internal_uniform_helper": {
          "pkg_config_name": "absl_random_internal_uniform_helper",
          "cmake_target_name": "absl::random_internal_uniform_helper"
        },
        "absl_random_internal_salted_seed_seq": {
          "pkg_config_name": "absl_random_internal_salted_seed_seq",
          "cmake_target_name": "absl::random_internal_salted_seed_seq"
        },
        "absl_random_internal_fast_uniform_bits": {
          "pkg_config_name": "absl_random_internal_fast_uniform_bits",
          "cmake_target_name": "absl::random_internal_fast_uniform_bits"
        },
        "absl_random_internal_randen_hwaes_impl": {
          "pkg_config_name": "absl_random_internal_randen_hwaes_impl",
          "cmake_target_name": "absl::random_internal_randen_hwaes_impl"
        },
        "absl_random_internal_distribution_caller": {
          "pkg_config_name": "absl_random_internal_distribution_caller",
          "cmake_target_name": "absl::random_internal_distribution_caller"
        },
        "absl_random_internal_iostream_state_saver": {
          "pkg_config_name": "absl_random_internal_iostream_state_saver",
          "cmake_target_name": "absl::random_internal_iostream_state_saver"
        },
        "absl_random_internal_distribution_test_util": {
          "pkg_config_name": "absl_random_internal_distribution_test_util",
          "cmake_target_name": "absl::random_internal_distribution_test_util"
        }
      }
    },
    "recipe_revision": "8f3ebba8b7ef2bf552efbd3a7bef2d9f"
  },
   "20240116.2": {
    "use_it": {
      "headers": [
        "absl/flags/config.h",
        "absl/flags/marshalling.h",
        "absl/flags/reflection.h",
        "absl/flags/parse.h",
        "absl/flags/usage.h",
        "absl/flags/flag.h",
        "absl/flags/commandlineflag.h",
        "absl/flags/declare.h",
        "absl/flags/usage_config.h",
        "absl/flags/internal/registry.h",
        "absl/flags/internal/parse.h",
        "absl/flags/internal/usage.h",
        "absl/flags/internal/sequence_lock.h",
        "absl/flags/internal/program_name.h",
        "absl/flags/internal/flag.h",
        "absl/flags/internal/private_handle_accessor.h",
        "absl/flags/internal/commandlineflag.h",
        "absl/flags/internal/path_util.h",
        "absl/time/time.h",
        "absl/time/clock.h",
        "absl/time/civil_time.h",
        "absl/time/internal/get_current_time_chrono.inc",
        "absl/time/internal/test_util.h",
        "absl/time/internal/get_current_time_posix.inc",
        "absl/time/internal/cctz/include/cctz/civil_time_detail.h",
        "absl/time/internal/cctz/include/cctz/civil_time.h",
        "absl/time/internal/cctz/include/cctz/time_zone.h",
        "absl/time/internal/cctz/include/cctz/zone_info_source.h",
        "absl/time/internal/cctz/src/time_zone_posix.h",
        "absl/time/internal/cctz/src/time_zone_impl.h",
        "absl/time/internal/cctz/src/time_zone_fixed.h",
        "absl/time/internal/cctz/src/time_zone_if.h",
        "absl/time/internal/cctz/src/time_zone_info.h",
        "absl/time/internal/cctz/src/time_zone_libc.h",
        "absl/time/internal/cctz/src/tzfile.h",
        "absl/random/mock_distributions.h",
        "absl/random/seed_gen_exception.h",
        "absl/random/beta_distribution.h",
        "absl/random/bernoulli_distribution.h",
        "absl/random/mocking_bit_gen.h",
        "absl/random/discrete_distribution.h",
        "absl/random/log_uniform_int_distribution.h",
        "absl/random/exponential_distribution.h",
        "absl/random/seed_sequences.h",
        "absl/random/zipf_distribution.h",
        "absl/random/random.h",
        "absl/random/uniform_real_distribution.h",
        "absl/random/bit_gen_ref.h",
        "absl/random/gaussian_distribution.h",
        "absl/random/distributions.h",
        "absl/random/uniform_int_distribution.h",
        "absl/random/poisson_distribution.h",
        "absl/random/internal/traits.h",
        "absl/random/internal/wide_multiply.h",
        "absl/random/internal/seed_material.h",
        "absl/random/internal/nanobenchmark.h",
        "absl/random/internal/explicit_seed_seq.h",
        "absl/random/internal/randen_hwaes.h",
        "absl/random/internal/chi_square.h",
        "absl/random/internal/salted_seed_seq.h",
        "absl/random/internal/fastmath.h",
        "absl/random/internal/randen_traits.h",
        "absl/random/internal/sequence_urbg.h",
        "absl/random/internal/mock_overload_set.h",
        "absl/random/internal/uniform_helper.h",
        "absl/random/internal/platform.h",
        "absl/random/internal/mock_helpers.h",
        "absl/random/internal/randen_engine.h",
        "absl/random/internal/iostream_state_saver.h",
        "absl/random/internal/pcg_engine.h",
        "absl/random/internal/distribution_caller.h",
        "absl/random/internal/generate_real.h",
        "absl/random/internal/nonsecure_base.h",
        "absl/random/internal/randen_slow.h",
        "absl/random/internal/fast_uniform_bits.h",
        "absl/random/internal/randen.h",
        "absl/random/internal/distribution_test_util.h",
        "absl/random/internal/randen_detect.h",
        "absl/random/internal/pool_urbg.h",
        "absl/hash/hash_testing.h",
        "absl/hash/hash.h",
        "absl/hash/internal/spy_hash_state.h",
        "absl/hash/internal/low_level_hash.h",
        "absl/hash/internal/hash_test.h",
        "absl/hash/internal/hash.h",
        "absl/hash/internal/city.h",
        "absl/types/span.h",
        "absl/types/variant.h",
        "absl/types/bad_optional_access.h",
        "absl/types/bad_variant_access.h",
        "absl/types/compare.h",
        "absl/types/optional.h",
        "absl/types/bad_any_cast.h",
        "absl/types/any.h",
        "absl/types/internal/span.h",
        "absl/types/internal/variant.h",
        "absl/types/internal/optional.h",
        "absl/memory/memory.h",
        "absl/functional/any_invocable.h",
        "absl/functional/overload.h",
        "absl/functional/function_ref.h",
        "absl/functional/bind_front.h",
        "absl/functional/internal/any_invocable.h",
        "absl/functional/internal/front_binder.h",
        "absl/functional/internal/function_ref.h",
        "absl/crc/crc32c.h",
        "absl/crc/internal/crc32_x86_arm_combined_simd.h",
        "absl/crc/internal/crc_memcpy.h",
        "absl/crc/internal/non_temporal_arm_intrinsics.h",
        "absl/crc/internal/non_temporal_memcpy.h",
        "absl/crc/internal/crc32c.h",
        "absl/crc/internal/cpu_detect.h",
        "absl/crc/internal/crc.h",
        "absl/crc/internal/crc32c_inline.h",
        "absl/crc/internal/crc_cord_state.h",
        "absl/crc/internal/crc_internal.h",
        "absl/meta/type_traits.h",
        "absl/status/statusor.h",
        "absl/status/status_payload_printer.h",
        "absl/status/status.h",
        "absl/status/internal/status_internal.h",
        "absl/status/internal/statusor_internal.h",
        "absl/utility/utility.h",
        "absl/utility/internal/if_constexpr.h",
        "absl/synchronization/blocking_counter.h",
        "absl/synchronization/mutex.h",
        "absl/synchronization/barrier.h",
        "absl/synchronization/notification.h",
        "absl/synchronization/internal/sem_waiter.h",
        "absl/synchronization/internal/thread_pool.h",
        "absl/synchronization/internal/futex_waiter.h",
        "absl/synchronization/internal/kernel_timeout.h",
        "absl/synchronization/internal/per_thread_sem.h",
        "absl/synchronization/internal/pthread_waiter.h",
        "absl/synchronization/internal/waiter_base.h",
        "absl/synchronization/internal/futex.h",
        "absl/synchronization/internal/stdcpp_waiter.h",
        "absl/synchronization/internal/win32_waiter.h",
        "absl/synchronization/internal/create_thread_identity.h",
        "absl/synchronization/internal/graphcycles.h",
        "absl/synchronization/internal/waiter.h",
        "absl/base/config.h",
        "absl/base/no_destructor.h",
        "absl/base/options.h",
        "absl/base/thread_annotations.h",
        "absl/base/attributes.h",
        "absl/base/nullability.h",
        "absl/base/port.h",
        "absl/base/policy_checks.h",
        "absl/base/const_init.h",
        "absl/base/prefetch.h",
        "absl/base/log_severity.h",
        "absl/base/dynamic_annotations.h",
        "absl/base/call_once.h",
        "absl/base/optimization.h",
        "absl/base/macros.h",
        "absl/base/casts.h",
        "absl/base/internal/endian.h",
        "absl/base/internal/inline_variable.h",
        "absl/base/internal/scheduling_mode.h",
        "absl/base/internal/throw_delegate.h",
        "absl/base/internal/sysinfo.h",
        "absl/base/internal/invoke.h",
        "absl/base/internal/atomic_hook.h",
        "absl/base/internal/errno_saver.h",
        "absl/base/internal/fast_type_id.h",
        "absl/base/internal/unaligned_access.h",
        "absl/base/internal/scoped_set_env.h",
        "absl/base/internal/spinlock_linux.inc",
        "absl/base/internal/strerror.h",
        "absl/base/internal/spinlock_win32.inc",
        "absl/base/internal/thread_identity.h",
        "absl/base/internal/unscaledcycleclock.h",
        "absl/base/internal/nullability_impl.h",
        "absl/base/internal/unscaledcycleclock_config.h",
        "absl/base/internal/identity.h",
        "absl/base/internal/spinlock_posix.inc",
        "absl/base/internal/inline_variable_testing.h",
        "absl/base/internal/spinlock_akaros.inc",
        "absl/base/internal/hide_ptr.h",
        "absl/base/internal/cycleclock.h",
        "absl/base/internal/low_level_scheduling.h",
        "absl/base/internal/exception_testing.h",
        "absl/base/internal/direct_mmap.h",
        "absl/base/internal/spinlock.h",
        "absl/base/internal/exception_safety_testing.h",
        "absl/base/internal/dynamic_annotations.h",
        "absl/base/internal/atomic_hook_test_helper.h",
        "absl/base/internal/tsan_mutex_interface.h",
        "absl/base/internal/per_thread_tls.h",
        "absl/base/internal/cycleclock_config.h",
        "absl/base/internal/low_level_alloc.h",
        "absl/base/internal/pretty_function.h",
        "absl/base/internal/spinlock_wait.h",
        "absl/base/internal/raw_logging.h",
        "absl/cleanup/cleanup.h",
        "absl/cleanup/internal/cleanup.h",
        "absl/numeric/int128_no_intrinsic.inc",
        "absl/numeric/bits.h",
        "absl/numeric/int128_have_intrinsic.inc",
        "absl/numeric/int128.h",
        "absl/numeric/internal/bits.h",
        "absl/numeric/internal/representation.h",
        "absl/container/flat_hash_set.h",
        "absl/container/inlined_vector.h",
        "absl/container/fixed_array.h",
        "absl/container/btree_set.h",
        "absl/container/node_hash_map.h",
        "absl/container/btree_test.h",
        "absl/container/flat_hash_map.h",
        "absl/container/btree_map.h",
        "absl/container/node_hash_set.h",
        "absl/container/internal/unordered_map_members_test.h",
        "absl/container/internal/unordered_set_modifiers_test.h",
        "absl/container/internal/unordered_map_lookup_test.h",
        "absl/container/internal/hashtablez_sampler.h",
        "absl/container/internal/unordered_map_modifiers_test.h",
        "absl/container/internal/unordered_map_constructor_test.h",
        "absl/container/internal/unordered_set_lookup_test.h",
        "absl/container/internal/inlined_vector.h",
        "absl/container/internal/layout.h",
        "absl/container/internal/btree.h",
        "absl/container/internal/raw_hash_map.h",
        "absl/container/internal/hash_function_defaults.h",
        "absl/container/internal/common.h",
        "absl/container/internal/tracked.h",
        "absl/container/internal/unordered_set_constructor_test.h",
        "absl/container/internal/common_policy_traits.h",
        "absl/container/internal/test_allocator.h",
        "absl/container/internal/node_slot_policy.h",
        "absl/container/internal/hashtable_debug.h",
        "absl/container/internal/btree_container.h",
        "absl/container/internal/compressed_tuple.h",
        "absl/container/internal/container_memory.h",
        "absl/container/internal/hash_generator_testing.h",
        "absl/container/internal/hash_policy_traits.h",
        "absl/container/internal/hash_policy_testing.h",
        "absl/container/internal/test_instance_tracker.h",
        "absl/container/internal/raw_hash_set.h",
        "absl/container/internal/hashtable_debug_hooks.h",
        "absl/container/internal/unordered_set_members_test.h",
        "absl/profiling/internal/exponential_biased.h",
        "absl/profiling/internal/sample_recorder.h",
        "absl/profiling/internal/periodic_sampler.h",
        "absl/strings/charconv.h",
        "absl/strings/cord_buffer.h",
        "absl/strings/substitute.h",
        "absl/strings/str_split.h",
        "absl/strings/numbers.h",
        "absl/strings/escaping.h",
        "absl/strings/strip.h",
        "absl/strings/charset.h",
        "absl/strings/cordz_test_helpers.h",
        "absl/strings/ascii.h",
        "absl/strings/str_replace.h",
        "absl/strings/cord.h",
        "absl/strings/cord_test_helpers.h",
        "absl/strings/has_absl_stringify.h",
        "absl/strings/cord_analysis.h",
        "absl/strings/str_join.h",
        "absl/strings/has_ostream_operator.h",
        "absl/strings/match.h",
        "absl/strings/str_cat.h",
        "absl/strings/string_view.h",
        "absl/strings/str_format.h",
        "absl/strings/internal/cordz_functions.h",
        "absl/strings/internal/numbers_test_common.h",
        "absl/strings/internal/str_split_internal.h",
        "absl/strings/internal/memutil.h",
        "absl/strings/internal/cordz_update_tracker.h",
        "absl/strings/internal/string_constant.h",
        "absl/strings/internal/escaping.h",
        "absl/strings/internal/cord_rep_consume.h",
        "absl/strings/internal/cord_rep_crc.h",
        "absl/strings/internal/str_join_internal.h",
        "absl/strings/internal/escaping_test_common.h",
        "absl/strings/internal/cord_rep_btree_navigator.h",
        "absl/strings/internal/stl_type_traits.h",
        "absl/strings/internal/cord_data_edge.h",
        "absl/strings/internal/cord_rep_test_util.h",
        "absl/strings/internal/cordz_handle.h",
        "absl/strings/internal/cord_rep_flat.h",
        "absl/strings/internal/ostringstream.h",
        "absl/strings/internal/cordz_info.h",
        "absl/strings/internal/has_absl_stringify.h",
        "absl/strings/internal/charconv_parse.h",
        "absl/strings/internal/utf8.h",
        "absl/strings/internal/cord_internal.h",
        "absl/strings/internal/cordz_update_scope.h",
        "absl/strings/internal/cordz_statistics.h",
        "absl/strings/internal/cord_rep_btree.h",
        "absl/strings/internal/stringify_sink.h",
        "absl/strings/internal/cord_rep_btree_reader.h",
        "absl/strings/internal/cordz_sample_token.h",
        "absl/strings/internal/charconv_bigint.h",
        "absl/strings/internal/damerau_levenshtein_distance.h",
        "absl/strings/internal/pow10_helper.h",
        "absl/strings/internal/resize_uninitialized.h",
        "absl/strings/internal/str_format/float_conversion.h",
        "absl/strings/internal/str_format/extension.h",
        "absl/strings/internal/str_format/output.h",
        "absl/strings/internal/str_format/constexpr_parser.h",
        "absl/strings/internal/str_format/parser.h",
        "absl/strings/internal/str_format/bind.h",
        "absl/strings/internal/str_format/checker.h",
        "absl/strings/internal/str_format/arg.h",
        "absl/algorithm/algorithm.h",
        "absl/algorithm/container.h",
        "absl/log/absl_check.h",
        "absl/log/log_sink.h",
        "absl/log/die_if_null.h",
        "absl/log/log_basic_test_impl.inc",
        "absl/log/structured.h",
        "absl/log/absl_vlog_is_on.h",
        "absl/log/log.h",
        "absl/log/scoped_mock_log.h",
        "absl/log/check.h",
        "absl/log/log_sink_registry.h",
        "absl/log/absl_log.h",
        "absl/log/initialize.h",
        "absl/log/globals.h",
        "absl/log/log_entry.h",
        "absl/log/flags.h",
        "absl/log/vlog_is_on.h",
        "absl/log/log_streamer.h",
        "absl/log/check_test_impl.inc",
        "absl/log/internal/config.h",
        "absl/log/internal/conditions.h",
        "absl/log/internal/structured.h",
        "absl/log/internal/strip.h",
        "absl/log/internal/log_format.h",
        "absl/log/internal/nullguard.h",
        "absl/log/internal/check_op.h",
        "absl/log/internal/test_matchers.h",
        "absl/log/internal/voidify.h",
        "absl/log/internal/globals.h",
        "absl/log/internal/vlog_config.h",
        "absl/log/internal/fnmatch.h",
        "absl/log/internal/log_sink_set.h",
        "absl/log/internal/log_message.h",
        "absl/log/internal/nullstream.h",
        "absl/log/internal/check_impl.h",
        "absl/log/internal/test_actions.h",
        "absl/log/internal/append_truncated.h",
        "absl/log/internal/test_helpers.h",
        "absl/log/internal/flags.h",
        "absl/log/internal/proto.h",
        "absl/log/internal/log_impl.h",
        "absl/debugging/symbolize.h",
        "absl/debugging/symbolize_unimplemented.inc",
        "absl/debugging/symbolize_elf.inc",
        "absl/debugging/leak_check.h",
        "absl/debugging/failure_signal_handler.h",
        "absl/debugging/symbolize_emscripten.inc",
        "absl/debugging/symbolize_win32.inc",
        "absl/debugging/symbolize_darwin.inc",
        "absl/debugging/stacktrace.h",
        "absl/debugging/internal/stacktrace_arm-inl.inc",
        "absl/debugging/internal/stacktrace_config.h",
        "absl/debugging/internal/stacktrace_aarch64-inl.inc",
        "absl/debugging/internal/stack_consumption.h",
        "absl/debugging/internal/symbolize.h",
        "absl/debugging/internal/stacktrace_emscripten-inl.inc",
        "absl/debugging/internal/stacktrace_unimplemented-inl.inc",
        "absl/debugging/internal/examine_stack.h",
        "absl/debugging/internal/stacktrace_x86-inl.inc",
        "absl/debugging/internal/stacktrace_powerpc-inl.inc",
        "absl/debugging/internal/stacktrace_riscv-inl.inc",
        "absl/debugging/internal/stacktrace_win32-inl.inc",
        "absl/debugging/internal/stacktrace_generic-inl.inc",
        "absl/debugging/internal/elf_mem_image.h",
        "absl/debugging/internal/demangle.h",
        "absl/debugging/internal/address_is_readable.h",
        "absl/debugging/internal/vdso_support.h"
      ],
      "requires": [],
      "properties": {
        "cmake_file_name": "absl",
        "cmake_build_modules": [
          "/root/.conan2/p/absei945f059fb5c7f/p/lib/cmake/conan_trick/cxx_std.cmake"
        ]
      },
      "package_type": "static-library",
      "build_requires": [],
      "components_properties": {
        "absl_any": {
          "pkg_config_name": "absl_any",
          "cmake_target_name": "absl::any"
        },
        "absl_log": {
          "pkg_config_name": "absl_log",
          "cmake_target_name": "absl::log"
        },
        "absl_base": {
          "pkg_config_name": "absl_base",
          "cmake_target_name": "absl::base"
        },
        "absl_bits": {
          "pkg_config_name": "absl_bits",
          "cmake_target_name": "absl::bits"
        },
        "absl_city": {
          "pkg_config_name": "absl_city",
          "cmake_target_name": "absl::city"
        },
        "absl_cord": {
          "pkg_config_name": "absl_cord",
          "cmake_target_name": "absl::cord"
        },
        "absl_hash": {
          "pkg_config_name": "absl_hash",
          "cmake_target_name": "absl::hash"
        },
        "absl_meta": {
          "pkg_config_name": "absl_meta",
          "cmake_target_name": "absl::meta"
        },
        "absl_span": {
          "pkg_config_name": "absl_span",
          "cmake_target_name": "absl::span"
        },
        "absl_time": {
          "pkg_config_name": "absl_time",
          "cmake_target_name": "absl::time"
        },
        "absl_btree": {
          "pkg_config_name": "absl_btree",
          "cmake_target_name": "absl::btree"
        },
        "absl_check": {
          "pkg_config_name": "absl_check",
          "cmake_target_name": "absl::check"
        },
        "absl_flags": {
          "pkg_config_name": "absl_flags",
          "cmake_target_name": "absl::flags"
        },
        "absl_config": {
          "pkg_config_name": "absl_config",
          "cmake_target_name": "absl::config"
        },
        "absl_crc32c": {
          "pkg_config_name": "absl_crc32c",
          "cmake_target_name": "absl::crc32c"
        },
        "absl_endian": {
          "pkg_config_name": "absl_endian",
          "cmake_target_name": "absl::endian"
        },
        "absl_int128": {
          "pkg_config_name": "absl_int128",
          "cmake_target_name": "absl::int128"
        },
        "absl_layout": {
          "pkg_config_name": "absl_layout",
          "cmake_target_name": "absl::layout"
        },
        "absl_memory": {
          "pkg_config_name": "absl_memory",
          "cmake_target_name": "absl::memory"
        },
        "absl_status": {
          "pkg_config_name": "absl_status",
          "cmake_target_name": "absl::status"
        },
        "absl_charset": {
          "pkg_config_name": "absl_charset",
          "cmake_target_name": "absl::charset"
        },
        "absl_cleanup": {
          "pkg_config_name": "absl_cleanup",
          "cmake_target_name": "absl::cleanup"
        },
        "absl_compare": {
          "pkg_config_name": "absl_compare",
          "cmake_target_name": "absl::compare"
        },
        "absl_numeric": {
          "pkg_config_name": "absl_numeric",
          "cmake_target_name": "absl::numeric"
        },
        "absl_strings": {
          "pkg_config_name": "absl_strings",
          "cmake_target_name": "absl::strings"
        },
        "absl_utility": {
          "pkg_config_name": "absl_utility",
          "cmake_target_name": "absl::utility"
        },
        "absl_variant": {
          "pkg_config_name": "absl_variant",
          "cmake_target_name": "absl::variant"
        },
        "absl_absl_log": {
          "pkg_config_name": "absl_absl_log",
          "cmake_target_name": "absl::absl_log"
        },
        "absl_log_sink": {
          "pkg_config_name": "absl_log_sink",
          "cmake_target_name": "absl::log_sink"
        },
        "absl_optional": {
          "pkg_config_name": "absl_optional",
          "cmake_target_name": "absl::optional"
        },
        "absl_overload": {
          "pkg_config_name": "absl_overload",
          "cmake_target_name": "absl::overload"
        },
        "absl_prefetch": {
          "pkg_config_name": "absl_prefetch",
          "cmake_target_name": "absl::prefetch"
        },
        "absl_statusor": {
          "pkg_config_name": "absl_statusor",
          "cmake_target_name": "absl::statusor"
        },
        "absl_strerror": {
          "pkg_config_name": "absl_strerror",
          "cmake_target_name": "absl::strerror"
        },
        "absl_algorithm": {
          "pkg_config_name": "absl_algorithm",
          "cmake_target_name": "absl::algorithm"
        },
        "absl_debugging": {
          "pkg_config_name": "absl_debugging",
          "cmake_target_name": "absl::debugging"
        },
        "absl_log_entry": {
          "pkg_config_name": "absl_log_entry",
          "cmake_target_name": "absl::log_entry"
        },
        "absl_log_flags": {
          "pkg_config_name": "absl_log_flags",
          "cmake_target_name": "absl::log_flags"
        },
        "absl_symbolize": {
          "pkg_config_name": "absl_symbolize",
          "cmake_target_name": "absl::symbolize"
        },
        "absl_time_zone": {
          "pkg_config_name": "absl_time_zone",
          "cmake_target_name": "absl::time_zone"
        },
        "absl_absl_check": {
          "pkg_config_name": "absl_absl_check",
          "cmake_target_name": "absl::absl_check"
        },
        "absl_bind_front": {
          "pkg_config_name": "absl_bind_front",
          "cmake_target_name": "absl::bind_front"
        },
        "absl_civil_time": {
          "pkg_config_name": "absl_civil_time",
          "cmake_target_name": "absl::civil_time"
        },
        "absl_cordz_info": {
          "pkg_config_name": "absl_cordz_info",
          "cmake_target_name": "absl::cordz_info"
        },
        "absl_leak_check": {
          "pkg_config_name": "absl_leak_check",
          "cmake_target_name": "absl::leak_check"
        },
        "absl_stacktrace": {
          "pkg_config_name": "absl_stacktrace",
          "cmake_target_name": "absl::stacktrace"
        },
        "absl_str_format": {
          "pkg_config_name": "absl_str_format",
          "cmake_target_name": "absl::str_format"
        },
        "absl_vlog_is_on": {
          "pkg_config_name": "absl_vlog_is_on",
          "cmake_target_name": "absl::vlog_is_on"
        },
        "absl_atomic_hook": {
          "pkg_config_name": "absl_atomic_hook",
          "cmake_target_name": "absl::atomic_hook"
        },
        "absl_die_if_null": {
          "pkg_config_name": "absl_die_if_null",
          "cmake_target_name": "absl::die_if_null"
        },
        "absl_errno_saver": {
          "pkg_config_name": "absl_errno_saver",
          "cmake_target_name": "absl::errno_saver"
        },
        "absl_fixed_array": {
          "pkg_config_name": "absl_fixed_array",
          "cmake_target_name": "absl::fixed_array"
        },
        "absl_flags_parse": {
          "pkg_config_name": "absl_flags_parse",
          "cmake_target_name": "absl::flags_parse"
        },
        "absl_flags_usage": {
          "pkg_config_name": "absl_flags_usage",
          "cmake_target_name": "absl::flags_usage"
        },
        "absl_log_globals": {
          "pkg_config_name": "absl_log_globals",
          "cmake_target_name": "absl::log_globals"
        },
        "absl_nullability": {
          "pkg_config_name": "absl_nullability",
          "cmake_target_name": "absl::nullability"
        },
        "absl_string_view": {
          "pkg_config_name": "absl_string_view",
          "cmake_target_name": "absl::string_view"
        },
        "absl_type_traits": {
          "pkg_config_name": "absl_type_traits",
          "cmake_target_name": "absl::type_traits"
        },
        "absl_bad_any_cast": {
          "pkg_config_name": "absl_bad_any_cast",
          "cmake_target_name": "absl::bad_any_cast"
        },
        "absl_cordz_handle": {
          "pkg_config_name": "absl_cordz_handle",
          "cmake_target_name": "absl::cordz_handle"
        },
        "absl_core_headers": {
          "pkg_config_name": "absl_core_headers",
          "cmake_target_name": "absl::core_headers"
        },
        "absl_crc_internal": {
          "pkg_config_name": "absl_crc_internal",
          "cmake_target_name": "absl::crc_internal"
        },
        "absl_fast_type_id": {
          "pkg_config_name": "absl_fast_type_id",
          "cmake_target_name": "absl::fast_type_id"
        },
        "absl_flags_config": {
          "pkg_config_name": "absl_flags_config",
          "cmake_target_name": "absl::flags_config"
        },
        "absl_function_ref": {
          "pkg_config_name": "absl_function_ref",
          "cmake_target_name": "absl::function_ref"
        },
        "absl_if_constexpr": {
          "pkg_config_name": "absl_if_constexpr",
          "cmake_target_name": "absl::if_constexpr"
        },
        "absl_log_severity": {
          "pkg_config_name": "absl_log_severity",
          "cmake_target_name": "absl::log_severity"
        },
        "absl_log_streamer": {
          "pkg_config_name": "absl_log_streamer",
          "cmake_target_name": "absl::log_streamer"
        },
        "absl_raw_hash_map": {
          "pkg_config_name": "absl_raw_hash_map",
          "cmake_target_name": "absl::raw_hash_map"
        },
        "absl_raw_hash_set": {
          "pkg_config_name": "absl_raw_hash_set",
          "cmake_target_name": "absl::raw_hash_set"
        },
        "absl_any_invocable": {
          "pkg_config_name": "absl_any_invocable",
          "cmake_target_name": "absl::any_invocable"
        },
        "absl_base_internal": {
          "pkg_config_name": "absl_base_internal",
          "cmake_target_name": "absl::base_internal"
        },
        "absl_cord_internal": {
          "pkg_config_name": "absl_cord_internal",
          "cmake_target_name": "absl::cord_internal"
        },
        "absl_examine_stack": {
          "pkg_config_name": "absl_examine_stack",
          "cmake_target_name": "absl::examine_stack"
        },
        "absl_flat_hash_map": {
          "pkg_config_name": "absl_flat_hash_map",
          "cmake_target_name": "absl::flat_hash_map"
        },
        "absl_flat_hash_set": {
          "pkg_config_name": "absl_flat_hash_set",
          "cmake_target_name": "absl::flat_hash_set"
        },
        "absl_no_destructor": {
          "pkg_config_name": "absl_no_destructor",
          "cmake_target_name": "absl::no_destructor"
        },
        "absl_node_hash_map": {
          "pkg_config_name": "absl_node_hash_map",
          "cmake_target_name": "absl::node_hash_map"
        },
        "absl_node_hash_set": {
          "pkg_config_name": "absl_node_hash_set",
          "cmake_target_name": "absl::node_hash_set"
        },
        "absl_random_random": {
          "pkg_config_name": "absl_random_random",
          "cmake_target_name": "absl::random_random"
        },
        "absl_spinlock_wait": {
          "pkg_config_name": "absl_spinlock_wait",
          "cmake_target_name": "absl::spinlock_wait"
        },
        "absl_crc_cord_state": {
          "pkg_config_name": "absl_crc_cord_state",
          "cmake_target_name": "absl::crc_cord_state"
        },
        "absl_crc_cpu_detect": {
          "pkg_config_name": "absl_crc_cpu_detect",
          "cmake_target_name": "absl::crc_cpu_detect"
        },
        "absl_flags_internal": {
          "pkg_config_name": "absl_flags_internal",
          "cmake_target_name": "absl::flags_internal"
        },
        "absl_inlined_vector": {
          "pkg_config_name": "absl_inlined_vector",
          "cmake_target_name": "absl::inlined_vector"
        },
        "absl_log_initialize": {
          "pkg_config_name": "absl_log_initialize",
          "cmake_target_name": "absl::log_initialize"
        },
        "absl_log_structured": {
          "pkg_config_name": "absl_log_structured",
          "cmake_target_name": "absl::log_structured"
        },
        "absl_low_level_hash": {
          "pkg_config_name": "absl_low_level_hash",
          "cmake_target_name": "absl::low_level_hash"
        },
        "absl_scoped_set_env": {
          "pkg_config_name": "absl_scoped_set_env",
          "cmake_target_name": "absl::scoped_set_env"
        },
        "absl_test_allocator": {
          "pkg_config_name": "absl_test_allocator",
          "cmake_target_name": "absl::test_allocator"
        },
        "absl_throw_delegate": {
          "pkg_config_name": "absl_throw_delegate",
          "cmake_target_name": "absl::throw_delegate"
        },
        "absl_absl_vlog_is_on": {
          "pkg_config_name": "absl_absl_vlog_is_on",
          "cmake_target_name": "absl::absl_vlog_is_on"
        },
        "absl_cordz_functions": {
          "pkg_config_name": "absl_cordz_functions",
          "cmake_target_name": "absl::cordz_functions"
        },
        "absl_flags_path_util": {
          "pkg_config_name": "absl_flags_path_util",
          "cmake_target_name": "absl::flags_path_util"
        },
        "absl_hashtable_debug": {
          "pkg_config_name": "absl_hashtable_debug",
          "cmake_target_name": "absl::hashtable_debug"
        },
        "absl_malloc_internal": {
          "pkg_config_name": "absl_malloc_internal",
          "cmake_target_name": "absl::malloc_internal"
        },
        "absl_pretty_function": {
          "pkg_config_name": "absl_pretty_function",
          "cmake_target_name": "absl::pretty_function"
        },
        "absl_sample_recorder": {
          "pkg_config_name": "absl_sample_recorder",
          "cmake_target_name": "absl::sample_recorder"
        },
        "absl_synchronization": {
          "pkg_config_name": "absl_synchronization",
          "cmake_target_name": "absl::synchronization"
        },
        "absl_cleanup_internal": {
          "pkg_config_name": "absl_cleanup_internal",
          "cmake_target_name": "absl::cleanup_internal"
        },
        "absl_compressed_tuple": {
          "pkg_config_name": "absl_compressed_tuple",
          "cmake_target_name": "absl::compressed_tuple"
        },
        "absl_container_common": {
          "pkg_config_name": "absl_container_common",
          "cmake_target_name": "absl::container_common"
        },
        "absl_container_memory": {
          "pkg_config_name": "absl_container_memory",
          "cmake_target_name": "absl::container_memory"
        },
        "absl_cordz_statistics": {
          "pkg_config_name": "absl_cordz_statistics",
          "cmake_target_name": "absl::cordz_statistics"
        },
        "absl_flags_reflection": {
          "pkg_config_name": "absl_flags_reflection",
          "cmake_target_name": "absl::flags_reflection"
        },
        "absl_node_slot_policy": {
          "pkg_config_name": "absl_node_slot_policy",
          "cmake_target_name": "absl::node_slot_policy"
        },
        "absl_periodic_sampler": {
          "pkg_config_name": "absl_periodic_sampler",
          "cmake_target_name": "absl::periodic_sampler"
        },
        "absl_strings_internal": {
          "pkg_config_name": "absl_strings_internal",
          "cmake_target_name": "absl::strings_internal"
        },
        "absl_bad_any_cast_impl": {
          "pkg_config_name": "absl_bad_any_cast_impl",
          "cmake_target_name": "absl::bad_any_cast_impl"
        },
        "absl_demangle_internal": {
          "pkg_config_name": "absl_demangle_internal",
          "cmake_target_name": "absl::demangle_internal"
        },
        "absl_flags_marshalling": {
          "pkg_config_name": "absl_flags_marshalling",
          "cmake_target_name": "absl::flags_marshalling"
        },
        "absl_log_sink_registry": {
          "pkg_config_name": "absl_log_sink_registry",
          "cmake_target_name": "absl::log_sink_registry"
        },
        "absl_bad_variant_access": {
          "pkg_config_name": "absl_bad_variant_access",
          "cmake_target_name": "absl::bad_variant_access"
        },
        "absl_cordz_sample_token": {
          "pkg_config_name": "absl_cordz_sample_token",
          "cmake_target_name": "absl::cordz_sample_token"
        },
        "absl_cordz_update_scope": {
          "pkg_config_name": "absl_cordz_update_scope",
          "cmake_target_name": "absl::cordz_update_scope"
        },
        "absl_debugging_internal": {
          "pkg_config_name": "absl_debugging_internal",
          "cmake_target_name": "absl::debugging_internal"
        },
        "absl_exponential_biased": {
          "pkg_config_name": "absl_exponential_biased",
          "cmake_target_name": "absl::exponential_biased"
        },
        "absl_flags_program_name": {
          "pkg_config_name": "absl_flags_program_name",
          "cmake_target_name": "absl::flags_program_name"
        },
        "absl_hash_policy_traits": {
          "pkg_config_name": "absl_hash_policy_traits",
          "cmake_target_name": "absl::hash_policy_traits"
        },
        "absl_hashtablez_sampler": {
          "pkg_config_name": "absl_hashtablez_sampler",
          "cmake_target_name": "absl::hashtablez_sampler"
        },
        "absl_log_internal_flags": {
          "pkg_config_name": "absl_log_internal_flags",
          "cmake_target_name": "absl::log_internal_flags"
        },
        "absl_log_internal_proto": {
          "pkg_config_name": "absl_log_internal_proto",
          "cmake_target_name": "absl::log_internal_proto"
        },
        "absl_log_internal_strip": {
          "pkg_config_name": "absl_log_internal_strip",
          "cmake_target_name": "absl::log_internal_strip"
        },
        "absl_random_bit_gen_ref": {
          "pkg_config_name": "absl_random_bit_gen_ref",
          "cmake_target_name": "absl::random_bit_gen_ref"
        },
        "absl_algorithm_container": {
          "pkg_config_name": "absl_algorithm_container",
          "cmake_target_name": "absl::algorithm_container"
        },
        "absl_bad_optional_access": {
          "pkg_config_name": "absl_bad_optional_access",
          "cmake_target_name": "absl::bad_optional_access"
        },
        "absl_dynamic_annotations": {
          "pkg_config_name": "absl_dynamic_annotations",
          "cmake_target_name": "absl::dynamic_annotations"
        },
        "absl_log_internal_config": {
          "pkg_config_name": "absl_log_internal_config",
          "cmake_target_name": "absl::log_internal_config"
        },
        "absl_log_internal_format": {
          "pkg_config_name": "absl_log_internal_format",
          "cmake_target_name": "absl::log_internal_format"
        },
        "absl_non_temporal_memcpy": {
          "pkg_config_name": "absl_non_temporal_memcpy",
          "cmake_target_name": "absl::non_temporal_memcpy"
        },
        "absl_str_format_internal": {
          "pkg_config_name": "absl_str_format_internal",
          "cmake_target_name": "absl::str_format_internal"
        },
        "absl_common_policy_traits": {
          "pkg_config_name": "absl_common_policy_traits",
          "cmake_target_name": "absl::common_policy_traits"
        },
        "absl_cordz_update_tracker": {
          "pkg_config_name": "absl_cordz_update_tracker",
          "cmake_target_name": "absl::cordz_update_tracker"
        },
        "absl_flags_usage_internal": {
          "pkg_config_name": "absl_flags_usage_internal",
          "cmake_target_name": "absl::flags_usage_internal"
        },
        "absl_graphcycles_internal": {
          "pkg_config_name": "absl_graphcycles_internal",
          "cmake_target_name": "absl::graphcycles_internal"
        },
        "absl_has_ostream_operator": {
          "pkg_config_name": "absl_has_ostream_operator",
          "cmake_target_name": "absl::has_ostream_operator"
        },
        "absl_log_internal_fnmatch": {
          "pkg_config_name": "absl_log_internal_fnmatch",
          "cmake_target_name": "absl::log_internal_fnmatch"
        },
        "absl_log_internal_globals": {
          "pkg_config_name": "absl_log_internal_globals",
          "cmake_target_name": "absl::log_internal_globals"
        },
        "absl_log_internal_message": {
          "pkg_config_name": "absl_log_internal_message",
          "cmake_target_name": "absl::log_internal_message"
        },
        "absl_log_internal_voidify": {
          "pkg_config_name": "absl_log_internal_voidify",
          "cmake_target_name": "absl::log_internal_voidify"
        },
        "absl_random_distributions": {
          "pkg_config_name": "absl_random_distributions",
          "cmake_target_name": "absl::random_distributions"
        },
        "absl_raw_logging_internal": {
          "pkg_config_name": "absl_raw_logging_internal",
          "cmake_target_name": "absl::raw_logging_internal"
        },
        "absl_vlog_config_internal": {
          "pkg_config_name": "absl_vlog_config_internal",
          "cmake_target_name": "absl::vlog_config_internal"
        },
        "absl_flags_commandlineflag": {
          "pkg_config_name": "absl_flags_commandlineflag",
          "cmake_target_name": "absl::flags_commandlineflag"
        },
        "absl_hashtable_debug_hooks": {
          "pkg_config_name": "absl_hashtable_debug_hooks",
          "cmake_target_name": "absl::hashtable_debug_hooks"
        },
        "absl_log_internal_check_op": {
          "pkg_config_name": "absl_log_internal_check_op",
          "cmake_target_name": "absl::log_internal_check_op"
        },
        "absl_log_internal_log_impl": {
          "pkg_config_name": "absl_log_internal_log_impl",
          "cmake_target_name": "absl::log_internal_log_impl"
        },
        "absl_random_seed_sequences": {
          "pkg_config_name": "absl_random_seed_sequences",
          "cmake_target_name": "absl::random_seed_sequences"
        },
        "absl_failure_signal_handler": {
          "pkg_config_name": "absl_failure_signal_handler",
          "cmake_target_name": "absl::failure_signal_handler"
        },
        "absl_hash_function_defaults": {
          "pkg_config_name": "absl_hash_function_defaults",
          "cmake_target_name": "absl::hash_function_defaults"
        },
        "absl_log_internal_nullguard": {
          "pkg_config_name": "absl_log_internal_nullguard",
          "cmake_target_name": "absl::log_internal_nullguard"
        },
        "absl_numeric_representation": {
          "pkg_config_name": "absl_numeric_representation",
          "cmake_target_name": "absl::numeric_representation"
        },
        "absl_random_internal_randen": {
          "pkg_config_name": "absl_random_internal_randen",
          "cmake_target_name": "absl::random_internal_randen"
        },
        "absl_random_internal_traits": {
          "pkg_config_name": "absl_random_internal_traits",
          "cmake_target_name": "absl::random_internal_traits"
        },
        "absl_inlined_vector_internal": {
          "pkg_config_name": "absl_inlined_vector_internal",
          "cmake_target_name": "absl::inlined_vector_internal"
        },
        "absl_kernel_timeout_internal": {
          "pkg_config_name": "absl_kernel_timeout_internal",
          "cmake_target_name": "absl::kernel_timeout_internal"
        },
        "absl_log_internal_check_impl": {
          "pkg_config_name": "absl_log_internal_check_impl",
          "cmake_target_name": "absl::log_internal_check_impl"
        },
        "absl_log_internal_conditions": {
          "pkg_config_name": "absl_log_internal_conditions",
          "cmake_target_name": "absl::log_internal_conditions"
        },
        "absl_log_internal_nullstream": {
          "pkg_config_name": "absl_log_internal_nullstream",
          "cmake_target_name": "absl::log_internal_nullstream"
        },
        "absl_log_internal_structured": {
          "pkg_config_name": "absl_log_internal_structured",
          "cmake_target_name": "absl::log_internal_structured"
        },
        "absl_random_internal_fastmath": {
          "pkg_config_name": "absl_random_internal_fastmath",
          "cmake_target_name": "absl::random_internal_fastmath"
        },
        "absl_random_internal_platform": {
          "pkg_config_name": "absl_random_internal_platform",
          "cmake_target_name": "absl::random_internal_platform"
        },
        "absl_log_internal_log_sink_set": {
          "pkg_config_name": "absl_log_internal_log_sink_set",
          "cmake_target_name": "absl::log_internal_log_sink_set"
        },
        "absl_random_internal_pool_urbg": {
          "pkg_config_name": "absl_random_internal_pool_urbg",
          "cmake_target_name": "absl::random_internal_pool_urbg"
        },
        "absl_random_seed_gen_exception": {
          "pkg_config_name": "absl_random_seed_gen_exception",
          "cmake_target_name": "absl::random_seed_gen_exception"
        },
        "absl_random_internal_pcg_engine": {
          "pkg_config_name": "absl_random_internal_pcg_engine",
          "cmake_target_name": "absl::random_internal_pcg_engine"
        },
        "absl_non_temporal_arm_intrinsics": {
          "pkg_config_name": "absl_non_temporal_arm_intrinsics",
          "cmake_target_name": "absl::non_temporal_arm_intrinsics"
        },
        "absl_random_internal_randen_slow": {
          "pkg_config_name": "absl_random_internal_randen_slow",
          "cmake_target_name": "absl::random_internal_randen_slow"
        },
        "absl_random_internal_mock_helpers": {
          "pkg_config_name": "absl_random_internal_mock_helpers",
          "cmake_target_name": "absl::random_internal_mock_helpers"
        },
        "absl_random_internal_randen_hwaes": {
          "pkg_config_name": "absl_random_internal_randen_hwaes",
          "cmake_target_name": "absl::random_internal_randen_hwaes"
        },
        "absl_flags_private_handle_accessor": {
          "pkg_config_name": "absl_flags_private_handle_accessor",
          "cmake_target_name": "absl::flags_private_handle_accessor"
        },
        "absl_log_internal_append_truncated": {
          "pkg_config_name": "absl_log_internal_append_truncated",
          "cmake_target_name": "absl::log_internal_append_truncated"
        },
        "absl_random_internal_generate_real": {
          "pkg_config_name": "absl_random_internal_generate_real",
          "cmake_target_name": "absl::random_internal_generate_real"
        },
        "absl_random_internal_randen_engine": {
          "pkg_config_name": "absl_random_internal_randen_engine",
          "cmake_target_name": "absl::random_internal_randen_engine"
        },
        "absl_random_internal_seed_material": {
          "pkg_config_name": "absl_random_internal_seed_material",
          "cmake_target_name": "absl::random_internal_seed_material"
        },
        "absl_random_internal_wide_multiply": {
          "pkg_config_name": "absl_random_internal_wide_multiply",
          "cmake_target_name": "absl::random_internal_wide_multiply"
        },
        "absl_flags_commandlineflag_internal": {
          "pkg_config_name": "absl_flags_commandlineflag_internal",
          "cmake_target_name": "absl::flags_commandlineflag_internal"
        },
        "absl_random_internal_nonsecure_base": {
          "pkg_config_name": "absl_random_internal_nonsecure_base",
          "cmake_target_name": "absl::random_internal_nonsecure_base"
        },
        "absl_random_internal_uniform_helper": {
          "pkg_config_name": "absl_random_internal_uniform_helper",
          "cmake_target_name": "absl::random_internal_uniform_helper"
        },
        "absl_random_internal_salted_seed_seq": {
          "pkg_config_name": "absl_random_internal_salted_seed_seq",
          "cmake_target_name": "absl::random_internal_salted_seed_seq"
        },
        "absl_random_internal_fast_uniform_bits": {
          "pkg_config_name": "absl_random_internal_fast_uniform_bits",
          "cmake_target_name": "absl::random_internal_fast_uniform_bits"
        },
        "absl_random_internal_randen_hwaes_impl": {
          "pkg_config_name": "absl_random_internal_randen_hwaes_impl",
          "cmake_target_name": "absl::random_internal_randen_hwaes_impl"
        },
        "absl_random_internal_distribution_caller": {
          "pkg_config_name": "absl_random_internal_distribution_caller",
          "cmake_target_name": "absl::random_internal_distribution_caller"
        },
        "absl_random_internal_iostream_state_saver": {
          "pkg_config_name": "absl_random_internal_iostream_state_saver",
          "cmake_target_name": "absl::random_internal_iostream_state_saver"
        },
        "absl_random_internal_distribution_test_util": {
          "pkg_config_name": "absl_random_internal_distribution_test_util",
          "cmake_target_name": "absl::random_internal_distribution_test_util"
        }
      }
    },
    "recipe_revision": "932ead913d27bb5087303c2880a7b06d"
  },
}


@app.get('/reference/num')
async def get_reference_num(query='', filters='', licenses=''):
    return {"references":7879, "recipes":1748}


@app.get("/status")
async def get_root():
    return {"status": "ok"}
