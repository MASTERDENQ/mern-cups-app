// import React, { Component } from "react";
// import { NavLink } from "reactstrap";

// class Logout extends Component {
//   render() {
//     return (
//       <div>
//         <NavLink href="/">Logout</NavLink>
//       </div>
//     );
//   }
// }

// export default Logout;

import React from "react";
import { NavLink } from "reactstrap";

function Logout({ label }) {
  return (
    <div data-testid="logout">
      <NavLink href="/">{label}</NavLink>
    </div>
  );
}

export default Logout;
