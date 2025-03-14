import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/ContactForm.css";
import contact from "../data/contact.json";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    message: "",
    volunteerInterest: false,
  });
  const [status, setStatus] = useState("");

  // Check if all required fields are filled
  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.contact.trim() !== "" &&
    formData.message.trim() !== "";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setStatus("Please fill all required fields.");
      hideStatusAfterDelay();
      return;
    }

    const serviceId = contact["EmailJS Service ID"];
    const templateId = contact["EmailJS Template ID"];
    const publicKey = contact["EmailJS Public Key"];

    const emailParams = {
      centerName: contact["Center Name"],
      toEmail: contact["Leader or Center Email"],
      name: formData.fullName,
      email: formData.email,
      contact: formData.contact,
      message: formData.message,
      interest: formData.volunteerInterest ? "YESS! :)" : "Not this time :(",
    };

    emailjs
      .send(serviceId, templateId, emailParams, publicKey)
      .then(() => {
        setStatus("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          contact: "",
          message: "",
          volunteerInterest: false,
        });
      })
      .catch(() => {
        setStatus("Failed to send message.");
      });

    hideStatusAfterDelay();
  };

  const hideStatusAfterDelay = () => {
    setTimeout(() => {
      setStatus("");
    }, 5000);
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Got a question? Fill out this quick form, and we'll get back to you!</h2>
      <div className="FormandPicArt">
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="fullName" className="Formlabel">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="Formlabel">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact" className="Formlabel">
            Contact Number
          </label>
          <input
            type="text"
            name="contact"
            placeholder="1234567890"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <label htmlFor="message" className="Formlabel">
            Message
          </label>
          <textarea
            name="message"
            placeholder="Does U&I provide its own curriculum and resources?"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="volunteerInterest"
              name="volunteerInterest"
              checked={formData.volunteerInterest}
              onChange={handleChange}
            />
            <label htmlFor="volunteerInterest">Show your interest to join us!</label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid} // Disable if form is incomplete
            style={{
              backgroundColor: isFormValid ? "#ffda1b" : "#2d2d2d",
              color: isFormValid ? "#000" : "#fff",
              cursor: isFormValid ? "pointer" : "not-allowed",
            }}
          >
            Submit
          </button>
        </form>
        <img src="/assets/ContactForm/image1.png" width={"300px"} alt="Contact Illustration" />
      </div>
      {status && <p className="status-message">{status}</p>}
    </section>
  );
};

export default ContactForm;
