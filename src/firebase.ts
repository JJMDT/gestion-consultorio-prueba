import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAdIjMOqhMJCc7ckI0P0iCRxUQfk2PXCU",
  authDomain: "consultorio-c5ea3.firebaseapp.com",
  projectId: "consultorio-c5ea3",
  storageBucket: "consultorio-c5ea3.appspot.com", // 🔹 Corregido el error aquí
  messagingSenderId: "690693023443",
  appId: "1:690693023443:web:04f2c0ada8585ce9201626"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/**
 * Agregar un nuevo paciente a Firestore
 */
export const addPaciente = async (pacienteData: {
  nombre: string;
  edad: number;
  dni: string;
  apellido?: string;
  email?: string;
  telefono?: string;
}) => {
  try {
    const pacientesRef = collection(db, "pacientes");
    const docRef = await addDoc(pacientesRef, {
      ...pacienteData,
      createdAt: new Date()
    });
    console.log("Paciente agregado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al añadir paciente:", error);
    throw error;
  }
};

/**
 * Agregar una historia clínica a un paciente en Firestore
 */
export const addHistoriaClinica = async (
  pacienteId: string,
  historiaData: {
    motivo: string;
    diagnostico: string;
    tratamiento: string;
    fecha?: Date;
  }
) => {
  if (!pacienteId) {
    console.error("El ID del paciente es obligatorio.");
    return;
  }

  try {
    const historiaRef = collection(db, `pacientes/${pacienteId}/historia_clinica`);
    await addDoc(historiaRef, {
      ...historiaData,
      fecha: historiaData.fecha || new Date()
    });
    console.log(`Historia clínica añadida para el paciente ${pacienteId}`);
  } catch (error) {
    console.error("Error al añadir historia clínica:", error);
    throw error;
  }
};

export const getHistoriaClinica = async (pacienteId: string) => {
  try {
    const historiaRef = collection(db, `pacientes/${pacienteId}/historia_clinica`);
    const querySnapshot = await getDocs(historiaRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error al obtener historia clínica:", error);
    return [];
  }
};
