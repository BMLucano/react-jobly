import React, { useState, useEffect, useCallback } from "react";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";

/** CompanyList - list all companies
 *
 * State:
 * - companiesData
 * [{handle, name, description, numEmployees, logo_Url}, ...]
 *
 * Props:
 *
 * RouteList -> CompanyList -> {CompanyCard, SearchForm}
 */

function CompanyList() {
  const [companiesData, setCompaniesData] = useState({
    data: null,
    isLoading: true
  });
  const [searchTerm, setSearchTerm] = useState("");

  /** useEffect:
   * - fetch data for all companies after initial render.
   * - fetch all companies matching search term if search term exists
  */

  useEffect(function fetchCompaniesOnSearchTermChange() {
    async function fetchCompanies() {
      const resp = await JoblyApi.getAllCompanies(searchTerm);
      setCompaniesData({
        data: resp,
        isLoading: false
      });
    }
    fetchCompanies();
  }, [searchTerm]);

  /** Updates search term from searchForm
   * Resets companies data to initial state
   */
  function handleSearch(term) {
    setSearchTerm(term);
    setCompaniesData({
      data: null,
      isLoading: true
    });
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm handleSearch={handleSearch} />
      {companiesData.isLoading
        ? <p>Loading...</p>
        : <ul>
          {companiesData.data.map(c =>
            <CompanyCard
              key={c.handle}
              companyData={c}
            />
          )
          }
        </ul>}
    </div>
  );
}

export default CompanyList;