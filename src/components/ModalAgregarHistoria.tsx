import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";
import { addHistoriaClinica } from "../firebase";

interface ModalAgregarHistoriaProps {
  open: boolean;
  onClose: () => void;
  pacienteId: string;
}

const ModalAgregarHistoria: React.FC<ModalAgregarHistoriaProps> = ({ open, onClose, pacienteId }) => {
  const [motivo, setMotivo] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamiento, setTratamiento] = useState("");

  const handleGuardarHistoria = async () => {
    if (!motivo || !diagnostico || !tratamiento) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await addHistoriaClinica(pacienteId, { motivo, diagnostico, tratamiento });
      alert("Historia clínica añadida con éxito.");
      onClose();
      setMotivo("");
      setDiagnostico("");
      setTratamiento("");
    } catch (error) {
      console.error("Error al agregar historia clínica:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Historia Clínica</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
        <TextField fullWidth margin="dense" label="Diagnóstico" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
        <TextField fullWidth margin="dense" label="Tratamiento" value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleGuardarHistoria}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAgregarHistoria;
