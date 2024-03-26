import React from "react";
import JobCard from "./JobCard";

/** JobCardList: create list of job cards
 *
 * State:
 * -None
 *
 * Props:
* - jobsData : an array of job data objects
 *  [{id, title, salary, equity, companyHandle, companyName}, ...]
 *
 * {JobList, CompanyDetails} -> JobCardList -> JobCard
*/

function JobCardList({ jobData }) {

  return (
    <div className="JobList col-md-8 offset-md-2">
      {jobData.map(job => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div >
  );
}

export default JobCardList;
