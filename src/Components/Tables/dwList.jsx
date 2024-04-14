import React, { useEffect, useState } from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import StandardPage from "../PageLayout/standardPage";
import { useNavigate } from "react-router-dom";

function SetDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function DwList() {
  const navigate = useNavigate();
  const [dailyWorksheets, setDailyWorksheets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editingWorksheet, setEditingWorksheet] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/entities/dailyWorksheet")
      .then((response) => response.json())
      .then((data) => {
        console.log("Daily Worksheets from API:", data);
        setDailyWorksheets(data);
      })
      .catch((error) => console.error("Error fetching Daily Worksheets:", error));
  }, []);

  const handleEdit = (dailyWorksheet) => {
    setIsEditing(true);
    setEditingWorksheet(dailyWorksheet);
    navigate("/DW", { state: { isEditing: true, editingDW: dailyWorksheet } });
  };

  const handleDelete = async (dailyWorksheet) => {
    try {
      let url = `http://localhost:3001/entities/dailyWorksheet/${dailyWorksheet.id}`;
      await fetch(url, {
        method: "DELETE",
        headers,
      });
      alert("Daily Worksheet deleted successfully");
      const updatedDailyWorksheets = dailyWorksheets.filter((dw) => dw.id !== dailyWorksheet.id);
      setDailyWorksheets(updatedDailyWorksheets);
    } catch (err) {
      console.error("Error deleting Daily Worksheet:", err);
    }
    console.log("Deleted Daily Worksheet ID:", dailyWorksheet.id); 
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWorksheets = dailyWorksheets.filter(
    (worksheet) =>
      worksheet.jobNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StandardPage>
      <Container>
        <Row className="mb-3">
          <Col xs={6}>
            <Form.Control
              type="text"
              placeholder="Search by Job Number"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            <Button variant="primary" style={{ backgroundColor: "#003366" }} onClick={() => navigate("/DW")}>
              New DW
            </Button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job Number</th>
            <th>Date</th>
            <th>Team Leader</th>
            <th>Contract Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorksheets.map((dailyWorksheet) => (
            <tr key={dailyWorksheet.id}>
              <td>{dailyWorksheet.jobNumber}</td>
              <td>{SetDate(dailyWorksheet.date)}</td>
              <td>{dailyWorksheet.teamLeader}</td>
              <td>{dailyWorksheet.contractType}</td>
              <td>
                <Button
                  variant="outline-primary"
                  style={{ margin: '5px' }}
                  onClick={() => handleEdit(dailyWorksheet)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(dailyWorksheet)}
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

export default DwList;
