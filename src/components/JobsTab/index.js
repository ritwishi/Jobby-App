import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import JobFilterPanel from '../JobFilterPanel'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class JobsTab extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    salaryRange: '',
    employmentTypeFilter: [],
    searchInput: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  convertDataToCamelCase = jobs =>
    jobs.map(eachData => ({
      companyLogoUrl: eachData.company_logo_url,
      employmentType: eachData.employment_type,
      id: eachData.id,
      jobDescription: eachData.job_description,
      location: eachData.location,
      packagePerAnnum: eachData.package_per_annum,
      rating: eachData.rating,
      title: eachData.title,
    }))

  getJobsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {salaryRange, employmentTypeFilter, searchInput} = this.state
    const employmentTypeQuery = employmentTypeFilter.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = this.convertDataToCamelCase(data.jobs)
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-bg-container">
        <input
          type="search"
          placeholder="Search"
          onChange={this.changeSearchInput}
          value={searchInput}
          onKeyDown={this.onEnterKey}
          className="search-input"
        />
        <button
          className="search-icon-container"
          type="button"
          onClick={this.getJobsList}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderNoJobFoundView = () => (
    <div className="failure-main-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view-image"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length > 0 ? (
          <ul className="job-description-unordered-list-container">
            {jobsList.map(eachJobDescription => (
              <JobCard
                jobDetails={eachJobDescription}
                key={eachJobDescription.id}
              />
            ))}
          </ul>
        ) : (
          this.renderNoJobFoundView()
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-main-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-heading"> Oops! Something Went Wrong </h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.getJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDescriptionList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  updateEmploymentTypeFilter = updatedList => {
    this.setState({employmentTypeFilter: updatedList}, this.getJobsList)
  }

  updateSalaryRange = salaryId => {
    this.setState({salaryRange: salaryId}, this.getJobsList)
  }

  render() {
    const {salaryRange, employmentTypeFilter} = this.state
    return (
      <div className="jobs-tab-main-bg-container">
        <JobFilterPanel
          employmentTypesList={employmentTypesList}
          employmentTypeFilter={employmentTypeFilter}
          updateEmploymentTypeFilter={this.updateEmploymentTypeFilter}
          salaryRangesList={salaryRangesList}
          salaryRange={salaryRange}
          updateSalaryRange={this.updateSalaryRange}
        />
        <div className="job-output-bg-container">
          {this.renderSearchBar()}
          {this.renderJobDescriptionList()}
        </div>
      </div>
    )
  }
}

export default JobsTab
