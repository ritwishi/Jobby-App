import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="navbar-main-bg-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <div className="icons-bg-container">
          <Link to="/">
            <AiFillHome className="react-icon" />
          </Link>
          <Link to="/jobs">
            <BsBriefcaseFill className="react-icon" />
          </Link>
          <FiLogOut className="react-icon" onClick={onClickLogout} />
        </div>
      </nav>
      <nav className="navbar-main-bg-container-lg">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo-lg"
          />
        </Link>
        <ul className="home-n-jobs-container">
          <li className="home-n-jobs-options">
            <Link to="/" className="nav-home-n-jobs-link">
              Home
            </Link>
          </li>
          <li className="home-n-jobs-options">
            <Link to="/jobs" className="nav-home-n-jobs-link">
              Jobs
            </Link>
          </li>
          <li className="home-n-jobs-options">
            <Link to="/new" className="nav-home-n-jobs-link">
              new
            </Link>
          </li>
        </ul>
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
