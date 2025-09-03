import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const ProfilePanel = props => {
  const {profileApiStatus, jobProfileDescription, getProfileDetails} = props
  const {name, profileImageUrl, shortBio} = jobProfileDescription

  const renderProfileBoard = () => (
    <div className="profile-details-container">
      <img src={profileImageUrl} alt="profile" className="profile-image" />
      <h1 className="profile-name"> {name} </h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )

  const renderFailureBoard = () => (
    <div className="profile-failure-container">
      <button
        className="retry-button"
        type="button"
        onClick={getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  const renderLoadingBoard = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderProfilePanel = () => {
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return renderProfileBoard()
      case apiStatusConstants.failure:
        return renderFailureBoard()
      case apiStatusConstants.inProgress:
        return renderLoadingBoard()
      default:
        return null
    }
  }

  return <> {renderProfilePanel()} </>
}

export default ProfilePanel
