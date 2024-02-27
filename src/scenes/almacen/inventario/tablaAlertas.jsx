import { useState } from "react";
import React, { useEffect } from "react"; 
import Table from "../../../components/Table";
import { fetchData } from "../../../hooks/api";

function TablaAlerta() {
const [data, setData] = useState([]);
const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://localhost:8000/api/sistemaSolit/almacenAlerta/"
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataAndFillTable();
  }, []);

  const columnas = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
    },
    {
      field: "nombre_producto",
      headerName: "Nombre producto",
      flex: 1.5,
    },
    {
      field: "stock_actual",
      headerName: "Stock actual",
      flex: 0.3,
    },
  ];
  return (
    
      <Table
        title="Productos abajo del stock minimo"
        subtitle="Tabla con los productos"
        rows={data}
        columns={columnas}
        height="75vh"
        
      />
  )
}
export default TablaAlerta  