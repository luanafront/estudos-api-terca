import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import axios from "axios";
import "./index.css"

const Profile = () => {
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState(null) 

    useEffect(() => {
        let token = localStorage.getItem("token")
        if(token === null){
            /**
             * verificação simplificada de token
             * o fluxo normal seria enviar esse token para api e verificar 
             * se há algum usuario atrelado a ele, se não houver, volta para
             * pagina de login.
             */
            navigate("/")
        }else {
            axios.get("https://62913677665ea71fe142a512.mockapi.io/api/v1/profile/1/").then(
                (res) => {
                    let data = res.data 
                    setProfileData(data)
                }
            )
        }
    },[])
    // condição ? se sim : se não
    const clearToken = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    const backToFeed = () => {
        navigate("/feed/")
    }

    return (
        profileData === null ? 
        <p>Loading</p> : 
        <div>
            <header className="cabecalho">
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={backToFeed}
                >
                    Back
                </Button>
                <h1 className="titulo">Perfil</h1>
            </header>
            <main className="principal">
                <div className="div_imagem">
                            <img className="imagem_perfil" alt="imagem" src={profileData.image_profile}/>
                </div>
                <p>Email: {profileData.email}</p>
                <p>Nome: {profileData.first_name} {profileData.last_name}</p>
                <p>Github desse Projeto:
                        <a href="https://github.com/luanafront/estudos-api-segunda"> Clique AQUI</a>
                </p>
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={clearToken}
                >
                    Logout
                </Button>
            </main>
        </div>
       
    )
}

export default Profile