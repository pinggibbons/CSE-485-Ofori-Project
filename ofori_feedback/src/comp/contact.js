import React, { useState } from "react";
import "./contact.css";
const Contact = () => {
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });
  let name, value;
  console.log(userData);
  const data = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const send = async (e) => {
    const { Name, Email, Subject, Message } = userData;
    e.preventDefault();
    const option = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Name,
        Email,
        Subject,
        Message,
      }),
    };
    const res = await fetch(
      "https://ofori-feedback-react-default-rtdb.firebaseio.com/Messages.json",
      option
    );
    console.log(res);
    if (res) {
      alert("Message Sent");
      window.location.reload();
    }
  };
  return (
    <>
      <div className="container">
        <h1>Ofori Feedback</h1>
        <p>We'd love to hear from you! Please fill out the form below.</p>
        <div className="contact_box">
          <form method="POST">
            <input
              type="text"
              name="Name"
              value={userData.Name}
              placeholder="Enter Your Full Name"
              autoComplete="off"
              onChange={data}
            ></input>
            <input
              type="email"
              name="Email"
              value={userData.Email}
              placeholder="Enter Your E-mail"
              autoComplete="off"
              onChange={data}
            ></input>
            <input
              type="text"
              name="Subject"
              value={userData.Subject}
              placeholder="Subject Of Message"
              autoComplete="off"
              onChange={data}
            ></input>
            <textarea
              value={userData.Message}
              name="Message"
              placeholder="Your Message"
              autoComplete="off"
              onChange={data}
            ></textarea>
            <button onClick={send}>Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
