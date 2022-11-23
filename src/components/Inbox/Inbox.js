import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../../store/mailSlice';
import { getUsername } from '../../trimEmail';
import Mail from '../Mail/Mail';
import inbox from './Inbox.module.css';

const Inbox = () => {
    const [inboxMail, setInboxMail] = useState([]);
    const user = localStorage.getItem("email");
    const username = getUsername(user);
    const dispatch = useDispatch();
    const totalNotOpened = useSelector(state => state.mail.totalNotOpened);

    useEffect(() => {
        console.log("called");
        const setIntervalId = setInterval(() => {
            let mails = [];
            fetch(`https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/${username}/receiver.json`).then((res) => {
                return res.json();
            }).then((data) => {
                let notOpened = 0;
                for (let [key, value] of Object.entries(data)) {
                    mails.push({ key, ...value });
                    if (value.isOpen === false) {
                        notOpened += 1;
                    }
                }
                
                setInboxMail(mails);
                dispatch(mailActions.countNotOpened(notOpened));
            }).catch((err) => {
                console.log(err);
            });
        }, 2000);
        return () => clearInterval(setIntervalId);
    }, [dispatch]);
    const deleteHandler = (key) => {
        fetch(`https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/${username}/receiver/${key}.json`, {
            method: "DELETE",
        }).then((res) => {
            const inboxMailCopy = [...inboxMail]
            const index = inboxMailCopy.findIndex((item) => item.key === key);
            inboxMailCopy.splice(index, 1)
            setInboxMail(inboxMailCopy);
        })
    }
    return <>
        <div className={inbox.container}>
            <h2>Mails</h2>
            <ul>
                {inboxMail.length === 0 && <h3 style={{textAlign: "center"}}>Please wait...</h3>}
                {
                    inboxMail.map((mail) => {
                        return <Mail key={mail.key} deleteItem={deleteHandler} mail={mail} isSentBox={false} />
                    })
                }
            </ul>
        </div>
    </>
}

export default Inbox;