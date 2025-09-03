import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-main-bg-container">
        <div className="home-inner-bg-container">
          <h1 className="home-title"> Find The Job That Fits Your Life </h1>
          <p className="home-title-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="home-find-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
