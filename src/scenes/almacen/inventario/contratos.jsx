import React, { useEffect } from "react";
import Table from "../../../components/Table";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Modall from "../../../components/Modal";
import { Label, TextInput, FileInput } from "flowbite-react";
import useFormulario from "../../../hooks/useFormulario";
import { fetchData } from "../../../hooks/api";
import FindInPageIcon from '@mui/icons-material/FindInPage';

function Contratos() {
  const [id, setId] = useState(null);
  const [openModal2, setOpenModal2] = useState(false);
  const [modo, setModo] = useState("null");

  const { values, handleChange, handleSubmit } = useFormulario({
    fecha_instalacion: "",
    telefono_cliente: "",
    nombre_cliente: "",
    tipo_servicio: "",
    nombre_instalador: "",
    direccion_cliente: "",
    observaciones: "",
    archivo: null,
  });
  const [selectedFile, setselectedFile] = useState(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setselectedFile(file);
  };
  const [data, setData] = useState([]);
  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://localhost:8000/api/sistemaSolit/almacenMaterialInstalacion/"
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataAndFillTable();
  }, []);
  const handleAccept = async (modo) => {
    if (modo === "Guardar") {
      const formData = new FormData();
      formData.append("fecha_instalacion", values.fecha_instalacion);
      formData.append("telefono_cliente", values.telefono_cliente);
      formData.append("nombre_cliente", values.nombre_cliente);
      formData.append("tipo_servicio", values.tipo_servicio);
      formData.append("nombre_instalador", values.nombre_instalador);
      fetch(
        `http://localhost:8000/api/sistemaSolit/almacenMaterialInstalacion/${id}/`,
        {
          method: "PUT",
          body: formData,
        }
      );
    }
    setModo("null");
    setOpenModal2(false);
    
  };

  const handleDecline = () => {
    setOpenModal2(false);
  };
  const handleFormSubmit = (formData) => {
    // Lógica para manejar el envío del formulario
    console.log("Formulario enviado:", formData);
  };

  const columnaAccesorio = [
    {
      field: "actions",
      headerName: "Actions",
      flex: .8,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              setId(params.row.id);
              setModo("Guardar");
              setOpenModal2(true);
              const itemToEdit = data.find((item) => item.id === params.row.id);
              if (itemToEdit) {
                handleChange({
                  target: {
                    name: "fecha_instalacion",
                    value: itemToEdit.fecha_instalacion,
                  },
                });
                handleChange({
                  target: {
                    name: "telefono_cliente",
                    value: itemToEdit.telefono_cliente,
                  },
                });
                handleChange({
                  target: {
                    name: "nombre_cliente",
                    value: itemToEdit.nombre_cliente,
                  },
                });
                handleChange({
                  target: {
                    name: "tipo_servicio",
                    value: itemToEdit.tipo_servicio,
                  },
                });
                handleChange({
                  target: {
                    name: "nombre_instalador",
                    value: itemToEdit.nombre_instalador,
                  },
                });
              }
            }}
          >
            <EditIcon />
          </IconButton>
          <Link to={`/almacen/contratosEchos/contratoAdmin/${params.row.id}`}>
            <IconButton>
              <FindInPageIcon />
            </IconButton>
          </Link>
        </div>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "fecha_instalacion",
      headerName: "Fecha de instalacion",
      flex: 0.5,
    },
    {
      field: "telefono_cliente",
      headerName: "Telefono del cliente",
      flex: 0.7,
    },
    {
      field: "nombre_cliente",
      headerName: "Nombre del cliente",
      flex: 1,
    },
    {
      field: "tipo_servicio",
      headerName: "Tipo de servicio",
      flex: 0.5,
    },
    {
      field: "nombre_instalador",
      headerName: "Instalador",
      flex: .5,
    },
    {
      field: "direccion_cliente",
      headerName: "Direccion cliente",
      flex: 1,
    },
    {
      field: "observaciones",
      headerName: "observaciones",
      flex: 1.5,
    }
  ];

  return (
    <>
      <Table
        title="Contratos"
        subtitle="Contratos creados "
        rows={data}
        columns={columnaAccesorio}
        height="75vh"
        button={<></>}
      />


      <Modall
        title="Editar"
        content={
          <>
            <form onSubmit={(e) => handleSubmit(e, handleFormSubmit)}>
              <div>
                <Label htmlFor="fecha_instalacion" value="Fecha instalacion:" />
                <TextInput
                  required
                  type="text"
                  name="fecha_instalacion"
                  value={values.fecha_instalacion}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="telefono_cliente" value="Telefono cliente:" />
                <TextInput
                  required
                  type="text"
                  name="telefono_cliente"
                  value={values.telefono_cliente}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="nombre_cliente" value="Nombre del cliente:" />
                <TextInput
                  required
                  type="text"
                  name="nombre_cliente"
                  value={values.nombre_cliente}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="tipo_servicio" value="Tipo servicio:" />
                <TextInput
                  required
                  type="text"
                  name="tipo_servicio"
                  value={values.tipo_servicio}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <Label htmlFor="nombre_instalador" value="Nombre instalador:" />
                <TextInput
                  required
                  type="text"
                  name="nombre_instalador"
                  value={values.nombre_instalador}
                  onChange={handleChange}
                />
              </div>
            </form>
          </>
        }
        onAccept={handleAccept}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal2}
        openModal={openModal2}
        modo={modo}
        zise="md"
      />

    </>
  );
}

export default Contratos;
