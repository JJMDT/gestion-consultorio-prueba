import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import { getHistoriaClinica } from "../firebase";
import "./HistoriaClinica.css";

const HistoriaClinica = () => {
  const { id } = useParams<{ id: string }>();
  const [historia, setHistoria] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistoria = async () => {
      if (id) {
        const data = await getHistoriaClinica(id);
        setHistoria(data);
      }
    };
    fetchHistoria();
  }, [id]);

  return (
    <Container className="container">
      <div className="historia-header">
        <Typography variant="h4" component="h1">
          Historia Clínica del Paciente
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
          className="back-button"
        >
          ⬅ Volver al Dashboard
        </Button>
      </div>

      {historia.length === 0 ? (
        <Typography className="no-records" variant="h6">
          No hay registros de historia clínica.
        </Typography>
      ) : (
        <Table className="historia-table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header-h">Fecha</TableCell>
              <TableCell className="table-header-h">Motivo</TableCell>
              <TableCell className="table-header-h">Diagnóstico</TableCell>
              <TableCell className="table-header-h">Tratamiento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historia.map((consulta) => (
              <TableRow key={consulta.id} className="table-row">
                <TableCell className="table-cell fecha-cell">
                  {new Date(consulta.fecha?.seconds * 1000).toLocaleDateString()}
                </TableCell>
                <TableCell className="table-cell">{consulta.motivo}</TableCell>
                <TableCell className="table-cell">{consulta.diagnostico}</TableCell>
                <TableCell className="table-cell">{consulta.tratamiento}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default HistoriaClinica;
