import React, { useEffect, useState } from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import StandardPage from "../PageLayout/standardPage";
import { useNavigate } from "react-router-dom";



function JaList() {
  const navigate = useNavigate();
  const [jobApplications, setJobApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };


  useEffect(() => {
    fetch("http://localhost:3001/entities/jobApplication")
      .then((response) => response.json())
      .then((data) => {
        console.log("Job Application from API:", data);
        setJobApplications(data);
      })
      .catch((error) => console.error("Error fetching Job Applications:", error));
  }, []);

  const handleDelete = async (jobApplication) => {
    try {
      let url = `http://localhost:3001/entities/jobApplication/${jobApplication.id}`;
      await fetch(url, {
        method: "DELETE",
        headers,
      });
      alert("Job application deleted successfully");
      const updatedJobApplications = jobApplications.filter((ja) => ja.id !== jobApplication.id);
      setJobApplications(updatedJobApplications);
    } catch (err) {
      console.error("Error deleting job application:", err);
    }
    console.log("Deleted job applicationID:", jobApplication.id); 
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobApplications = jobApplications.filter(
    (application) =>
      application.jobPosition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StandardPage>
      <Container>
        <Row className="mb-3">
          <Col xs={6}>
            <Form.Control
              type="text"
              placeholder="Search by Job Position"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            <Button variant="primary" style={{ backgroundColor: "#003366" }} onClick={() => navigate("/JA")}>
              New JA
            </Button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job Position</th>
            <th>Visa Status</th>
            <th>Full Name</th>
            <th>DOB</th>
            <th>PPE</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobApplications.map((jobApplication) => (
            <tr key={jobApplication.id}>
              <td>{jobApplication.jobPosition}</td>
              <td>{jobApplication.visaStatus}</td>
              <td>{jobApplication.fullName}</td>
              <td>{new Date(jobApplication.dob).toLocaleDateString('en-NZ')}</td>
              <td>{jobApplication.ppe}</td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(jobApplication)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StandardPage>
  );
}

export default JaList;
