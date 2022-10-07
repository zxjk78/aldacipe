FROM python:3.8

WORKDIR /usr/src/aldacipe

COPY . .

RUN apt-get update

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["python3", "-u", "manage.py", "runserver", "0:8000", "--noreload"]
