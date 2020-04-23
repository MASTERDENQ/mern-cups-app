import React from "react";

const Test = (props) => {
  return (
    <div>
      <div>
        <form
          action="/add_customer"
          method="POST"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="First Name"
          />

          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
          />

          <input
            type="email"
            name="email_address"
            id="email_address"
            placeholder="Email Address"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />

          <input name="file" id="file" type="file" />

          <input
            type="submit"
            value="Submit"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default Test;
