<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';
require __DIR__ . '/controllers/includes/Database.php';

$app = AppFactory::create();

// curl http://localhost:8080/alunni
$app->get('/alunni', "AlunniController:index");

// curl http://localhost:8080/alunni/id
$app->get('/alunni/{id}', "AlunniController:show");

// curl -X POST http://localhost:8080/alunni -H "Content-Type: application/json" -d '{"nome" : "tommaso", "cognome" : "parigi"}'
$app->post('/alunni', "AlunniController:create");

// curl -X PUT http://localhost:8080/alunni/id -H "Content-Type: application/json" -d '{"nome" : "tommaso", "cognome" : "parigi"}'
$app->put('/alunni/{id}', "AlunniController:update");

// curl -X DELETE http://localhost:8080/alunni/id
$app->delete('/alunni/{id}', "AlunniController:delete");

$app->run();