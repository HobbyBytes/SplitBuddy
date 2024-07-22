python manage.py makemigrations --dry-run --verbosity 3
python manage.py makemigrations
python manage.py migrate

python manage.py runserver
python manage.py createsuperuser

pip install coverage
coverage run --omit='*/venv/*' manage.py test
coverage html

pip install djangorestframework


curl -X POST -d "client_id=q84XKm9lg47cA3krHQLucOPEboZf4BS2sdqyzdmQ&client_secret=pbkdf2_sha256$720000$NTfgjsHJzjSCdB58Sclhud$Rasx0USvu7wwPVgU+7RWwyODhZwLwB/8pY3s4DzVQQY=&grant_type=password&username=mounishp@gmail.com&password=E8_31@hSi9g" http://localhost:8000/auth/token

FbFA2V1g18ufQxkflrF27J24KNRA0pYs0mSlI7ZE

wE2GiEcfPdV2SogigJEyPwqsNzSzG0pF5l8Yxprv8WF4X6egBonBuCIEMquEcUoUuZciiIAGb6w7zQlxHtOX9vQnFFmcHDU0YyzkDjoxzktZAINgoK9uMDQqhXr9Xngi


curl -X POST -d "client_id=FbFA2V1g18ufQxkflrF27J24KNRA0pYs0mSlI7ZE&client_secret=wE2GiEcfPdV2SogigJEyPwqsNzSzG0pF5l8Yxprv8WF4X6egBonBuCIEMquEcUoUuZciiIAGb6w7zQlxHtOX9vQnFFmcHDU0YyzkDjoxzktZAINgoK9uMDQqhXr9Xngi&grant_type=password&username=mounishp@gmail.com&password=E8_31@hSi9g" http://localhost:8000/auth/token