import React, { useEffect } from "react";
import Table from "../../../components/Table";
import { IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modall from "../../../components/Modal";
import Button from "@mui/material/Button";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Label, TextInput, FileInput } from "flowbite-react";
import useFormulario from "../../../hooks/useFormulario";
import { postData, fetchData, deleteData, putData } from "../../../hooks/api";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { tokens } from "../../../theme";

function Historial() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [modo, setModo] = useState(null);
  const {values, handleChange, handleSubmit } = useFormulario({
    fecha: "",
    productos: "",
    status: "",
    nombre_usuario: "",
  });
  const [data, setData] = useState([]);
  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://localhost:8000/api/sistemaSolit/almacenContratoFucionador/"
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataAndFillTable();
  }, []);
  console.log(values);
  const handleAccept = async () => {
    if (modo === "Eliminar") {
      try {
        await deleteData(
          `http://localhost:8000/api/sistemaSolit/almacenContratoFucionador/${id}/`
        );
        setOpenModal2(false);
      } catch (error) {
        console.error("Error deleting data:", error);
      } finally {
        await fetchDataAndFillTable();
      }
    } else if (modo === "Editar") {
      try {
        await putData(
          `http://localhost:8000/api/sistemaSolit/almacenContratoFucionador/${id}/`,
          values
        );
      } catch (error) {
        console.error("Error deleting data:", error);
      } finally {
        await fetchDataAndFillTable();
      }
    };
  }

  const handleDecline = () => {
    setOpenModal(false);
    setOpenModal2(false);
  };


  const columnaAccesorio = [
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              setId(params.row.id);
              setModo("Eliminar");
              setOpenModal2(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setId(params.row.id);
              setModo("Editar");
              setOpenModal(true);

              const itemToEdit = data.find((item) => item.id === params.row.id);
              if (itemToEdit) {
                handleChange({
                  target: {
                    name: "nombre_usuario",
                    value: itemToEdit.nombre_usuario,
                  },
                });
                handleChange({
                  target: { name: "productos", value: itemToEdit.productos },
                });
                handleChange({
                  target: { name: "status", value: itemToEdit.status },
                });
                handleChange({
                  target: { name: "fecha", value: itemToEdit.fecha },
                });
              }
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton>
            <PictureAsPdfIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "id",
      headerName: "id",
      flex: .5,
    },
    {
      field: "nombre_usuario",
      headerName: "Usuario",
      flex: 1,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      flex: 1,
    },
    {
      field: "productos",
      headerName: "Material",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
    },
  ];

  return (
    <>
      <Table
        title="Cartas de responsabilidad "
        subtitle=""
        rows={data}
        columns={columnaAccesorio}
        height="75vh"
      />
      <Modall
        title="Editar"
        content={
          <>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <Label htmlFor="nombre" value="Nombre del usuario:" />
                <TextInput
                  required
                  type="text"
                  name="nombre_usuario"
                  value={values.nombre_usuario}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="descricion" value="Productos:" />
                <TextInput
                  required
                  name="productos"
                  type="text"
                  value={values.productos}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="fecha" value="fecha:" />
                <TextInput
                  required
                  type="text"
                  name="fecha"
                  value={values.fecha}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="status" value="Estatus:" />
                <TextInput
                  required
                  type="text"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                />
              </div>
            </form>
          </>
        }
        onAccept={handleAccept}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal}
        openModal={openModal}
        modo={modo}
        zise="md"
      />
      <Modall
        title="Eliminar"
        content={
          <>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estas seguro de eliminar?
              </h3>
            </div>
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

export default Historial;
