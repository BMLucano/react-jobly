import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/**CompanyCard: display info about a single company
 *
 * State:
 * -None
 *
 * Props:
 * -companyData: an object of job data {handle, name, description, logoUrl}
 *
 * CompanyList -> companyCard
 */

function CompanyCard({ companyData }) {
  console.debug("CompanyCard companyData=", companyData)

  const { name, description, logoUrl, handle } = companyData;

  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
      <h6 className="card-title">
          {name}
          {logoUrl && <img src={logoUrl}
            alt={name}
            className="float-end ms-5" />}
        </h6>
        <p><small>{description}</small></p>
        {/* <h3>{name}</h3>
        <p>{description}</p>
        {logoUrl !== null &&
          <img
            src={logoUrl}
            alt={name}/>

        } */}
      </div>
    </Link>
  );
}

export default CompanyCard;