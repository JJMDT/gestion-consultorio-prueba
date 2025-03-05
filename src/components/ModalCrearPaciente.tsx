import { useState } from "react";
import { addPaciente } from "../firebase";
import { Modal, Box, TextField, Button } from "@mui/material";

const ModalCrearPaciente = ({
  open,
  onClose,
  recargar,
}: {
  open: boolean;
  onClose: () => void;
  recargar: () => void;
}) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [dni, setDni] = useState("");
  

  const handleGuardar = async () => {
    if (!nombre || !edad || !dni)
      return alert("Completa todos los campos");
    await addPaciente({ nombre, edad: Number(edad), dni });
    recargar();
    onClose();
    setNombre("");
    setEdad("");
    setDni("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          p: 4,
          backgroundColor: "white",
          margin: "auto",
          mt: 10,
          borderRadius: 2,
        }}
      >
        <h2>Nuevo Paciente</h2>
        <TextField
          fullWidth
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          margin="normal"
          type="number"
        />
        <TextField
          fullWidth
          label="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleGuardar}
          sx={{ mt: 2 }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCrearPaciente;
