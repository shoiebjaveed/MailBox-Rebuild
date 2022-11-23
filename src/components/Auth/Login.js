import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from './Login.module.css';

const Login = () => {
    const [buttonClick, setButtonClick] = useState(false)
    const navigate = useNavigate()
    const email = useRef()
    const password = useRef()

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBK8Alre00hDm4NyzKDrAaPsW6h4gzcJs`, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            })
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            return res.json();
        }).then((data) => {
            localStorage.setItem("token", data.idToken);
            localStorage.setItem("email", enteredEmail);
            navigate("/home");
        }).catch((err) => {
            alert(err.message)
            setButtonClick(false)
        })
    }

    return <>
        <div className={login.container}>
            <div className={login.content}>
                <h3>Login</h3>
                <form onSubmit={submitHandler}>
                    <input type='email' placeholder='email' ref={email} />
                    <input type='password' placeholder='password' ref={password} />
                    <button type='submit'>{!buttonClick && <p>Login</p>}
                    {buttonClick && <p>please wait....</p>}
                    </button>
                    <h6>forgot password?</h6>
                </form>
                <h5>Does not have an account?
                    <Link to='/signup'>Signup</Link>
                </h5>
            </div>
        </div>
    </>
}

export default Login;