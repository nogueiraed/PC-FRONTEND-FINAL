import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Layout from "../template/Layout";
import { useNavigate } from "react-router-dom";

function formatarData(dateString) {
  const data = new Date(dateString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function DailyWorksheetList() {
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
    console.log("Data being passed for editing:", dailyWorksheet); // Adicionando um log para verificar os dados passados para edição
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
    console.log("Deleted Daily Worksheet ID:", dailyWorksheet.id); // Adicionar log para verificar o ID do Daily Worksheet excluído
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWorksheets = dailyWorksheets.filter(
    (worksheet) =>
      worksheet.jobNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Adicionando logs para depuração
  console.log("isEditing:", isEditing);
  console.log("editingWorksheet:", editingWorksheet);

  return (
    <Layout>
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Job Number"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
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
              <td>{formatarData(dailyWorksheet.date)}</td>
              <td>{dailyWorksheet.teamLeader}</td>
              <td>{dailyWorksheet.contractType}</td>
              <td>
                <Button
                  variant="outline-primary"
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
    </Layout>
  );
}

export default DailyWorksheetList;
