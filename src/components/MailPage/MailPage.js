import { useNavigate, useParams } from 'react-router-dom';
import view from './MailPage.module.css';
import { BiArrowBack, BiTrash, BiArchiveIn } from "react-icons/bi";
import { GoReport } from "react-icons/go";
import ReactHtmlParser from 'react-html-parser'
import { useDispatch, useSelector } from 'react-redux';
import { getUsername } from '../../trimEmail';
import { useEffect } from 'react';
import { mailActions } from '../../store/mailSlice';

const MailPage = (props) => {
    const user = localStorage.getItem("email");
    const username = getUsername(user);
    const dispatch = useDispatch();
    const params = useParams();
    const mail = useSelector(state => state.mail.mail);
    const navigate = useNavigate()

    useEffect(() => {
            fetch(`https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/${username}/receiver.json`).then((res) => {
                return res.json();
            }).then((data) => {
                let inboxMails = [];
                for (let [key, value] of Object.entries(data)) {
                    inboxMails.push({ key, ...value });
                }
                const selectedMail = inboxMails.find((i) => i.key === params.id);
                console.log(selectedMail)
                dispatch(mailActions.replaceMail(selectedMail));
            }).catch((err) => {
                console.log(err);
            })
    }, []);


    console.log(mail)

    const backButtonHandler = () => {
        navigate('/inbox');
    }

    const archiveButtonHandler = () => {
        alert('Message archived')
    }

    const reportButtonHandler = () => {
        alert('Email has reported as spam')
    }

    const deleteButtonHandler = () => {
        alert('mail deleted')
    }

    return <>
        <div className={view.container}>
            <div className={view.content}>
                <header>
                    <span onClick={backButtonHandler}><BiArrowBack /></span>
                    <span onClick={archiveButtonHandler}><BiArchiveIn /></span>
                    <span onClick={reportButtonHandler}><GoReport /></span>
                    <span onClick={deleteButtonHandler}><BiTrash /></span>
                </header>
                   
                    <li key={mail.key}>
                        <span className={view.profile}>
                            <img src="https://lh3.googleusercontent.com/a/default-user=s40-p" alt='profile' />
                            <h6>{mail.sender}</h6>
                            <h5>{mail.sender}</h5>
                        </span>
                        <h3>{mail.subject}</h3>
                        <div className={view.message}>
                            <span>{ReactHtmlParser(mail.message)}</span>
                        </div>
                    </li>
            </div>
        </div>
    </>
}

export default MailPage;