import {useState} from 'react';
import "./App.css";
import AlunnoRow from './AlunnoRow.js';

function App() {
  const [loading, setLoading] = useState(false);
  const [inserimento, setInserimento] = useState(false);
  const [alunni, setAlunni] = useState([]); 
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  async function carica() {
    setLoading(true);
    const response = await fetch('http://localhost:8080/alunni');
    const data = await response.json();
    setAlunni(data);
    setLoading(false);
  }

  function toogleInserimento() {
    setInserimento(!inserimento);
  }

  async function salvaAlunno() {
    setInserimento(false);
    const response = await fetch('http://localhost:8080/alunni', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nome: nome, cognome: cognome})
    });
    carica();
  }

  async function eliminaAlunno(id) {
    const response = await fetch('http://localhost:8080/alunni/' + id, {
      method: 'DELETE'
    });
    carica();
  }

  async function modificaAlunno(alunno) {
    const response = await fetch('http://localhost:8080/alunni/' + alunno.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nome: alunno.nome, cognome: alunno.cognome})
    });
    carica();
  }

  return (
    <>
    <div id="body">
      <h1>Alunni</h1>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Elimina</th>
            <th>Modifica</th>
          </tr>
          { alunni.map(alunno =>
            <AlunnoRow alunno={alunno} elimina={(id)=>eliminaAlunno(id)} modifica={(alunno)=>modificaAlunno(alunno)}></AlunnoRow>     
            )
          }
        </tbody>
      </table>
      <br></br>
      { loading && <p>Caricamento in corso...</p> }
      { alunni.length === 0 && !loading && <button onClick={carica}>Carica alunni</button> }
      { alunni.length > 0 && !inserimento && <button onClick={toogleInserimento}>Inserisci alunno</button> }
      { inserimento && 
        <div>  
          <input placeholder='Nome' onChange={(e) => setNome(e.target.value)}></input><br></br>
          <input placeholder='Cognome' onChange={(e) => setCognome(e.target.value)}></input><br></br>
          <button onClick={salvaAlunno}>Salva</button>
          <button onClick={toogleInserimento}>Annulla</button>
        </div>
      }
    </div>
    </>
  );
}

export default App;
