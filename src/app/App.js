import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "../styles/index.css";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

import { useAuth } from "../context/authContext";
import UserAdmin from "../pages/UserAdmin";

const App = () => {

  const { userPrefs } = useAuth();

  const [selectedZones, setSelectedZones] = useState([]);
  const [publicHolidays, setPublicHolidays] = useState(true);

  useEffect( () => {
    if (userPrefs) {
      setSelectedZones(userPrefs.zones || []);
      setPublicHolidays(userPrefs.public_holidays ?? true);
    }
  }, [userPrefs])

  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
          <Home
            selectedZones={selectedZones}
            setSelectedZones={setSelectedZones}
            publicHolidays={publicHolidays}
            setPublicHolidays={setPublicHolidays}
          />          
          </ProtectedRoute>}          
        />
        <Route path="/admin" element={
          <ProtectedRoute>
            <UserAdmin />
          </ProtectedRoute>}
        />        
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </div>
    </Router>
  );
};

export default App;