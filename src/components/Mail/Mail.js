import inboxlist from './Mail.module.css';
import { RiCheckboxBlankLine, RiDeleteBin6Line } from "react-icons/ri";
import { AiFillMail, AiOutlineMail } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mailActions } from '../../store/mailSlice';

const Mail = (props) => {
    const dispatch = useDispatch()


    const openHandler = (key) => {
        fetch(`https://react-project-dbase-default-rtdb.asia-southeast1.firebasedatabase.app/${props.mail.receiver}/receiver/${key}.json`, {
            method: "PUT",
            body: JSON.stringify({
                receiver: props.mail.receiver,
                subject: props.mail.subject,
                message: props.mail.message,
                sender: props.mail.sender,
                isOpen: true
            })
        }).then((res) => {
            dispatch(mailActions.openMail(props.mail.key));
        })
    }
    const deleteHandler = () => {
        props.deleteItem(props.mail.key);
    }

    return <>
        <div className={inboxlist.item} >
            <li>
                <div className={inboxlist.checkbox}>
                    <span><RiCheckboxBlankLine /></span>
                </div>
                <div className={inboxlist.read}>
                    {props.mail.isOpen === false && <span><AiFillMail /></span>}
                    {props.mail.isOpen === true && <span><AiOutlineMail /></span>}
                </div>
                <div className={inboxlist.email}>
                    <span>From:{props.mail.sender}</span>
                </div>
                <NavLink state={props.mail} to={`/inbox/${props.mail.key}`} onClick={openHandler.bind(null, props.mail.key)} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <div className={inboxlist.subject}>
                    <span>{props.mail.subject}</span>
                </div>
                </NavLink>
                <div className={inboxlist.delete} onClick={deleteHandler}>
                    <span><RiDeleteBin6Line /></span>
                </div>
            </li>
        </div>
    </>
}

export default Mail;