import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:3001";

class AuthenticationService {
  async auth(userName, password) {
    const response = await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userName, password }),
    });

    let data = await response.json();
    let token = data.token;
    console.log("AuthenticationResponse:", data);
    console.log("Authentication Response:", token);

    if (response.ok) {
      localStorage.setItem("token", token);
      return jwtDecode(data.token);
    } else {
      localStorage.setItem("error", data);
      console.error("Authentication failed. Server response:", data);
    }
  }

  isAuthenticated = () => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      const decodedToken = jwtDecode(token);
      const actualTime = Date.now() / 1000;
      if (decodedToken.exp < actualTime) {
        return false;
      }
      return true;
    }
    return false;
  };
}

export default AuthenticationService;
