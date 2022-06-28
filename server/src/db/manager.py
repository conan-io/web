from db import SessionLocal, engine
from sqlalchemy import func, and_
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
    return session.query(ConanReference).filter(ConanReference.name==name).first()


def _get_query_conan_references_filtered(session, reference_name_pattern, licenses, topics):
    result = session.query(ConanReference)

    if reference_name_pattern:
        result = result.filter(
                ConanReference.name.like('%{}%'.format(reference_name_pattern))
            )
    # TODO: Use IDs instead of NAMEs and split licenses and topics
    # if licenses:
    #     result = result.join(M2MLicensesConanreferences).filter(M2MLicensesConanreferences.license_id.in_(licenses))
    #
    # if topics:
    #     result = result.join(M2MTopicsConanreferences).filter(M2MTopicsConanreferences.topic_id.in_(topics))

    if licenses or topics:
        licenses = session.query(License.license_id).filter(License.name.in_(licenses)).subquery()
        topics = session.query(Topic.topic_id).filter(Topic.name.in_(topics)).subquery()

        result = result.join(
                M2MLicensesConanreferences,
                M2MTopicsConanreferences
            ).filter(
                M2MLicensesConanreferences.license_id.in_(licenses) | M2MTopicsConanreferences.topic_id.in_(topics)
            )
    return result


def get_conan_references_filtered(session, reference_name_pattern, licenses, topics):
    return _get_query_conan_references_filtered(session, reference_name_pattern, licenses, topics).all()


def get_recipe_revision_count(session, reference_name_pattern, licenses, topics):
    return _get_query_conan_references_filtered(session, reference_name_pattern, licenses, topics).count()


def get_all_conan_references(session):
    return session.query(ConanReference).all()


def get_last_created_conan_references(session, limit=10):
    return session.query(ConanReference).order_by(ConanReference.reference_id.desc()).limit(limit).all()


def get_last_updated_conan_references(session, limit=10):
    subq = session.query(
            RecipeRevision.reference_id,
            func.max(RecipeRevision.timestamp).label('maxdate')
        ).group_by(RecipeRevision.reference_id).subquery()

    references = session.query(
            ConanReference
        ).join(
            RecipeRevision
        ).join(
            subq,
            and_(
                RecipeRevision.reference_id == subq.c.reference_id,
                RecipeRevision.timestamp == subq.c.maxdate
            )
        ).order_by(
            RecipeRevision.timestamp.desc()
        ).filter(
            ConanReference.reference_id == RecipeRevision.reference_id
        ).limit(limit).all()

    return references


def get_popular_conan_references(session, limit=10):
    subq = session.query(
            DownloadCount.reference_id,
            func.max(DownloadCount.date).label('maxdate')
        ).group_by(DownloadCount.reference_id).subquery()

    references = session.query(
            ConanReference
        ).join(
            DownloadCount
        ).join(
            subq,
            and_(
                DownloadCount.reference_id == subq.c.reference_id,
                DownloadCount.date == subq.c.maxdate
            )
        ).order_by(
            DownloadCount.count.desc()
        ).filter(
            ConanReference.reference_id == DownloadCount.reference_id
        ).limit(limit).all()

    return references


def get_licenses(session, ids=None, names=None):
    result = session.query(License)
    if ids:
        result = result.filter(License.license_id.in_(ids))
    if names:
        result = result.filter(License.name.in_(names))

    licenses = result.all()
    # TODO: return [{'id': 'name'}]
    # return [{l.license_id: l.name} for l in licenses]
    return [l.name for l in licenses]


def get_topics(session, ids=None, names=None):
    result = session.query(Topic)
    if ids:
        result = result.filter(Topic.topic_id.in_(ids))
    if names:
        result = result.filter(Topic.name.in_(names))
    topics = result.all()
    # TODO: return [{'id': 'name'}]
    # return [{t.topic_id: t.name} for t in topics]
    return [t.name for t in topics]


# if __name__ == '__main__':
#     # docker run --name conan-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=test -p 5432:5432 -d postgres
#     Base.metadata.create_all(bind=engine)
