FROM python:3.11-slim

WORKDIR /service

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
