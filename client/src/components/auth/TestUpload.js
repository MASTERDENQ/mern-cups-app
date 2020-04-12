import React from "react";

const Test = () => {
  // var body = new FormData();

  // axios
  //   .post("/testdb/add_customer", body)
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  return (
    <div>
      <form
        action="/add_menu_item"
        method="POST"
        encType="multipart/form-data"
        href="#"
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
  );
};

export default Test;
