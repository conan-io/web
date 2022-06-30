import pytest
from db import Base
from db.models import (
    M2MLicensesConanreferences,
    M2MTopicsConanreferences,
    ConanReference,
    RecipeRevision,
    MarkDownFiles,
    PackageCount,
    License,
    DownloadCount,
    ExampleData,
    Topic,
    PullRequest,
    PullRequestComment,
)
from datetime import datetime, date, timedelta
from test import TestingSessionLocal, test_engine


def create_intance(db, intance, fields):
    conan_intance = intance(**fields)
    db.add(conan_intance)
    db.commit()
    db.refresh(conan_intance)
    return conan_intance


@pytest.fixture(scope="session", autouse=True)
def create_test_data():

    Base.metadata.create_all(bind=test_engine)

    db = TestingSessionLocal()

    license_1 = create_intance(db, License, {'license_id': 1, 'spdx_id': '', 'name': 'license_1'})
    license_2 = create_intance(db, License, {'license_id': 2, 'spdx_id': '', 'name': 'license_2'})
    license_3 = create_intance(db, License, {'license_id': 3, 'spdx_id': '', 'name': 'license_3'})
    license_4 = create_intance(db, License, {'license_id': 4, 'spdx_id': '', 'name': 'license_4'})
    license_5 = create_intance(db, License, {'license_id': 5, 'spdx_id': '', 'name': 'license_5'})
    license_6 = create_intance(db, License, {'license_id': 6, 'spdx_id': '', 'name': 'license_6'})

    licenses = [license_1, license_2, license_3, license_4, license_5, license_6]

    topic_1 = create_intance(db, Topic, {'topic_id': 1, 'name': 'topic_1'})
    topic_2 = create_intance(db, Topic, {'topic_id': 2, 'name': 'topic_2'})
    topic_3 = create_intance(db, Topic, {'topic_id': 3, 'name': 'topic_3'})
    topic_4 = create_intance(db, Topic, {'topic_id': 4, 'name': 'topic_4'})
    topic_5 = create_intance(db, Topic, {'topic_id': 5, 'name': 'topic_5'})
    topic_6 = create_intance(db, Topic, {'topic_id': 6, 'name': 'topic_6'})

    topics = [topic_1, topic_2, topic_3, topic_4, topic_5, topic_6]

    conan_reference_1 = create_intance(db, ConanReference, {'reference_id': 1, 'name': 'openssl', 'version': 'v3.0.3', 'username': 'user', 'channel': 'testing'})
    conan_reference_2 = create_intance(db, ConanReference, {'reference_id': 2, 'name': 'zlib', 'version': 'v1.21.2', 'username': 'user', 'channel': 'testing'})
    conan_reference_3 = create_intance(db, ConanReference, {'reference_id': 3, 'name': 'boost', 'version': 'v1.79.0', 'username': 'user', 'channel': 'testing'})
    conan_reference_4 = create_intance(db, ConanReference, {'reference_id': 4, 'name': 'opengl', 'version': 'system', 'username': 'user', 'channel': 'testing'})


    create_intance(db, DownloadCount,{'id': 1, 'reference_id': 1, 'date': date(2022, 6, 29), 'count': 146})
    create_intance(db, DownloadCount,{'id': 2, 'reference_id': 1, 'date': date(2022, 6, 29) - timedelta(days=1), 'count': 345})
    create_intance(db, DownloadCount,{'id': 3, 'reference_id': 1, 'date': date(2022, 6, 29) - timedelta(days=2), 'count': 456})
    create_intance(db, DownloadCount,{'id': 4, 'reference_id': 1, 'date': date(2022, 6, 29) - timedelta(days=3), 'count': 567})


    create_intance(db, DownloadCount,{'id': 5, 'reference_id': 2, 'date': date(2022, 6, 29), 'count': 1064})
    create_intance(db, DownloadCount,{'id': 6, 'reference_id': 2, 'date': date(2022, 6, 29) - timedelta(days=1), 'count': 3453})
    create_intance(db, DownloadCount,{'id': 7, 'reference_id': 2, 'date': date(2022, 6, 29) - timedelta(days=2), 'count': 4342})
    create_intance(db, DownloadCount,{'id': 8, 'reference_id': 2, 'date': date(2022, 6, 29) - timedelta(days=3), 'count': 1567})

    create_intance(db, DownloadCount,{'id': 9, 'reference_id': 3, 'date': date(2022, 6, 29), 'count': 100854})
    create_intance(db, DownloadCount,{'id': 10, 'reference_id': 3, 'date': date(2022, 6, 29) - timedelta(days=1), 'count': 142345})
    create_intance(db, DownloadCount,{'id': 11, 'reference_id': 3, 'date': date(2022, 6, 29) - timedelta(days=2), 'count': 345456})
    create_intance(db, DownloadCount,{'id': 12, 'reference_id': 3, 'date': date(2022, 6, 29) - timedelta(days=3), 'count': 109567})

    create_intance(db, DownloadCount,{'id': 13, 'reference_id': 4, 'date': date(2022, 6, 29), 'count': 14})
    create_intance(db, DownloadCount,{'id': 14, 'reference_id': 4, 'date': date(2022, 6, 29) - timedelta(days=1), 'count': 35})
    create_intance(db, DownloadCount,{'id': 15, 'reference_id': 4, 'date': date(2022, 6, 29) - timedelta(days=2), 'count': 46})
    create_intance(db, DownloadCount,{'id': 16, 'reference_id': 4, 'date': date(2022, 6, 29) - timedelta(days=3), 'count': 7})

    recipe_revision_id = 0
    for i, reference in enumerate(db.query(ConanReference).all()):
        recipe_revision_id = recipe_revision_id + 1
        commit = '7d978b558c7926c1f434a55f64dab5c421d8c6e5{}'.format(i)
        create_intance(db, RecipeRevision,
            {
                'recipe_revision_id': recipe_revision_id,
                'reference_id': reference.reference_id,
                'version': reference.version,
                'timestamp': datetime.now(),
                'epoch': 1,
                'commit': commit,
                'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.',
                'website_link': 'http://127.0.0.0:5000/info',
                'documentation_link': 'http://127.0.0.0:5000/docs',
            }
        )

        for license in ([license_1, licenses[i+1], licenses[i+2]]):
            create_intance(db, M2MLicensesConanreferences,
                {
                    'reference_id': reference.reference_id,
                    'recipe_revision_id': recipe_revision_id,
                    'license_id': license.license_id,
                }
            )
        for topic in ([topic_1, topics[i+1], topics[i+2]]):
            create_intance(db, M2MTopicsConanreferences,
                {
                    'reference_id': reference.reference_id,
                    'recipe_revision_id': recipe_revision_id,
                    'topic_id': topic.topic_id,
                }
            )

        recipe_revision_id = recipe_revision_id + 1
        create_intance(db, RecipeRevision,
            {
                'recipe_revision_id': recipe_revision_id,
                'reference_id': reference.reference_id,
                'version': reference.version,
                'timestamp': datetime.now(),
                'epoch': 1,
                'commit': commit,
                'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nibh est, suscipit vel convallis eget, euismod a leo. Vivamus sagittis mi non dui iaculis tincidunt. Aliquam metus risus, maximus sed tristique sed, vehicula at neque. Nam nunc metus, vestibulum id iaculis in, sodales et arcu. Nulla lorem enim, hendrerit sit.',
                'website_link': 'http://127.0.0.0:5000/info',
                'documentation_link': 'http://127.0.0.0:5000/docs',
            }
        )

        for license in ([license_1, licenses[i+1], licenses[i+2]]):
            create_intance(db, M2MLicensesConanreferences,
                {
                    'reference_id': reference.reference_id,
                    'recipe_revision_id': recipe_revision_id,
                    'license_id': license.license_id,
                }
            )

        for topic in ([topic_1, topics[i+1], topics[i+2]]):
            create_intance(db, M2MTopicsConanreferences,
                {
                    'reference_id': reference.reference_id,
                    'recipe_revision_id': recipe_revision_id,
                    'topic_id': topic.topic_id,
                }
            )

        create_intance(db, MarkDownFiles, {'id': i, 'conan_version': '2.0.0', 'reference_id': reference.reference_id, 'recipe_revision_id': recipe_revision_id, 'storage_path': 'http://127.0.0.0:5000/md/{}'.format(commit), 'timestamp': datetime.now(),})
        create_intance(db, PackageCount,  { 'recipe_revision_id': recipe_revision_id, 'unique_package_id_count': 7, 'total_package_count': 5, 'total_bytes': 3214,})

    db.close()
    yield
    Base.metadata.drop_all(bind=test_engine)
