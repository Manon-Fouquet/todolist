cd .\src\server\todo_server
virtualenv env
.\env\Scripts\activate
pip install -r requirements.txt
python ./manage.py migrate --run-syncdb