from db import SessionLocal, engine
from sqlalchemy import func
from db.models import (
    Base,
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
    M2MTopicsConanreferences,
    M2MLicensesConanreferences,
)


def init_db():
    Base.metadata.create_all(bind=engine)


def clean_db():
    for tbl in reversed(Base.metadata.sorted_tables):
        try:
            engine.execute(tbl.delete())
        except:
            pass

def get_conan_reference_by_name(session, name):
    reference = session.query(
            ConanReference
        ).filter(
            ConanReference.name==name
        ).first()

    return reference

def get_conan_references_filtered(session, reference_name_pattern, licenses, topics):
    result = session.query(ConanReference)

    if reference_name_pattern:
        result = result.filter(
                ConanReference.name.like('%{}%'.format(reference_name_pattern))
            )

    if licenses or topics:
        licenses = session.query(
                License.license_id
            ).filter(
                License.name.in_(licenses)
            ).subquery()

        topics = session.query(
                Topic.topic_id
            ).filter(
                Topic.name.in_(topics)
            ).subquery()

        result = result.join(
                M2MLicensesConanreferences,
                M2MTopicsConanreferences
            ).filter(
                M2MLicensesConanreferences.license_id.in_(licenses) | M2MTopicsConanreferences.topic_id.in_(topics)
            )

    references = result.all()
    return references


def get_all_conan_references(session):
    references = session.query(ConanReference).all()
    return references


def get_last_created_conan_references(session, limit=10):
    references = session.query(
            ConanReference
        ).order_by(
            ConanReference.reference_id.desc()
        ).limit(limit).all()

    return references


def get_last_updated_conan_references(session, limit=10):
    subquery = [r.reference_id for r in session.query(
            RecipeRevision.reference_id, func.max(RecipeRevision.timestamp)
        ).group_by(
            RecipeRevision.reference_id
        ).order_by(
            func.max(RecipeRevision.timestamp).desc()
        ).limit(limit).all()]

    references = session.query(
            ConanReference
        ).filter(
            ConanReference.reference_id.in_(subquery)
        ).limit(limit).all()

    return references


def get_popular_conan_references(session, limit=10):

    subquery = session.query(
            DownloadCount.reference_id
        ).order_by(
            DownloadCount.count.desc()
        ).limit(limit).subquery()

    references = session.query(
            ConanReference
        ).filter(
            ConanReference.reference_id.in_(subquery)
        ).all()

    return references


def get_recipe_revision_count(session, reference_name_pattern, licenses, topics):

    result = session.query(ConanReference.reference_id)

    if reference_name_pattern:
        result = result.filter(
                ConanReference.name.like('%{}%'.format(reference_name_pattern))
            )

    if licenses:
        licenses = session.query(
                License.license_id
            ).filter(
                License.name.in_(licenses)
            ).subquery()

        result = result.join(
                M2MLicensesConanreferences
            ).filter(
                M2MLicensesConanreferences.license_id.in_(licenses)
            )

    if topics:
        topics = session.query(
                Topic.topic_id
            ).filter(
                Topic.name.in_(topics)
            ).subquery()

        result = result.join(
                M2MTopicsConanreferences
            ).filter(
                M2MTopicsConanreferences.topic_id.in_(topics)
            )

    subquery = result.subquery()


    result = session.query(
            RecipeRevision
        ).filter(
            RecipeRevision.reference_id.in_(subquery)
        ).count()
    return result


def get_licenses(session, ids=None, names=None):
    result = session.query(License.name)
    if ids:
        result = result.filter(License.license_id.in_(ids))
    if names:
        result = result.filter(License.name.in_(names))

    licenses = result.all()
    return [l.name for l in licenses]


def get_topics(session, ids=None, names=None):
    result = session.query(Topic.name)
    if ids:
        result = result.filter(Topic.topic_id.in_(ids))
    if names:
        result = result.filter(Topic.name.in_(names))
    topics = result.all()
    return [t.name for t in topics]


# if __name__ == '__main__':
#     # docker run --name conan-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=test -p 5432:5432 -d postgres
#     Base.metadata.create_all(bind=engine)
