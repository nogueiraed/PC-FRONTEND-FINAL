//App.js

import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "./Context/GlobalContext";
import MenuPage from "./pages/MenuPage";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import RegDW from "./pages/DW";
import AuthenticationService from "./Services/authenticationService";
import DailyWorksheetList from "./pages/DwList";
import FormDailyWorksheet from "./forms/FormDailyWorksheet"

const authenticationService = new AuthenticationService();

function App() {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticationService.isAuthenticated()) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/DW" element={<RegDW />} />
      <Route path="/DwList" element={<DailyWorksheetList />} />
      <Route path="/FormDailyWorksheet" element={<FormDailyWorksheet />} />
      <Route path="/" element={<MenuPage />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
