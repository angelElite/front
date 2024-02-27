import React, { useState, useEffect } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { fetchData } from '../../../hooks/api';
function Alerta() {
  const [data, setData] = useState(null);
  const [showAlert, setShowAlert] = useState(true);

  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://localhost:8000/api/sistemaSolit/almacenAlerta/"
      );

      // Verificar si la respuesta es un arreglo vacío
      if (Array.isArray(result) && result.length === 0) {
        setShowAlert(true);  // Mostrar el alert de productos vacíos
        setData(null);  // Establecer data a null para que el mensaje sea adecuado
      } else {
        setShowAlert(true);  // Mostrar el alert de productos
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowAlert(true);  // Mostrar el alert de error
      setData(null);
    }
  };

  useEffect(() => {
    fetchDataAndFillTable();
  }, []);

  const handleDismiss = () => {
    setShowAlert(false);
  };

  // Determinar el color del Alert basado en la existencia de datos
  const alertColor = data ? 'failure' : 'success';

  // Mostrar el Alert solo si showAlert es tru
  return showAlert ? (
    <Alert color={alertColor} onDismiss={handleDismiss} icon={HiInformationCircle}>
      {data ? (
        <span className="font-medium">Tienes productos en peligro minimo de stock</span>
      ) : (
        <span className="font-medium">{Array.isArray(data) ? '' : 'No hay productos en peligro de stock minimo'}</span>
      )}
    </Alert>
  ) : null;
}

export default Alerta;

