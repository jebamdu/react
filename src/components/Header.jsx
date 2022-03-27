import './header.css'
import avatar from '../assets/user.png'
import logot from '../assets/logout.svg'
import { useNavigate } from 'react-router-dom'
const Header = ({ user, login }) => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('logedin')
        navigate("/")
    }
    return (<div className="header">
        <div className="left">
            <h1>YEP<span>program</span></h1>
        </div>
        {!login && <>
            <div className="right">
                <img tabIndex={0} src={avatar} alt="User Picture" />
                <span className='T-15 white'>{user ? "USER" : "Admin"}</span>
                <div tabIndex={0} className="logout">
                    <img tabIndex={0} onClick={logout} src={logot} alt="logout" />
                    <span >Logout</span>
                </div>
            </div>
        </>}
    </div>);
}

export default Header;