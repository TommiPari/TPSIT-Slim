import {useState} from 'react';

function AlunnoRow(props) {
  const alunno = props.alunno;
  const alunnoModificato = {
    id: alunno.id,
    nome: "",
    cognome: ""
  }
  const [cancellazione, setCancellazione] = useState(false);
  const [edit, setEdit] = useState(false);

  function gestisciEliminazione(){
    setCancellazione(false);
    props.elimina(alunno.id);
  }

  function gestisciModifica(){
    setEdit(false);
    props.modifica(alunnoModificato);
  }

  return (
    <>
      <tr>
        <td>{alunno.id}</td>
        <td>{!edit ? (alunno.nome) : (<input onChange={(e) => alunnoModificato.nome = (e.target.value)} placeholder={alunno.nome}></input>)}</td>
        <td>{!edit ? (alunno.cognome) : (<input onChange={(e) => alunnoModificato.cognome = (e.target.value)} placeholder={alunno.cognome}></input>)}</td>
        <td>{ cancellazione ? 
          <>
          <label>Sei sicuro?</label>
          <button onClick={() => gestisciEliminazione()}>Si</button>
          <button onClick={() => setCancellazione(false)}>No</button>
          </>
          : <button onClick={() => setCancellazione(true)}>Delete</button> }
        </td>
        <td>{ edit ? 
          <>
          <button onClick={() => gestisciModifica()}>Salva</button>
          <button onClick={() => setEdit(false)}>Annulla</button>
          </>
          : <button onClick={() => setEdit(true)}>Modifica</button> }

        </td>
      </tr>
    </>
  );
}

export default AlunnoRow;
