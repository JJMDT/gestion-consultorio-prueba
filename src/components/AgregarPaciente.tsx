import { useState } from "react";
import { addPaciente, addHistoriaClinica } from "../firebase";

const AgregarPaciente = () => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [dni, setDni] = useState("");

  const handleAgregarPaciente = async () => {
    if (!nombre || !edad || !dni) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const pacienteId = await addPaciente({
        nombre,
        edad: Number(edad),
        dni
      });

      // 🔹 Agregar una historia clínica de prueba al nuevo paciente
      await addHistoriaClinica(pacienteId, {
        motivo: "Consulta general",
        diagnostico: "N/A",
        tratamiento: "N/A"
      });

      alert(`Paciente y primera historia clínica agregados.`);
    } catch (error) {
      console.error("Error al agregar paciente:", error);
    }
  };

  return (
    <div>
      <h3>Agregar Paciente</h3>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} />
      <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} />
      <button onClick={handleAgregarPaciente}>Guardar</button>
    </div>
  );
};

export default AgregarPaciente;
