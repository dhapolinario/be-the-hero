import React, { useState, useEffect }  from 'react'
import { Link, useHistory } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import FirebaseService from "../../services/FirebaseService"
import { firebaseAuth } from "../../services/firebase";
import logoImg from "../../assets/logo.svg"
import "./styles.css"

export default function NewIncident() {
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [ongName, setOngName] = useState('')

  useEffect(() => {
    setOngName(localStorage.getItem('ongName'))
  }, [])

  async function handleNewIncident(e) {
    e.preventDefault()

    try {

      firebaseAuth.onAuthStateChanged(async(user) => {
        if (!user) {
          history.push('/')
          return;
        }

        await FirebaseService.postData({
          title, description, value, ongId: user.uid, ongName
        })
        history.push('/profile')
      })
    } catch (error) {
      console.log(error);      
      alert(error.message)
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Heroes" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}