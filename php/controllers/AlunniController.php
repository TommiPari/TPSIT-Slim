<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController {
  public function index(Request $request, Response $response, $args){
    $database = Database::getInstance();
    $results = $database->select("alunni");
    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function show(Request $request, Response $response, $args){
    $database = Database::getInstance();
    $results = $database->select("alunni", "id = " . $args["id"]);
    $response->getBody()->write(json_encode($result));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function create(Request $request, Response $response, $args){
    $data = json_decode($request->getBody()->getContents(), true);
    $nome = $data["nome"];
    $cognome = $data["cognome"]; 
    $result = Database::getInstance()->query("INSERT INTO alunni (nome,cognome) VALUES ('$nome', '$cognome')");
    $response->getBody()->write($result ? "inserimento avvenuto\n" : "errore\n");
    return $response->withStatus(200);
  }

  public function update(Request $request, Response $response, $args){
    $data = json_decode($request->getBody()->getContents(), true);
    $nuovoNome = $data["nome"];
    $nuovoCognome = $data["cognome"];
    $id = $args["id"];
    $result = Database::getInstance()->query("UPDATE alunni SET nome = '$nuovoNome', cognome = '$nuovoCognome' WHERE id = $id");
    $response->getBody()->write($result ? "aggiornamento effettuato\n" : "errore\n");
    return $response->withStatus(200);
  }

  public function delete(Request $request, Response $response, $args){
    $result = Database::getInstance()->query("DELETE FROM alunni WHERE id = " . $args["id"]);
    $response->getBody()->write($result ? "studente eliminato\n" : "errore\n");
    return $response->withStatus(200);
  }
}