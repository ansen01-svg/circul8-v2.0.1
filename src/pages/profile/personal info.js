import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/action functions';


let PersonalInfo = ({currentUser}) => {

    let dispatch = useDispatch()

    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    
    let [hideButton, setHideButton] = useState(true)

    let submitForm = (e) => {
        e.preventDefault()

        if (!username) {
            dispatch(updateUser({username : currentUser.username, email}))
            setHideButton(true)
            setUsername('')
            setEmail('')
        }
        if (!email) {
            dispatch(updateUser({username, email : currentUser.email}))
            setHideButton(true)
            setUsername('')
            setEmail('')
        }
    }


    return (
        <div className="personal_info_holder">
            <form onSubmit={submitForm}>
                <div>
                    <p>Name</p>
                    <input type="text" 
                    placeholder={Object.keys(currentUser).length === 0 ? username : currentUser.username}
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <p>Email</p>
                    <input type="email" 
                    placeholder={Object.keys(currentUser).length === 0 ? username : currentUser.email}
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='button_div'>
                    <p onClick={() => setHideButton(boolean => !boolean)}>Edit</p>
                    <button className={`${hideButton ? '' : 'show'}`}>SAVE</button>
                </div>
            </form>
        </div>
    )
}


export default PersonalInfo