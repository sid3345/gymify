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
                                history.push('/owner')
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
                            history.push('/owner')
                            //window.location.reload()
                        }
                        else{
                            history.push('/')
                            window.location.reload()

                        }
                    })
                }
                
            })
            .catch(error => alert(error.message))

    }

  
    // console.log(checked)

    return (
        <div className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex">
                                <div className="img" style={{ backgroundImage: `url(${require("../assets/img/login.jpg")})` }}>
                                </div>
                            <div className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Sign In</h3>
                                    </div>
                                </div>
                                <form className="signin-form">
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="name">Username</label>
                                        <input type="email" className="form-control"  placeholder="Username" value = {email} onChange = {e => setEmail(e.target.value)} required />

                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="label" htmlFor="password">Password</label>
                                        <input type="password" className="form-control" placeholder="Password" value = {password} onChange = {e => setPassword(e.target.value)} required />

                                    </div>

                                    <label>
                                        <input type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />
                                    GYM OWNER
                                    </label>

                                    <div className="form-group">

                                        <button type = "submit" onClick = {signIn} className = "form-control btn btn-primary rounded submit px-3">Sign In</button>

                                    </div>
                                </form>
                                <button onClick = {register} className = "form-control btn btn-primary rounded submit px-3">Create Your Account</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default Login
