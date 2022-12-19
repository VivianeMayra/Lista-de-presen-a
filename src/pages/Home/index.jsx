import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card } from '../../components/Card';

export function Home() {
 
  const [userName, setUserName] = useState("");
    //estado constituido por [conteúdo, função]
  const [users, setUsers] = useState([]);
  const[ dev, setDev] = useState({name: "", avatar: ""});

  function handleAddUser(){
    const newUser={      
      name:userName,
      time: new Date().toLocaleDateString("pt-BR", {
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit",
      }),
    };

    setUsers( (prevState) => [...prevState,newUser]);
  }

  useEffect(() => {
    fetch("https://api.github.com/users/VivianeMayra")
    .then((response) => response.json())
    .then((data) => {
     setDev({
      name: data.name,
      avatar: data.avatar_url,
     });
    });
  },[]);
  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{dev.name}</strong>
          <img src={dev.avatar} alt="logo foto perfil"/>
        </div>
      </header>
      <input 
      type="text"
      placeholder="Digite seu nome..."
      onChange={e =>setUserName(e.target.value)}
      />
      <button type="button" onClick={handleAddUser}>
        Adicionar
      </button>

      {
        users.map(user =>
        <Card 
        //utilize chaves únicas quando estiver mexendo com a estrutura map e para manter seu código react mais performático
        key={new Date()} 
        name= {user.name} 
        time={user.time}
        />)
        
      }
      
    </div>
  );
}


