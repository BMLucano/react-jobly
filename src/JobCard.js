import React from "react";
import "./JobCard.css";

/**JobCard: display info about a single job
 *
 * State:
 * -None
 *
 * Props:
 * -job: an object of job data {id, title, salary, equity, companyName}
 *
 * JobCardList -> JobCard
 */

function JobCard({ job }) {
  const { title, salary, equity, companyName } = job;

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        {companyName !== undefined && <p>{companyName}</p>}
        <p>Salary: {"$" + Intl.NumberFormat("en-US").format(salary)}</p>
        <p>Equity: {equity}</p>
      </div>
    </div>
  );
}

export default JobCard;