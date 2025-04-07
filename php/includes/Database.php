<?php
    class Database extends MySQLi {
        static protected $instance = null;

        public function __construct($host, $user, $password, $schema) {
            parent::__construct($host, $user, $password, $schema);
        }

        static function getInstance() {
            if (self::$instance == null) {
                self::$instance = new Database('my_mariadb', 'root', 'ciccio', 'scuola');
                return self::$instance;
            }
        }

        public function select($table, $where = 1) {
            $query = "SELECT * FROM $table WHERE $where";
            if ($result = $this->query($query)) {
                while ($row = $result->fetch_assoc()) {
                    $array[] = $row;
                }
                return $array;
            }
            return null;
        }

        public function insert($table, $values) {
            $query = "INSERT INTO $table VALUES $values";
            return $this->query($query);
        }

        public function update($table, $values, $where) {
            $query = "UPDATE $table SET $values WHERE $where";
            return $this->query($query);
        }

        public function delete($table, $where) {
            $query = "DELETE FROM $table WHERE $where";
            return $this->query($query);
        }
    }
