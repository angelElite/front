import React, { useEffect } from "react";
import Table from "../../../components/Table";
import { useState } from "react";
import { fetchData, deleteData, putData } from "../../../hooks/api";
import { IconButton } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import Modall from "../../../components/Modal";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import useFormulario from "../../../hooks/useFormulario";
import EditIcon from "@mui/icons-material/Edit";
import { Label, TextInput } from "flowbite-react";
function Historial() {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [data, setData] = useState([]);
  const [id, setID] = useState(null);
  const [modo, setModo] = useState("");
  const {values, handleChange, handleSubmit  } = useFormulario({
    id: "",
    codigo_barras: "",
    nombre_producto: "",
    nombre_solicitante: "",
    uso: "",
  });
  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://localhost:8000/api/sistemaSolit/almacenHistoricoView/"
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
    if (modo === "Eliminar") {
      try {
        await deleteData(
          `http://127.0.0.1:8000/api/sistemaSolit/almacenHistoricoView/${id}/`
        );
        setModo(null);
      } catch (error) {
        console.log("error no se realizo la peticion")
      } finally {
        fetchDataAndFillTable();
        setOpenModal(false);
      };
    }else if (modo === "Editar") {
      try {
        await putData(
          `http://localhost:8000/api/sistemaSolit/almacenHistoricoView/${id}/`,
          values
        );
      } catch (error) {
        console.log("error no se realizo la peticion")
      }finally{
        fetchDataAndFillTable();
      }
  }
  setModo(null);
}
  const handleDecline = () => {
    setOpenModal(false);
    setOpenModal2(false);
  }
  const columnaAccesorio = [
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              setOpenModal(true);
              setID(params.row.id)
              setModo("Eliminar");
            }}>
            <AiOutlineClose />
          </IconButton>
          <IconButton
            onClick={() => {
              setID(params.row.id);
              setModo("Editar");
              setOpenModal2(true);
              const itemToEdit = data.find((item) => item.id === params.row.id);
              if (itemToEdit) {
                handleChange({
                  target: {
                    name: "codigo_barras",
                    value: itemToEdit.codigo_barras,
                  },
                });
                handleChange({
                  target: { name:"nombre_producto", value: itemToEdit.nombre_producto },
                });
                handleChange({
                  target: {
                    name:"nombre_solicitante",
                    value: itemToEdit.nombre_solicitante,
                  },
                });
                handleChange({
                  target: {
                    name: "uso",
                    value: itemToEdit.uso,
                  },
                });
              }
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      flex: .5,
    },
    {
      field: "nombre_producto",
      headerName: "Nombre del producto",
      flex: 1,
    },
    {
      field: "codigo_barras",
      headerName: "Codigo de barras",
      flex: 1,
    },
    {
      field: "uso",
      headerName: "Uso",
      flex: 1,
    },
    {
      field: "historial",
      headerName: "Fecha / Nombre del solicitante",
      flex: 1,
      renderCell: (params) => (
        <div>
          {params.row.historial.histora[0].fecha ? (
            <div>
              <div>
                {params.row.historial.histora[0].fecha}
              </div>
              <div>
                {params.row.historial.histora[0].nombre_solicitante}
              </div>
            </div>
          ) :
            <div>
              No tiene datos
            </div>
          }
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        title="Historial"
        subtitle="Acciones que hacen todos los usuarios"
        rows={data}
        columns={columnaAccesorio}
        height="75vh"
      />
      <Modall
        title="Eliminar"
        content={
          <>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estas seguro de eliminar este producto con el indentificador?

              </h3>
              <h1 className="text-3xl font-normal">{id}</h1>
            </div>
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
        title="Editar"
        content={
          <>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-2 block">
                <Label
                  htmlFor=""
                  value="Nombre del producto:"
                />
                <TextInput
                  disabled
                  type="text"
                  name="nombre_producto"
                  value={values.nombre_producto}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="codigo_barras" value="Codigo de barras:" />
                <TextInput
                  disabled
                  type="text"
                  name="codigo_barras"
                  value={values.codigo_barras}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="" value="Uso:"/>
                <TextInput
                  type="text"
                  name="uso"
                  value={values.uso}
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
export default Historial;