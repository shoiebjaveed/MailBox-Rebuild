import { Link, NavLink } from 'react-router-dom';
import sentlist from './SentList.module.css';
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from 'react-redux';

const SentList = (props) => {
    const dispatch = useDispatch()

    const deleteHandler = () => {
        props.deleteItem(props.mail.key);
    }
    

    
 
    return <>
        <li className={sentlist.item}>
            <div className={sentlist.card}>
                <h3>{props.mail.receiver}</h3>
                <div className={sentlist.price}>{props.mail.subject}</div>
                <NavLink state={props.mail} to={`/sent/${props.mail.key}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <p>click to view message</p>
                </NavLink>
                <p onClick={deleteHandler}><AiFillDelete /></p>
            </div>
        </li>
    </>
}

export default SentList