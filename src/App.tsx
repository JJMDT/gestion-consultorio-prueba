import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HistoriaClinica from "./components/HistoriaClinica";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/historia/:id" element={<HistoriaClinica />} />
      </Routes>
    </Router>
  );
}

export default App;
