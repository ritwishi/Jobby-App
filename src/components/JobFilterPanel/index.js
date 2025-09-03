import {Component} from 'react'

import Cookies from 'js-cookie'

import ProfilePanel from '../ProfilePanel'
import FilterJobSearch from '../FilterJobSearch'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobFilterPanel extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobProfileDescription: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  changeToCamelCase = profDetails => ({
    name: profDetails.name,
    profileImageUrl: profDetails.profile_image_url,
    shortBio: profDetails.short_bio,
  })

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.changeToCamelCase(data.profile_details)

      this.setState({
        jobProfileDescription: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  checkEmploymentType = typeId => {
    const {employmentTypeFilter, updateEmploymentTypeFilter} = this.props
    const updatedList = employmentTypeFilter.includes(typeId)
      ? employmentTypeFilter.filter(each => each !== typeId)
      : [...employmentTypeFilter, typeId]
    updateEmploymentTypeFilter(updatedList)
  }

  updateSalaryRangeRadio = salaryId => {
    const {updateSalaryRange} = this.props
    updateSalaryRange(salaryId)
  }

  render() {
    const {apiStatus, jobProfileDescription} = this.state
    const {
      employmentTypesList,
      salaryRangesList,
      salaryRange,
      employmentTypeFilter,
    } = this.props
    return (
      <div className="job-filter-main-bg-container">
        <ProfilePanel
          profileApiStatus={apiStatus}
          jobProfileDescription={jobProfileDescription}
          getProfileDetails={this.getProfileDetails}
        />
        <hr className="separator" />
        <FilterJobSearch
          employmentTypesList={employmentTypesList}
          employmentTypeFilter={employmentTypeFilter}
          checkEmploymentType={this.checkEmploymentType}
          salaryRangesList={salaryRangesList}
          salaryRange={salaryRange}
          updateSalaryRangeRadio={this.updateSalaryRangeRadio}
        />
      </div>
    )
  }
}

export default JobFilterPanel
