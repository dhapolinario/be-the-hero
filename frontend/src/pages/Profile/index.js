import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import FirebaseService from "../../services/FirebaseService";
import { firebaseAuth } from "../../services/firebase";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

export default function Profile() {
  const history = useHistory();
  const [ incidents, setIncidents ] = useState([]);

  const userMail = localStorage.getItem('userMail');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    firebaseAuth.onAuthStateChanged(user => {

      if (!user) {
        history.push('/')
        return
      }

      FirebaseService.getDataList(user.uid, 'title')//TODO: Create pagination
      .onSnapshot(snapshot => {
        setIncidents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()})))
      })
    })
  }

  function handleDeleteIncident(id) {
    try {
      firebaseAuth.onAuthStateChanged(async user => {
  
        if (!user) {
          history.push('/')
          return
        }

        await FirebaseService.delData(id)
      })

    } catch (error) {
      alert('Erro ao deletar o caso, tente novamente.');
    }
  }

  async function handleLogout() {
    try {
      await FirebaseService.doSignOut();
      localStorage.clear();
      sessionStorage.clear();
      history.push('/');
    } catch (error) {
      console.log(error);      
      alert(error.message);
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo(a), {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      
      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>


            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{
              Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)
            }</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}