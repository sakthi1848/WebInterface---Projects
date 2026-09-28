import React, { useState } from "react";
import "./project1.css";

function Project1() {
  const [form, setForm] = useState({
    username: "",
    aadharName: "",
    pan: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    permanentAddress: "",
    currentAddress: "",
    city: "",
    state: "",
    pincode: "",
    photo: null
  });

  const [sameAddress, setSameAddress] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });

    setSuccess("");
  };

  const handleAddressCheck = (e) => {
    const checked = e.target.checked;

    setSameAddress(checked);

    if (checked) {
      setForm({
        ...form,
        currentAddress: form.permanentAddress
      });
    } else {
      setForm({
        ...form,
        currentAddress: ""
      });
    }
  };

  const handlePermanentAddress = (e) => {
    const value = e.target.value;

    setForm({
      ...form,
      permanentAddress: value,
      currentAddress: sameAddress ? value : form.currentAddress
    });

    setErrors({
      ...errors,
      permanentAddress: "",
      currentAddress: ""
    });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setForm({
        ...form,
        photo: null
      });
      return;
    }

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setErrors({
        ...errors,
        photo: "Only JPG, JPEG and PNG files are allowed"
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors({
        ...errors,
        photo: "Photo size must be less than 2 MB"
      });
      return;
    }

    setForm({
      ...form,
      photo: file
    });

    setErrors({
      ...errors,
      photo: ""
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.aadharName.trim()) {
      newErrors.aadharName = "Aadhaar name is required";
    }

    if (
      form.username.trim().toLowerCase() !==
      form.aadharName.trim().toLowerCase()
    ) {
      newErrors.aadharName =
        "Username and Aadhaar name must be the same";
    }

    if (!form.pan.trim()) {
      newErrors.pan = "PAN number is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan)) {
      newErrors.pan = "Enter valid PAN format";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+[0-9]{1,3}[0-9]{10}$/.test(form.phone)) {
      newErrors.phone =
        "Enter country code + 10 digit phone number";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$!%])[A-Za-z0-9@#$!%]{8,}$/.test(
        form.password
      )
    ) {
      newErrors.password =
        "Password must contain 8 characters, uppercase, lowercase, number and special character";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.permanentAddress.trim()) {
      newErrors.permanentAddress =
        "Permanent address is required";
    }

    if (!form.currentAddress.trim()) {
      newErrors.currentAddress =
        "Current address is required";
    }

    if (!form.photo) {
      newErrors.photo = "Photo is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSuccess("Form submitted successfully!");

      console.log("Submitted Data:", form);
    } else {
      setSuccess("");
    }
  };

  const handleClear = () => {
    setForm({
      username: "",
      aadharName: "",
      pan: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      permanentAddress: "",
      currentAddress: "",
      city: "",
      state: "",
      pincode: "",
      photo: null
    });

    setSameAddress(false);
    setErrors({});
    setSuccess("");

    document.getElementById("photo").value = "";
  };

  return (
    <div className="form-container">
      <h1>User Registration Form</h1>

      <form onSubmit={handleSubmit}>

        <label>
          Username <span>*</span>
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        <small>{errors.username}</small>

        <label>
          Aadhaar Name <span>*</span>
        </label>
        <input
          type="text"
          name="aadharName"
          value={form.aadharName}
          onChange={handleChange}
          placeholder="Enter name as per Aadhaar"
        />
        <small>{errors.aadharName}</small>

        <label>
          PAN Card Number <span>*</span>
        </label>
        <input
          type="text"
          name="pan"
          value={form.pan}
          onChange={(e) =>
            handleChange({
              target: {
                name: "pan",
                value: e.target.value.toUpperCase()
              }
            })
          }
          maxLength="10"
          placeholder="ABCDE1234F"
        />
        <small>{errors.pan}</small>

        <label>
          Phone Number <span>*</span>
        </label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          maxLength="14"
          placeholder="+919876543210"
        />
        <small>{errors.phone}</small>

        <label>
          Email <span>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
        <small>{errors.email}</small>

        <label>
          Password <span>*</span>
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <small>{errors.password}</small>

        <label>
          Confirm Password <span>*</span>
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
        />
        <small>{errors.confirmPassword}</small>

        <label>
          Permanent Address <span>*</span>
        </label>
        <textarea
          name="permanentAddress"
          value={form.permanentAddress}
          onChange={handlePermanentAddress}
          placeholder="Enter permanent address"
        ></textarea>
        <small>{errors.permanentAddress}</small>

        <div className="checkbox">
          <input
            type="checkbox"
            checked={sameAddress}
            onChange={handleAddressCheck}
          />
          <label>Same as Permanent Address</label>
        </div>

        <label>
          Current Address <span>*</span>
        </label>
        <textarea
          name="currentAddress"
          value={form.currentAddress}
          onChange={handleChange}
          placeholder="Enter current address"
        ></textarea>
        <small>{errors.currentAddress}</small>

        <label>City</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Enter city"
        />

        <label>State</label>
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="Enter state"
        />

        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          maxLength="6"
          placeholder="Enter pincode"
        />

        <label>
          Upload Photo <span>*</span>
        </label>
        <input
          id="photo"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handlePhoto}
        />
        <p className="hint">
          JPG / JPEG / PNG only, Maximum size: 2 MB
        </p>
        <small>{errors.photo}</small>

        <div className="buttons">
          <button type="submit" className="submit-btn">
            Submit
          </button>

          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        {success && (
          <p className="success">
            {success}
          </p>
        )}

      </form>
    </div>
  );
}

export default Project1;