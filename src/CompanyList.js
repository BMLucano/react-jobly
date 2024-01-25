import React, { useState, useEffect, useCallback } from "react";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";
import debounce from "lodash/debounce";

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
  console.log("CompaniesDats length", searchTerm)


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
  //component rerendered after setSearchTerm was called.
  //our searchForm unmounted becuase isLoading was set to true, then remounted with initial searchTerm state

  // const safeHandleSearch = useCallback(handleSearch);
  // if(companiesData.isLoading) return  <p>Loading...</p>;

  return (
    <div className="CompanyList">
      <SearchForm handleSearch={handleSearch} />
      {companiesData.isLoading && <p>Loading...</p>};
      {/* <ul>
        {companiesData.data.map(c =>
          <li key={c.handle}>
            <CompanyCard companyData={c} />
          </li>
        )
        }
      </ul> */}
      {!companiesData.isLoading && <ul>
        {companiesData.data.map(c =>
          <li key={c.handle}>
            <CompanyCard companyData={c} />
          </li>
        )
        }
      </ul>}
    </div>
  );
}

export default CompanyList;