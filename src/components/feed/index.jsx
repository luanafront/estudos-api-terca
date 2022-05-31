import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material/';
import axios from "axios";

const Feed = () => {
    const navigate = useNavigate()
    const [feedData, setFeedData] = useState(null)


    useEffect(() => {
        let token = localStorage.getItem("token")
        if(token === null){
            navigate("/")
        }else {
            axios.get("https://62913677665ea71fe142a512.mockapi.io/api/v1/profile/").then(
                (res) => {
                    let data = res.data 
                    setFeedData(data)
                }
            )
        }
    }, [])
    const pushToMyProfile = () => {
        navigate("/profile/")
    }
    const clearToken = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        feedData === null ? 
        <p>Loading</p> :
        <div>
            <Button 
                variant="outlined" 
                color="secondary"
                onClick={pushToMyProfile}
            >
                My profile
            </Button>
            <Button 
                variant="outlined" 
                color="secondary"
                onClick={clearToken}
            >
                Logout
            </Button>
            {feedData.map((profile, index)=>{
                return (
                    <div key={index}>
                        <img alt="" src={profile.avatar}/>
                        <p>name: {profile.name}</p>
                        <p>email: {profile.email}</p>
                    </div>
                )
            })}
        </div>
       
    )

}

export default Feed