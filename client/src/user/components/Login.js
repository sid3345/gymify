import axios from 'axios'
import React, { useState } from 'react'
import { Link , useHistory} from 'react-router-dom'
import '../assets/css/Login.css'
import {auth} from "../firebase"

function Login() {
    const history = useHistory()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [checked , setChecked] = useState(false)

    const signIn = e =>{
        e.preventDefault()

            auth
                .signInWithEmailAndPassword(email , password)
                .then(auth => {
                    // console.log(auth.user.email)
                    if(auth.user.email == "admin@admin.com"){
                        history.push('/admin')
                    }
                    else if(auth){
                        axios.post("http://localhost:5000/fetchUser" , {email : auth.user.email})
                        .then((res) =>{
                            // console.log(res.data[0].email)
                            if(res.data[0].checked == true){
                                history.push('/register_gym')
                            }
                            else{
                                history.push('/')
                            }
                        })
                    }
                    // history.push('/')

                })
                .catch(error => alert(error.message))
    }

    const register = e =>{
        e.preventDefault()
        auth
            .createUserWithEmailAndPassword(email , password)
            .then((auth) =>{
                if(auth){
                    axios.post("http://localhost:5000/createUser" , {email : auth.user.email , check : {checked}})
                    .then((res) =>{
                        if(res.data.check.checked == true){
                            history.push('/register_gym')
                        }
                        else{
                            history.push('/')
                        }
                    })
                }
                
            })
            .catch(error => alert(error.message))

    }

  
    // console.log(checked)

    return (
        <div className = "login">
            <Link to = "/">
                <img className = "login__logo" 
                    src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png" 
                    />
            </Link>
            
            <div className = "login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type = "email" value = {email} onChange = {e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type = "password" value = {password} onChange = {e => setPassword(e.target.value)}/>

                    <label>
                        <input type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />
                        GYM OWNER
                    </label>

                    <button type = "submit" onClick = {signIn} className = "login__signInButton">Sign In</button>

                    
                </form>


                <button onClick = {register} className = "login__registerButton">Create Your Account</button>

                

            </div>
        </div>
    )
}

export default Login
