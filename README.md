### Zoo application


## Frontend CRUD for Animal records

Pages

  * / - Homepage for viewing list of animals
  * /add-animal - Add a new animal
  * /animal/{id} - View, edit, or delete an animal record. Expects an animal ID in the URL



## To run the application:

Backend
 - composer install
 - php artisan migrate:fresh
 - php artisan serve

Frontend
 - npm install
 - npm start

Access the frontend at http://localhost:3000