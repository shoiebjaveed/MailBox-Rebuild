import composemail from './Home.module.css'
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../../trimEmail';
import { useDispatch } from 'react-redux';
import { mailActions } from '../../store/mailSlice';

const Home = () => {
    const to = useRef()
    const subject = useRef()
    const [value, setValue] = useState('');    
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const user = localStorage.getItem("email");
    const username = getUsername(user);


    const submitHandler = (e) => {
        e.preventDefault();
        const enteredto = to.current.value;
        const enteredSubject = subject.current.value;
        const enteredmessage = value;
        const email = {
            receiver: enteredto,
            subject: enteredSubject,
            message: enteredmessage,
            sender: username,
            isOpen: false
        };
        fetch(`https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/${username}/sent.json`, {
            method: "POST",
            body: JSON.stringify(email)
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            else return res.json();
        }).then((data) => {
            console.log("MESSAGE SENT");
        }).catch((err) => {
            console.error(err.message);
        });
        const userReceived = getUsername(enteredto);
        const received_mail = {
            receiver: userReceived,
            subject: enteredSubject,
            message: enteredmessage,
            sender: username,
            isOpen: false
        }
        fetch(`https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/${userReceived}/receiver.json`, {
            method: "POST",
            body: JSON.stringify(received_mail)
        }).then((res) => {
            if (!res.ok) { throw new Error("Something went wrong!") }
            else return res.json();
        }).then((data) => {
            dispatch(mailActions.addMail(received_mail));
            navigate("/inbox")
        }).catch((err) => { console.log(err); });
    }

    

    return <>
        <div className={composemail.container}>
            <div className={composemail.content}>
                <form className={composemail.form} onSubmit={submitHandler}>
                    <div className={composemail.input}>
                        <input type='email' placeholder='to' required ref={to} />
                    </div>
                    <div className={composemail.input}>
                        <input type='text' placeholder='subject' required ref={subject} />
                    </div>
                    <div className={composemail.textArea}>
                        <ReactQuill theme="snow" value={value} onChange={setValue} placeholder='write someting..'
                            style={{
                                height: '250px',
                                width: '520px',
                                marginLeft: '25%',
                                borderRadius: '5px',
                            }} />
                    </div>
                    <button className={composemail.submit} type='submit'>send</button>
                </form>

            </div>
        </div>

    </>
}

export default Home;