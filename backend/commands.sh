python manage.py makemigrations --dry-run --verbosity 3
python manage.py makemigrations
python manage.py migrate

python manage.py runserver
python manage.py createsuperuser

pip install coverage
coverage run --omit='*/venv/*' manage.py test
coverage html

pip install djangorestframework