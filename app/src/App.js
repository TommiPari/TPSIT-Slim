import {useState} from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [inserimento, setInserimento] = useState(false);
  const [alunni, setAlunni] = useState([]); 
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  function carica() {
    setLoading(true);
    fetch('http://localhost:8080/alunni')
    .then(response => response.json())
    .then(data => {
      setAlunni(data);
      setLoading(false);
    });
  }

  function toogleInserimento() {
    setInserimento(!inserimento);
  }

  function salvaAlunno() {
    setInserimento(false);
    fetch('http://localhost:8080/alunni', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nome: nome, cognome: cognome})
    })
    .then((response) => {
      carica()
    });    
  }

  return (
    <>
    <table border="1">
      <tbody>
      {alunni.map(alunno =>
          <tr>
            <td>{alunno.id}</td>
            <td>{alunno.nome}</td>
            <td>{alunno.cognome}</td>
          </tr>
        )
      }
      </tbody>
    </table>
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
    </>
  );
}

export default App;
