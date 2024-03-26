import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";


/** Display signup form.
 *
 * State:
 * - formData = {username, password, firstName, lastName, email}
 * - formErrors = ["error message"]
 *
 * Props:
 *  - signup() : call App to sign up user
 *
 * RoutesList -> SignupForm
 */


function SignupForm({ signup }) {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  /** handles input changes and updates state of formData */

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(curr => ({
      ...curr,
      [name]: value
    }
    ));
  }

  /** handles submit. Calls signup function in App and
   * updates state of formData to intial state
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      setFormData(initialState);
      navigate("/");
    } catch (err) {
      console.log("error in handleSubmit", err);
      setFormErrors(err);
    }

  }

  console.log("FormErrors:", formErrors);

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <h2 className="mb-3">Sign Up</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="Signup-username">
                Username:
              </label>
              <input
                className="form-control"
                id="Signup-username"
                name="username"
                value={formData.username}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Signup-password">
                Password:
              </label>
              <input
                className="form-control"
                id="Signup-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Signup-firstName">
                First Name:
              </label>
              <input
                className="form-control"
                id="Signup-firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Signup-lastName">
                Last Name:
              </label>
              <input
                className="form-control"
                id="Signup-lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Signup-email">
                Email:
              </label>
              <input
                className="form-control"
                id="Signup-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}>
              </input>
            </div>
            {formErrors.length > 0 && <div><b>{formErrors}</b></div>}
            <button className="btn btn-primary">Submit</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;