
import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import {auth,provider} from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import db from './firebase';

function Login() {
    const [{},dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                const {email} = result.user;
                // console.log(email)
                db.collection('users').where("email", "==", email)
                .get()
                .then((querySnapshot) => {
                    if(querySnapshot.size>0){
                        dispatch({
                            type: actionTypes.SET_USER,
                            user: result.user,
                        })
                    }else{
                        alert("No tiene permisos");
                    }
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });  
            })
            .catch((error) => alert(error.message));
    }
    return (
        <div className="login">
           <div className="login_container">
               {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/>  */}
                <div className="login_text">
                    <h1>Sign in</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
           </div>
        </div>
    );
}

export default Login