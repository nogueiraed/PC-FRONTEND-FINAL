import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function JaForm(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const url = "http://localhost:3001/Entities/jobApplication";
  const isEditing = props.location?.state?.isEditing;
  const editingJA = props.location?.state?.editingJA || {};

  function saveJobApplication(jobApplication) {
    let requestUrl = url;
    let method = "POST";
  
    if (isEditing) {
      requestUrl = `${url}/${jobApplication.id}`;
      method = "PUT";
    }
    fetch(requestUrl, {
      method: method,
      headers,
      body: JSON.stringify(jobApplication),
    })
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error("Failed to save job application. Please try again later.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        alert("Job application saved successfully");
        navigate("/JaList");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message);
      });
  }
  

  const [validated, setValidated] = useState(false);

  const [jobApplication, setJobApplication] = useState({
    id: editingJA.id || "",
    jobNumber: "",
    fullName: "", 
    phoneNumber: "", 
    emailAddress: "", 
    dob: "", 
    streetAddress: "", 
    city: "", 
    postCode: "", 
    visaStatus: "", 
    documentType: "", 
    documentNumber: "", 
    driverLicense: "", 
    jobPosition: "", 
    ppe: "", 
    siteSafe: "",
  });

  function handleOnSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-NZ');
      setJobApplication({ ...jobApplication, jobApplicationDate: formattedDate });

      saveJobApplication(jobApplication);
      setJobApplication({
        id: "",
        jobNumber: "",
        fullName: "", 
        phoneNumber: "", 
        emailAddress: "", 
        dob: "", 
        streetAddress: "", 
        city: "", 
        postCode: "", 
        visaStatus: "", 
        documentType: "", 
        documentNumber: "", 
        driverLicense: "", 
        jobPosition: "", 
        ppe: "", 
        siteSafe: "",
      });
      setValidated(false);
    } else {
      setValidated(true);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  useEffect(() => {
    if (isEditing && Object.keys(editingJA).length !== 0) {
      const formattedDate = new Date(editingJA.jobApplicationDate).toLocaleDateString('en-NZ');
      setJobApplication(prevState => ({
        ...prevState,
        ...editingJA,
        jobApplicationDate: formattedDate,
      }));
    }
  }, [isEditing, editingJA]);
  

  return (
    <Container>
      <br />
      <h1 className="text-center">Job Application Form</h1>
      <br />

      <Form
        method="post"
        noValidate
        validated={validated}
        onSubmit={handleOnSubmit}
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="fullName"
              value={jobApplication.fullName}
              onChange={(e) => setJobApplication({ ...jobApplication, fullName: e.target.value })}
              placeholder="Enter full name"
            />
            <Form.Control.Feedback type="invalid">
              Please enter full name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              type="text"
              name="phoneNumber"
              value={jobApplication.phoneNumber}
              onChange={(e) => setJobApplication({ ...jobApplication, phoneNumber: e.target.value })}
              placeholder="Enter phone number"
            />
            <Form.Control.Feedback type="invalid">
              Please enter phone number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              name="emailAddress"
              value={jobApplication.emailAddress}
              onChange={(e) => setJobApplication({ ...jobApplication, emailAddress: e.target.value })}
              placeholder="Enter email address"
            />
            <Form.Control.Feedback type="invalid">
              Please enter email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              required
              type="date"
              name="dob"
              value={jobApplication.dob}
              onChange={(e) => setJobApplication({ ...jobApplication, dob: e.target.value })}
              placeholder="Enter date of birth"
            />
            <Form.Control.Feedback type="invalid">
              Please enter date of birth.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              required
              type="text"
              name="streetAddress"
              value={jobApplication.streetAddress}
              onChange={(e) => setJobApplication({ ...jobApplication, streetAddress: e.target.value })}
              placeholder="Enter street address"
            />
            <Form.Control.Feedback type="invalid">
              Please enter street address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              type="text"
              name="City"
              value={jobApplication.city}
              onChange={(e) => setJobApplication({ ...jobApplication, city: e.target.value })}
              placeholder="Enter city"
            />
            <Form.Control.Feedback type="invalid">
              Please enter city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Post Code</Form.Label>
            <Form.Control
              required
              type="text"
              name="postCode"
              value={jobApplication.postCode}
              onChange={(e) => setJobApplication({ ...jobApplication, postCode: e.target.value })}
              placeholder="Enter post code"
            />
            <Form.Control.Feedback type="invalid">
              Please enter post code.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Visa Status</Form.Label>
            <Form.Control
              required
              as="select"
              name="visaStatus"
              value={jobApplication.visaStatus}
              onChange={(e) => setJobApplication({ ...jobApplication, visaStatus: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="NZ Citzen">NZ Citzen</option>
              <option value="NZ Resident">NZ Resident</option>
              <option value="Work Visa">Work Visa</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Visitor Visa">Visitor Visa</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select visa status.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Document Type</Form.Label>
            <Form.Control
              required
              as="select"
              name="documentType"
              value={jobApplication.documentType}
              onChange={(e) => setJobApplication({ ...jobApplication, documentType: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="NZ Birth Certificate">NZ Birth Certificate</option>
              <option value="Passport">Passport - NZ/foreign</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select document type.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Document Number</Form.Label>
            <Form.Control
              required
              type="text"
              name="documentNumber"
              value={jobApplication.documentNumber}
              onChange={(e) => setJobApplication({ ...jobApplication, documentNumber: e.target.value })}
              placeholder="Enter document number"
            />
            <Form.Control.Feedback type="invalid">
              Please enter document number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Driver License</Form.Label>
            <Form.Control
              required
              as="select"
              name="driverLicense"
              value={jobApplication.driverLicense}
              onChange={(e) => setJobApplication({ ...jobApplication, driverLicense: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="NZ Full Driver License">NZ Full License</option>
              <option value="NZ Full Restrict License">NZ Restrict License</option>
              <option value="NZ Full Learn License">NZ Learn License</option>
              <option value="International Full Driver License">International Full License</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select driver license.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Job Positon</Form.Label>
            <Form.Control
              required
              as="select"
              name="jobPosition"
              value={jobApplication.jobPosition}
              onChange={(e) => setJobApplication({ ...jobApplication, jobPosition: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="Commercial Cleaner">Commercial Cleaner</option>
              <option value="Construction Cleaner">Construction Cleaner</option>
              <option value="Casual Cleaner">Casual Cleaner</option>
              <option value="Team Leader">Team Leader</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Administration Support">Administration Support</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select position.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>PPE</Form.Label>
            <Form.Control
              required
              as="select"
              name="ppe"
              value={jobApplication.ppe}
              onChange={(e) => setJobApplication({ ...jobApplication, ppe: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="Full PPE">Full PPE</option>
              <option value="Partial PPE">Partial PPE</option>
              <option value="No PPE">No PPE</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select PPE.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Valid Site Safe</Form.Label>
            <Form.Control
              required
              as="select"
              name="siteSafe"
              value={jobApplication.siteSafe}
              onChange={(e) => setJobApplication({ ...jobApplication, siteSafe: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select Site Safe.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="d-flex justify-content-start">
          <Button variant="success" type="submit" className="me-2">
            {isEditing ? "Save Changes" : "Register"}
          </Button>
          <Button variant="primary" onClick={() => navigate("/JaList")}>
            Back
          </Button>
        </div>
      </Form>
      <br />
    </Container>
  );
}
