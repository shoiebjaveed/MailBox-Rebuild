import sentbox from './Sent.module.css';
import SentList from './SentList';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUsername } from '../../trimEmail';

const Sent = () => {
    const [inboxMail, setInboxMail] = useState([]);
    const user = localStorage.getItem("email");
    const username = getUsername(user);
    useEffect(() => {
        let mails = [];
        fetch(`https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/${username}/sent.json`).then((res) => {
            return res.json();
        }).then((data) => {
            for (let [key, value] of Object.entries(data)) {
                mails.push({ key, ...value });
            }
            setInboxMail(mails);
        }).catch((err) => {
            console.log(err);
        });
        console.log("getting called");
    }, []);
    const deleteHandler = (key) => {
        fetch(`https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/${username}/sent/${key}.json`, {
            method: "DELETE",
        }).then((res) => {
            const inboxMailCopy = [...inboxMail]
            const index = inboxMailCopy.findIndex((item) => item.key === key);
            inboxMailCopy.splice(index, 1)
            setInboxMail(inboxMailCopy);
        })
    }

    return <>
        <div className={sentbox.container}>
                <ul>
                {inboxMail.map((mail) => {
                        return <SentList key={mail.key} mail={mail} deleteItem={deleteHandler} isSentBox={true} />
                    })}
                </ul>
        </div>
    </>
}

export default Sent;