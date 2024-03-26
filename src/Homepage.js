import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "./userContext";
import "./Homepage.css";

/** Renders Homepage with a simple welcome message.
 *
 * State:
 * - None
 *
 * Props:
 * - None
 *
 * Context:
 * - currUser
 * - isLoggedIn
 *
 * RoutesList -> Homepage
 */

function Homepage() {
  const { currUser, isLoggedIn } = useContext(userContext);


  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 fw-bold">Jobly</h1>
        <h3 className="lead">All the jobs in one, convenient place.</h3>
        {currUser && <h1>{`Welcome ${currUser.user.firstName}`}</h1>}

      {!isLoggedIn &&
        <p>
          <Link className="btn btn-primary fw-bold me-3"
            to="/login">
            Login
          </Link>
          <Link className="btn btn-primary fw-bold"
            to="/signup">
            Sign up
          </Link>
        </p>
      }
      </div>
    </div>
  );
}

export default Homepage;;