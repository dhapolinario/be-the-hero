import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import FirebaseService from "../../services/FirebaseService"

import "./styles.css"
import logoImg from "../../assets/logo.svg"

export default function Register() {

  const [ email, setEmail ] = useState('')
  const [ name, setName ] = useState('')
  const [ whatsapp, setWhatsapp ] = useState('')
  const [ city, setCity ] = useState('')
  const [ uf, setUf ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirm, setPasswordConfirm ] = useState('')
  
  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault()

    try {
        
      if (password !== passwordConfirm ) {
        throw Error('Password and confirmation doesn\'t match')
      }

      const response = await FirebaseService
      .doCreateUserWithEmailAndPassword(
        email,
        password,
        {name, whatsapp, city, uf, email}
      )

      localStorage.setItem('ongName', name)
      
      if (response) {
        history.push('/')
      }

    } catch (error) {
      console.log(error)   
      alert(error.message)
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Heroes" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG" 
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="WhatsApp (com DDI, Brasil 55)" 
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required
          />

          <div className="input-group">
            <input
              placeholder="Cidade" 
              value={city}
              onChange={e => setCity(e.target.value)}
              required
            />
            <input
              placeholder="UF"
              style={{ width: 80 }} 
              value={uf}
              onChange={e => setUf(e.target.value)}
              required
            />
          </div>
          <br /><hr />
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmação"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}