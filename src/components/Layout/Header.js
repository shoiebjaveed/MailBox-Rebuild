import header from './Header.module.css';
import { GiMailbox } from "react-icons/gi";
import { BsFillCalendar2DateFill } from "react-icons/bs";

const Header = () => {   

    return <>
        <header className={header.container}>
            <nav className={header.content}>
                <div className={header.firstdiv}>
                    <h3>MailBox <GiMailbox /></h3>
                </div>
                <div className={header.seconddiv}>
                    <input type='text' placeholder='search for mail..' />
                </div>
                <div className={header.thirddiv}>
                    <span><BsFillCalendar2DateFill /></span>
                </div>
            </nav>
        </header>
    </>
}

export default Header;