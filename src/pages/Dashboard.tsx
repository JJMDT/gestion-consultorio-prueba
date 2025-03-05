import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import ModalCrearPaciente from "../components/ModalCrearPaciente";
import ModalAgregarHistoria from "../components/ModalAgregarHistoria";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./Dashboard.css";


const Dashboard = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [filtro, setFiltro] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHistoriaOpen, setModalHistoriaOpen] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    try {
      const pacientesRef = collection(db, "pacientes");
      const querySnapshot = await getDocs(pacientesRef);
      const pacientesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPacientes(pacientesData);
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
    }
  };

  const handleAbrirModalHistoria = (pacienteId: string) => {
    setPacienteSeleccionado(pacienteId);
    setModalHistoriaOpen(true);
  };

  const pacientesFiltrados = pacientes.filter(pac => 
    pac.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Container className="container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="controls-container">
        
        <TextField 
          label="Buscar por nombre"
          variant="outlined"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="search-field"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setModalOpen(true)}
          className="accion-button "
        >
          ➕ Nuevo Paciente
        </Button>
      </div>

      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell className="table-header">Nombre</TableCell>
            <TableCell className="table-header">Edad</TableCell>
            <TableCell className="table-header">DNI</TableCell>
            <TableCell className="table-header" align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pacientesFiltrados.map((pac) => (
            <TableRow key={pac.id}>
              <TableCell>{pac.nombre}</TableCell>
              <TableCell>{pac.edad}</TableCell>
              <TableCell>{pac.dni}</TableCell>
              <TableCell align="center" className="actions-cell">
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => handleAbrirModalHistoria(pac.id)}
                  className="action-button"
                >
                  ➕ Nueva Consulta
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => navigate(`/historia/${pac.id}`)}
                  className="action-button"
                >
                  📋 Ver Historia
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalCrearPaciente open={modalOpen} onClose={() => setModalOpen(false)} recargar={cargarPacientes} />

      {pacienteSeleccionado && (
        <ModalAgregarHistoria 
          open={modalHistoriaOpen} 
          onClose={() => setModalHistoriaOpen(false)} 
          pacienteId={pacienteSeleccionado}
        />
      )}
    </Container>
  );
};

export default Dashboard;
