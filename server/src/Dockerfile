FROM python:3.8-slim-buster

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

ADD  src /python-docker

CMD [ "uvicorn", "app:app", "--reload", "--port", "5000"]
