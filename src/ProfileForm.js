import React, { useState, useContext } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import "./ProfileForm.css"


/** Edit Profile Form.
 *
 * State:
 * - formData: {username, password, firstName, lastName, email}
 * - formErrors = ["error message"]
 *
 *
 * Props:
 * - editProfile() : function to call in Parent
 *
 * Context:
 * - currUser
 *
 * RoutesList -> ProfileForm
 */

function ProfileForm({ editProfile }) {
  const { currUser } = useContext(userContext);
  const user = currUser.user;

  const [formData, setFormData] = useState(user);
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

    /** handles submit. Calls editProfile function in App and
   * updates state of formData to intial state
   */
  //TODO:give success message instead of navigating home
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await editProfile(formData);
      setFormData(user);
      navigate("/")
    } catch (err){
      setFormErrors(err);
    }
  }

  return (
    <div className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="ProfileForm-username">
                Username:
              </label>
              <input
                className="form-control"
                id="ProfileForm-username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled>
              </input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="ProfileForm-firstName">
                First Name:
              </label>
              <input
                className="form-control"
                id="ProfileForm-firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="ProfileForm-lastName">
                Last Name:
              </label>
              <input
                className="form-control"
                id="ProfileForm-lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}>
              </input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="ProfileForm-email">
                Email:
              </label>
              <input
                className="form-control"
                id="ProfileForm-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}>
              </input>
            </div>
            {formErrors.length > 0 && <div><b>{formErrors}</b></div>}
            <button className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default ProfileForm;