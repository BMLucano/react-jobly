import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";

/** Company Details: display details of this company.
 *
 * Params:
 * /:handle
 *
 * State:
 * - companyInfo
 * {handle, name, description, numEmployees, logo_Url}
 *
 * Props:
 * - None
 *
 * RoutesList -> CompanyDetails -> JobCardList
 */

function CompanyDetails() {
  const [companyData, setCompanyData] = useState({
    data: null,
    isLoading: true,
    errors: null
  });
  //TODO:can destructure companyData here
  console.log("CompanyDetail state=", companyData);

  const { handle } = useParams();
  console.log("CompanyDetail handle", handle);

  /** useEffect: fetches company data that matches the handle given.
   * -if no matching handle, updates error in companyData
  */

  useEffect(function fetchCompanyDataOnMount() {
    async function fetchCompany() {
      try {
        const resp = await JoblyApi.getCompany(handle);
        setCompanyData({
          data: resp,
          isLoading: false,
          errors: null
        });
      } catch (err) {
        setCompanyData({
          data: null,
          isLoading: false,
          errors: err
        });
      }
    }
    fetchCompany();
  }, [handle]);

  if (companyData.isLoading === true) return <p>Loading...</p>;
  else if (companyData.errors) return <b>Oh no! {companyData.errors}</b>;

  return (
    <div className="CompanyDetails">
      <h3>{companyData.data.name}</h3>
      <p>{companyData.data.description}</p>
      <JobCardList jobData={companyData.data.jobs} />
    </div>
  );
}

export default CompanyDetails;