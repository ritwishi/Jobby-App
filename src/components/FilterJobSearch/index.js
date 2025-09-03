import './index.css'

const FilterJobSearch = props => {
  const {
    employmentTypesList = [],
    employmentTypeFilter = [],
    checkEmploymentType,
    salaryRangesList = [],
    updateSalaryRangeRadio,
    salaryRange = '',
  } = props

  const renderEmploymentTypeList = () => (
    <ul className="filter-unordered-list">
      {employmentTypesList?.map(eachItem => (
        <li className="filter-list-items" key={eachItem.employmentTypeId}>
          <input
            className="checkbox-input"
            type="checkbox"
            id={eachItem.employmentTypeId}
            value={eachItem.employmentTypeId}
            onChange={() => checkEmploymentType(eachItem.employmentTypeId)}
            checked={employmentTypeFilter.includes(eachItem.employmentTypeId)}
          />
          <label className="filter-label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  const renderSalaryRange = () => (
    <ul className="filter-unordered-list">
      {salaryRangesList?.map(eachSalary => (
        <li className="filter-list-items" key={eachSalary.salaryRangeId}>
          <input
            className="checkbox-input"
            name="salary"
            type="radio"
            id={eachSalary.salaryRangeId}
            value={eachSalary.salaryRangeId}
            onChange={() => updateSalaryRangeRadio(eachSalary.salaryRangeId)}
            checked={eachSalary.salaryRangeId === salaryRange}
          />
          <label className="filter-label" htmlFor={eachSalary.salaryRangeId}>
            {eachSalary.label}
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="employment-filter-main-bg-container">
      <>
        <h1 className="employment-type-title"> Type of Employment </h1>
        {renderEmploymentTypeList()}
      </>
      <hr className="separator" />
      <>
        <h1 className="employment-type-title"> Salary Range </h1>
        {renderSalaryRange()}
      </>
    </div>
  )
}

export default FilterJobSearch
