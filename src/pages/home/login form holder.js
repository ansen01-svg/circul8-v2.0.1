import React, { useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import axios from 'axios';


let LoginFormHolder = ({setOpenLoginHolder, openLoginHolder}) => {

    let [register, setRegister] = useState(true)

    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let closeForm = () => {
        setOpenLoginHolder(false)
        document.body.style.height = "initial"
        document.body.style.overflowY = "initial"
    }

    let submitForm = async (e) => {
        e.preventDefault()

        if (register){

            if (!username || !email || !password) {
                alert('please provide all credentials')
            }

            try {
               let { data } = await axios.post(`/apis/v2/authentication/register`, 
               { username, email, password }) 
               
               setUsername('')
               setEmail('')
               setPassword('')
               setRegister(false)

            } catch (error) {
                console.log(error)
            }

        } 
        if (!register) {

            if (!email || !password) {
                alert('please provide all credentials')
            }

            try {
                let { data } = await axios.post(`/apis/v2/authentication/login`, 
                { email, password })

                document.cookie = `domCookie=${data.msg}`
                setEmail('')
                setPassword('')
                closeForm()
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className={`${openLoginHolder ? 'login_form_holder show' : 'login_form_holder'}`}>
            <MdOutlineClose className="close_button" onClick={closeForm} />
            <div className='form_holder'>
                <form onSubmit={submitForm}>
                    <div className="login_form_header">
                        <p>{register ? 'REGISTER' : 'LOGIN'}</p>
                    </div>
                    <div className={`${register ? '' : 'hide'}`}>
                        <input type='text' placeholder='username' value={username}
                         onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <input type='email' placeholder='email'  value={email}
                         onChange={(e) => setEmail(e.target.value)}  />
                    </div>
                    <div>
                        <input type='password' placeholder='password'  value={password}
                         onChange={(e) => setPassword(e.target.value)}  />
                    </div>
                    <div>
                        <button>{register ? 'REGISTER' : 'SIGN IN'}</button>
                        <p onClick={() => setRegister(boolean => !boolean)} style={{cursor:'pointer'}}>
                            {register ? `Already a user? Sign in` : 
                           `Not registered yet? Register`}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default LoginFormHolder