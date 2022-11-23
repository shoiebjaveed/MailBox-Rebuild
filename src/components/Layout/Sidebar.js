import { Link, useNavigate } from 'react-router-dom';
import sidebar from './Sidebar.module.css';
import { BsPencilSquare, BsFilePersonFill } from "react-icons/bs";
import { RiInboxFill } from "react-icons/ri";
import { MdOutlineLabelImportant } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const totalNotOpened = useSelector(state => state.mail.totalNotOpened);
    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/login");

    }

    return <>
        <div className={sidebar.container}>
            <nav className={sidebar.nav}>
                <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <li className={sidebar.list}>
                        <span ><BsPencilSquare /></span>
                        <span>Write</span>
                    </li>
                </Link>
                <Link to='/inbox' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <li className={sidebar.list}>
                        <span ><RiInboxFill /></span>
                        <span>{`Inbox(${totalNotOpened} unread)`}</span>
                    </li>
                </Link>
                <Link to='/sent' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <li className={sidebar.list}>
                        <span ><MdOutlineLabelImportant /></span>
                        <span>Sent</span>
                    </li>
                </Link>
                <Link to='/draft' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <li className={sidebar.list}>
                        <span ><HiOutlineNewspaper /></span>
                        <span>Draft</span>
                    </li>
                </Link>
            </nav>
            <div className={sidebar.profiles}>
                <p>profiles</p>
            </div>
            <div className={sidebar.bottom}>
                <Link to='/user' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <span>
                        <BsFilePersonFill />
                    </span>
                </Link>
                <span onClick={logoutHandler}>
                    <FiLogOut />
                </span>
            </div>
        </div>
    </>
}

export default Sidebar;