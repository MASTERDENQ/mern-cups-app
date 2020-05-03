import React from "react";
import { NavLink } from "reactstrap";
import PropType from "prop-types";

/**
 * Funtional Component used to logout the user and rdirect user to the home page.
 *
 * @component
 *
 * @param {string} param1 label that will be rendered in navbar
 * @return {string} label passed as a Navigation link to home page
 * @example
 * label = "Sign out"
 *
 * return (
 *    <Logout label={label} />
 * );
 *
 */

function Logout({ label }) {
  return (
    <div data-testid="logout">
      <NavLink href="/">{label}</NavLink>
    </div>
  );
}

Logout.propType = {
  label: PropType.string,
};

export default Logout;
