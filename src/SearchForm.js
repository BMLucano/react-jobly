import React, { useState, useEffect, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";
import "./SearchForm.css";

/**SearchForm: form for handling search input.
 *
 * State:
 * -searchTerm: string
 *
 * Props:
 * -handleSearch: function that calls parent on submit
 *
 * JobList -> SearchForm
 */

function SearchForm({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Handle updates from form input. */
  function handleChange(evt) {
    const result = evt.target.value;
    setSearchTerm(result);

    debouncedHandleSearch(result);
  }

  const debouncedHandleSearch = debounce(handleSearch, 500);


  return (
    <div className="SearchForm mb-4 mt-4">
      <form>
        <div className="row justify-content-center gx-0">
          <div className="col-8">
            <input
              className="form-control form-control-lg"
              type="text"
              name="search"
              placeholder="Enter search term.."
              value={searchTerm}
              onChange={handleChange}>
            </input>
          </div>
        </div>
      </form>
    </div>
  );

}

export default SearchForm;