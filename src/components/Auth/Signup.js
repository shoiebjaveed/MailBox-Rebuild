import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signup from './Signup.module.css';

const Signup = () => {
    const [buttonClick, setButtonClick] = useState(false)
    const navigateTo = useNavigate()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()

    const submitHandler = (e) => {
        e.preventDefault();
        const userEmail = email.current.value;
        const userPassword = password.current.value;
        const userConfirm = confirmPassword.current.value;
        if (userPassword !== userConfirm) {
            alert('Password does not match')
        } else {
            setButtonClick(true)
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBK8Alre00hDm4NyzKDrAaPsW6h4gzcJs', 
            {
                method: "POST",
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setButtonClick(false)
                if (res.ok) {
                    navigateTo('/login')
                } else {
                    return res.json().then(err => {
                        let error = 'Signup failed!'
                        if(err && err.error && err.error.message){
                            error = err.error.message
                        }
                        alert(error)
                    })
                }
            })
        }
        
    }

    return <>
    <div className={signup.container}>
        <div className={signup.content}>
            <h3>Signup</h3>
            <form onSubmit={submitHandler}>
                <input type='email' placeholder='email' ref={email} required/>
                <input type='password' placeholder='password' ref={password} required/>
                <input type='password' placeholder='confirm password' ref={confirmPassword} required/>
                <button type='submit'>{!buttonClick && <p>Signup</p>}
                {buttonClick && <p>please wait signing up...</p>}
                </button>

            </form>
            <h5>Already have an account?
                <Link to='/login'>Login</Link>
            </h5>
        </div>
    </div>
    </>
}

export default Signup;