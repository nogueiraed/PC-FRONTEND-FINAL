import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./Components/Context/GlobalContext";
import AuthenticationService from "./Components/Services/authenticationService";
import Page404 from "./Components/Pages/page404";
import Home from "./Components/Pages/home";
import Login from "./Components/Pages/login";
import DwPage from "./Components/Pages/dwPage";
import DwList from "./Components/Tables/dwList";
import JaPage from "./Components/Pages/jaPage";
import JaList from "./Components/Tables/jaList"

const authenticationService = new AuthenticationService();

function App() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticationService.isAuthenticated()) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/DW" element={<DwPage />} />
      <Route path="/DwList" element={<DwList />} />
      <Route path="/JA" element={<JaPage />} />
      <Route path="/JaList" element={<JaList />} />
    </Routes>
  );
}

export default App;
