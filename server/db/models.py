import traceback
import datetime
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    TIMESTAMP,
    Date,
    Table,
)
from sqlalchemy.orm import relationship
from sqlalchemy import UniqueConstraint
from sqlalchemy.ext.hybrid import hybrid_property
from db import Base


class M2MLicensesConanreferences(Base):
    __tablename__ = "m2m_licenses_conanreferences"

    reference_id = Column(Integer, ForeignKey("conanreferences.reference_id"), nullable=False, primary_key=True)
    recipe_revision_id = Column(Integer, ForeignKey("reciperevisions.recipe_revision_id"), nullable=False, primary_key=True)
    license_id = Column(Integer, ForeignKey("licenses.license_id"), nullable=False, primary_key=True)

    __table_args__ = (UniqueConstraint(reference_id, recipe_revision_id, license_id),)

    conanreference = relationship("ConanReference", back_populates="licenses")
    licenses = relationship("License")
    reciperevision = relationship("RecipeRevision", back_populates="licenses")


class M2MTopicsConanreferences(Base):
    __tablename__ = "m2m_topics_conanreferences"

    reference_id = Column(Integer, ForeignKey("conanreferences.reference_id"), nullable=False, primary_key=True)
    recipe_revision_id = Column(Integer, ForeignKey("reciperevisions.recipe_revision_id"), nullable=False, primary_key=True)
    topic_id = Column(Integer, ForeignKey("topics.topic_id"), nullable=False, primary_key=True)

    __table_args__ = (UniqueConstraint(reference_id, recipe_revision_id, topic_id),)

    conanreference = relationship("ConanReference", back_populates="topics")
    topics = relationship("Topic")
    reciperevision = relationship("RecipeRevision", back_populates="topics")


m2m_examples_conanreferences = Table(
    "m2m_examples_conanreferences",
    Base.metadata,
    Column("reference_id", ForeignKey("conanreferences.reference_id"), primary_key=True),
    Column("example_id", ForeignKey("exampledata.example_id"), primary_key=True),
)


m2m_pullrequests_reciperevisions = Table(
    "m2m_pullrequests_reciperevisions",
    Base.metadata,
    Column("recipe_revision_id", ForeignKey("reciperevisions.recipe_revision_id"), primary_key=True),
    Column("pr_number", ForeignKey("pullrequests.number"), primary_key=True),
)


class ConanReference(Base):
    __tablename__ = "conanreferences"

    reference_id = Column(Integer, primary_key=True, index=True, unique=True)
    name = Column(String)
    version = Column(String)
    username = Column(String)
    channel = Column(String)
    reciperevisions = relationship("RecipeRevision", order_by="desc(RecipeRevision.timestamp)", back_populates="conanreference")
    downloadcounts = relationship("DownloadCount", order_by="desc(DownloadCount.date)", back_populates="conanreference")
    examples = relationship("ExampleData", secondary=m2m_examples_conanreferences)
    licenses = relationship("M2MLicensesConanreferences", back_populates="conanreference")
    topics = relationship("M2MTopicsConanreferences", back_populates="conanreference")



class RecipeRevision(Base):
    __tablename__ = "reciperevisions"

    recipe_revision_id = Column(Integer, primary_key=True, index=True, unique=True)
    reference_id = Column(Integer, ForeignKey("conanreferences.reference_id"), primary_key=True)
    version = Column(String)
    timestamp = Column(TIMESTAMP(timezone=False))
    epoch = Column(Integer)
    commit = Column(String)
    description = Column(String)
    website_link = Column(String)
    documentation_link = Column(String)

    conanreference = relationship("ConanReference", back_populates="reciperevisions")
    markdownfiles = relationship("MarkDownFiles", back_populates="reciperevision")
    packagecount = relationship("PackageCount", back_populates="reciperevision")
    licenses = relationship("M2MLicensesConanreferences", back_populates="reciperevision")
    topics = relationship("M2MTopicsConanreferences", back_populates="reciperevision")
    pullrequests = relationship("PullRequest", secondary=m2m_pullrequests_reciperevisions)


class MarkDownFiles(Base):
    __tablename__ = "markdownfiles"

    id = Column(Integer, primary_key=True)
    conan_version = Column(String)
    reference_id = Column(Integer, ForeignKey("conanreferences.reference_id"), primary_key=True)
    recipe_revision_id = Column(Integer, ForeignKey("reciperevisions.recipe_revision_id"), primary_key=True)
    storage_path = Column(String, unique=True)
    timestamp = Column(TIMESTAMP(timezone=False))
    reciperevision = relationship("RecipeRevision", back_populates="markdownfiles")


class PackageCount(Base):
    __tablename__ = "packagecount"

    recipe_revision_id = Column(Integer, ForeignKey("reciperevisions.recipe_revision_id"), primary_key=True)
    unique_package_id_count = Column(Integer)
    total_package_count = Column(Integer)
    total_bytes = Column(Integer)
    reciperevision = relationship("RecipeRevision", back_populates="packagecount")


class License(Base):
    __tablename__ = "licenses"

    license_id = Column(Integer, primary_key=True, index=True, unique=True)
    name = Column(String)
    spdx_id = Column(String)


class DownloadCount(Base):
    __tablename__ = "downloadcount"

    id = Column(Integer, primary_key=True)
    reference_id = Column(Integer, ForeignKey("conanreferences.reference_id"), primary_key=True)
    date = Column(Date)
    count = Column(Integer)

    conanreference = relationship("ConanReference", back_populates="downloadcounts")


class ExampleData(Base):
    __tablename__ = "exampledata"

    example_id = Column(Integer, primary_key=True, index=True, unique=True)
    author = Column(String)
    title = Column(String)
    added = Column(TIMESTAMP(timezone=False))
    modified = Column(TIMESTAMP(timezone=False))
    markdown_storage_path = Column(String)
    conanreferences = relationship("ConanReference", secondary=m2m_examples_conanreferences, back_populates="examples")


class Topic(Base):
    __tablename__ = "topics"

    topic_id = Column(Integer, primary_key=True, index=True, unique=True)
    name = Column(String)


class PullRequest(Base):
    __tablename__ = "pullrequests"

    number = Column(Integer, primary_key=True, index=True, unique=True)
    author = Column(String)
    status = Column(String)
    created_at = Column(TIMESTAMP(timezone=False))
    closed_at = Column(TIMESTAMP(timezone=False))
    comments = relationship("PullRequestComment", back_populates="pullrequest")


class PullRequestComment(Base):
    __tablename__ = "pullrequestscomments"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    pull_request_id = Column(Integer, ForeignKey("pullrequests.number"))
    author = Column(String)
    timestamp = Column(TIMESTAMP(timezone=False))
    review_type = Column(String)
    pullrequest = relationship("PullRequest", back_populates="comments")
