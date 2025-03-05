import React, { useState } from "react";
import { addHistoriaClinica } from "../firebase";

interface AgregarHistoriaClinicaProps {
  pacienteId: string;
}

const AgregarHistoriaClinica: React.FC<AgregarHistoriaClinicaProps> = ({ pacienteId }) => {
  const [motivo, setMotivo] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleAgregarHistoria = async () => {
    if (!motivo || !diagnostico || !tratamiento) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await addHistoriaClinica(pacienteId, {
        motivo,
        diagnostico,
        tratamiento,
      });

      alert("Historia clínica añadida con éxito.");
      setMostrarModal(false);
      setMotivo("");
      setDiagnostico("");
      setTratamiento("");
    } catch (error) {
      console.error("Error al añadir historia clínica:", error);
    }
  };

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button onClick={() => setMostrarModal(true)}>➕ Agregar Consulta</button>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>Agregar Historia Clínica</h3>
            <input type="text" placeholder="Motivo de consulta" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
            <input type="text" placeholder="Diagnóstico" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
            <input type="text" placeholder="Tratamiento" value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} />
            <button onClick={handleAgregarHistoria}>Guardar</button>
            <button onClick={() => setMostrarModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgregarHistoriaClinica;
