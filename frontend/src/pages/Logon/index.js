import React, { useEffect, useState }  from "react"
import { Link, useHistory } from "react-router-dom"
import { FiLogIn } from "react-icons/fi"
import { IoMdLogIn } from "react-icons/io"
import { FaGooglePlusG } from "react-icons/fa"
import FirebaseService from "../../services/FirebaseService"
import { firebaseAuth } from "../../services/firebase";
import logoImg from "../../assets/logo.svg"
import heroesImg from "../../assets/heroes.png"
import Signature from '../../Signature'

import "./styles.css";

export default function Logon() {
  const [ id, setId ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const history = useHistory()

  useEffect(() => {
    checkSession()
  }, [])

  function checkSession() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        history.push('/profile')
      } else {
        history.push('/')
      }
    })
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
    
      const response = await FirebaseService
        .doSignInWithEmailAndPassword(email, password)
        
      const ong = await FirebaseService.getOngData(response.user.uid)
        .then(doc => (doc.data()))

      localStorage.setItem('ongName', ong.name)

      history.push('/profile')
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  async function doSignInWithGoogle(e) {
    e.preventDefault();

    try {
      const response = await FirebaseService.doSignInWithGoogle()
      const token = response.credential.accessToken;
      const user = response.user;
      
      sessionStorage.setItem('token', token)
      localStorage.setItem('ongName', user.displayName.split(' ')[0])

      history.push('/profile')
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <header>
      <div className="logon-container">
          <section className="form">
            <img src={logoImg} alt="Heroes" />

            <form onSubmit={handleLogin}>
              <h1>Faça seu logon</h1>

              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <button className="button" type="submit">
                <FiLogIn size={25} />
                Entrar
              </button>

              <Link className="back-link" to="/register">
                <IoMdLogIn size={16} color="#E02041" />
                Não tenho cadastro
              </Link>
            </form>

            <br /><br /><hr />

            <button className="button" onClick={doSignInWithGoogle}>
              <FaGooglePlusG size={25} />
              Login com Google
            </button>
            
            <Signature />
              
          </section>

        <img src={heroesImg} alt="Heroes" />
      </div>
    </header>
  );
}