from test import client

def test_status():
    response = client.get("/status")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_licenses():
    response = client.get("/licenses")
    assert response.status_code == 200
    assert response.json() == {
        '1': 'license_1',
        '2': 'license_2',
        '3': 'license_3',
        '4': 'license_4',
        '5': 'license_5',
        '6': 'license_6',
    }


def test_filters():
    response = client.get("/filters")
    assert response.status_code == 200
    assert response.json() == {
        '1': 'topic_1',
        '2': 'topic_2',
        '3': 'topic_3',
        '4': 'topic_4',
        '5': 'topic_5',
        '6': 'topic_6',
    }


def test_popular():
    response = client.get("/popular")
    assert response.status_code == 200
    assert response.json() == {
        '0': {'name': 'boost', 'version': 'v1.79.0'},
        '1': {'name': 'zlib', 'version': 'v1.21.2'},
        '2': {'name': 'openssl', 'version': 'v3.0.3'},
        '3': {'name': 'opengl', 'version': 'system'}
    }


def test_updated():
    response = client.get("/updated")
    assert response.status_code == 200
    assert response.json() == {
        '0': {'name': 'opengl', 'version': 'system'},
        '1': {'name': 'boost', 'version': 'v1.79.0'},
        '2': {'name': 'zlib', 'version': 'v1.21.2'},
        '3': {'name': 'openssl', 'version': 'v3.0.3'}
    }


def test_new():
    response = client.get("/new")
    assert response.status_code == 200
    assert response.json() == {
        '0': {'name': 'opengl', 'version': 'system'},
        '1': {'name': 'boost', 'version': 'v1.79.0'},
        '2': {'name': 'zlib', 'version': 'v1.21.2'},
        '3': {'name': 'openssl', 'version': 'v3.0.3'}
    }


def test_search():
    response = client.get("/search/op?filters=6&licenses=1")
    assert response.status_code == 200
    assert response.json() ==  {
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


def test_name():
    response = client.get("/package/opengl")
    assert response.status_code == 200
    assert response.json() ==  {
        'info': {
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing '
                            'elit. Etiam nibh est, suscipit vel convallis eget, '
                            'euismod a leo. Vivamus sagittis mi non dui iaculis '
                            'tincidunt. Aliquam metus risus, maximus sed '
                            'tristique sed, vehicula at neque. Nam nunc metus, '
                            'vestibulum id iaculis in, sodales et arcu. Nulla '
                            'lorem enim, hendrerit sit.',
            'downloads': 14,
            'labels': ['topic_1', 'topic_5', 'topic_6'],
            'licenses': ['license_1', 'license_5', 'license_6'],
            'version': 'system'
        },
        'name': 'opengl',
    }


def test_downloads():
    response = client.get("/package/opengl/downloads")
    assert response.status_code == 200
    assert response.json() ==  {
        'downloads': [
            {'date': '2022-06-26', 'downloads': 7},
            {'date': '2022-06-27', 'downloads': 46},
            {'date': '2022-06-28', 'downloads': 35},
            {'date': '2022-06-29', 'downloads': 14}
        ],
    }


def test_reference_nun():
    response = client.get("/reference/num?query=op&filters=6&licenses=1")
    assert response.status_code == 200
    assert response.json() ==  {'references': 1}
