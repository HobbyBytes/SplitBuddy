# Split Buddy

This repository contains the backend and frontend source code for Split Buddy application. It is an attempt to build something as an alternative to Splitwise.

Follow the instructions below to set up and run the application.

## Setup

1. Clone the repository

2. Create a virtual environment:

   ```sh
   mkvirtualenv splitbuddy
   ```

   We prefer `mkvirtualenv` wrapper around the default `virtualenv` module. You can learn more about it [here](https://github.com/python-virtualenvwrapper/virtualenvwrapper).

3. Activate the virtual environment:

   ```sh
   workon splitbuddy
   ```

4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

## Running the Application

1. Apply database migrations:

   ```sh
   python manage.py migrate
   ```

2. Create a superuser:

   ```sh
   python manage.py createsuperuser
   ```

   Follow the prompts to set up your admin username and password.

3. Run the development server:
   ```sh
   python manage.py runserver
   ```
4. Access the application:
   - Main site: `http://127.0.0.1:8000/`
   - Admin portal: `http://127.0.0.1:8000/admin/`

## Accessing the Admin Portal

1. Ensure the server is running.
2. Open a web browser and navigate to `http://127.0.0.1:8000/admin/`
3. Log in using the superuser credentials you created earlier.

## Additional Commands

- To create a new Django app:
  `python manage.py startapp your_app_name`
- To make migrations after model changes:
  `python manage.py makemigrations`
- To run tests:
  `python manage.py test`

## Contributing

Please read our CONTRIBUTING.md file for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
