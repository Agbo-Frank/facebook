import images from '../../images'
import { NavLink } from 'react-router-dom'
import './header.css'

function Header(){
    return(
        <header>
            <div className="logo">
                <img src={images.fbLogo} alt="facebook_logo" />
            </div>
            <div className='search'>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search" />
            </div>
            <ul>
                <div className='profileLink'><NavLink to="/profile">
                    <img src={images.profilePics} alt="profile" />
                    <p>Francis</p>
                </NavLink></div>
                <li className='menuIcon'>
                    <a data-title="messenger"><i className="fas fa-bars"></i></a>
                </li>
                <li>
                    <a className="active" data-num="3" data-title="messenger"><i className="fab fa-facebook-messenger"></i></a>
                </li>
                <li>
                    <a className="active" data-num="7" data-title="notification"><i className="fas fa-bell"></i></a>
                </li>
                <li>
                    <a className="" data-num="3" data-title="account"><i className="fas fa-caret-down"></i></a>
                </li>
            </ul>
        </header>
    )
}

export default Header