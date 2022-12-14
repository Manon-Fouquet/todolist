# Todo list

A simple Todo-list web app. Frontend is in React, Backend uses Django (Python) with a persistence database

## Installation

Using npm in root folder

```shell
npm install
```

## Running the backend server

The following commands (also in *setup_django.bat*) setup django virtual environement and the todo-list database.

```shell
cd .\src\server\todo_server
virtualenv env
.\env\Scripts\activate
pip install -r requirements.txt
python ./manage.py migrate --run-syncdb
```

Django server will start on port 8000 by running the gollowing command from .\src\server\todo_server

```shell
cd .\src\server\todo_server
.\env\Scripts\activate
python manage.py runserver
```
## Running the app

Open a new terminal. Webpack dev server will start on port 8081 by running:

```shell
npm run dev
```

Open a browser at *http://localhost:8081/*

## Usage

* Input some task in the form and click on the add button.
* Check completed tasks.
* Filter tasks depenfding upon their completion status

## License
[ISC](https://opensource.org/licenses/ISC/)