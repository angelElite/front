import React, { useEffect } from "react";
import Table from "../../../components/Table";
import { IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modall from "../../../components/Modal";
import { Label, TextInput } from "flowbite-react";
import useFormulario from "../../../hooks/useFormulario";
import { fetchData, deleteData, putData, postData } from "../../../hooks/api";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function Almacen({ user }) {
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [modo, setModo] = useState("null");
  const [estatus, setEstatus] = useState();
  const [idProducto, setIdProdcuto] = useState();
  const [nombreProducto, setNombreProdcuto] = useState();
  const [data, setData] = useState([]);
  const { values, handleChange, handleSubmit } = useFormulario({
    id: "",
    nombre_producto_individual: "",
    status: true,
    codigo_barras: "",
    id_producto: "",
  });
  // const historial = async () => {
  //   const datos = {
  //     usuario: user.user.nombre_completo,
  //     accion: modo,
  //     tabla: "Productos Unitarios"
  //   };
  //   postData(
  //     datos,
  //     "http://127.0.0.1:8000/api/sistemaSolit/almacenHistoricoView/"
  //   );
  // };
  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://localhost:8000/api/sistemaSolit/almacenProductos_indiviaduales/"
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
    if (modo === "Editar") {
      try {
        await putData(
          `http://localhost:8000/api/sistemaSolit/almacenProductos_indiviaduales/${id}/`,
          values
        );
      //  historial();
      } catch (error) {
        console.log("error no se realizo la peticion")
      }
    } else if (modo === "Eliminar") {
      try {
        await deleteData(
          `http://localhost:8000/api/sistemaSolit/almacenProductos_indiviaduales/${id}/`
        );
    //    historial();
      } catch (error) {
        console.log("error no se realizo la peticion")

      } finally {
        await fetchDataAndFillTable();
      };
    } else if (modo === "Envio producto a merma") {
      try {
        await putData(
          `http://localhost:8000/api/sistemaSolit/almacenProductos_indiviaduales/${id}/`,
          {
            nombre_producto_individual: nombreProducto,
            status: estatus,
            id_producto: idProducto
          }
        );
      } catch (error) {
        console.error(
          `Error al actualizar producto individual con ID ${id}:`,
          error
        );
      }finally{
        fetchDataAndFillTable();
      }
      setOpenModal3(false);
    } else if (modo === "") setModo(null);
    setOpenModal(false);
    setOpenModal2(false);
    fetchDataAndFillTable();
  };

  const handleDecline = () => {
    // Perform actions when "Decline" is clicked
    setOpenModal(false);
    setOpenModal2(false);
    setOpenModal3(false);
  };
  const handleFormSubmit = (formData) => {
    // Lógica para manejar el envío del formulario
    console.log("Formulario enviado:", formData);
  };

  const columnaAccesorio = [
    {
      field: "actions",
      headerName: "Acciones",
      flex: .3,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              setOpenModal2(true);
              setModo("Eliminar");
              setId(params.row.id)
            }}
          >
            <AiOutlineClose />

          </IconButton>
          <IconButton
            onClick={() => {
              setId(params.row.id);
              setModo("Editar");
              setOpenModal(true);

              const itemToEdit = data.find((item) => item.id === params.row.id);
              if (itemToEdit) {
                // Asigna los datos al estado 'values'
                handleChange({
                  target: {
                    name: "nombre_producto_individual",
                    value: itemToEdit.nombre_producto_individual,
                  },
                });
                handleChange({
                  target: { name: "status", value: itemToEdit.status },
                });
                handleChange({
                  target: {
                    name: "codigoBarras",
                    value: itemToEdit.codigoBarras,
                  },
                });
                handleChange({
                  target: {
                    name: "id_producto",
                    value: itemToEdit.id_producto,
                  },
                });
              }
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setId(params.row.id);
              setModo("Envio producto a merma");
              setNombreProdcuto(params.row.nombre_producto_individual);
              setIdProdcuto(params.row.id_producto);
              setEstatus(false);
              setOpenModal3(true);
            }}

          >
            <DoNotDisturbOnIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      flex: .3,
    },
    {
      field: "nombre_producto_individual",
      headerName: "Nombre del producto",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Estatus",
      flex: .3,
    },
    {
      field: "codigo_barras",
      headerName: "Codigo de barras",
      flex: .5,
    },
    {
      field: "id_producto",
      headerName: "Identificador del producto",
      flex: .3,
    },

  ];

  return (
    <>
      <Table
        title="Almacen"
        subtitle="Producto unitario"
        rows={data}
        columns={columnaAccesorio}
        height="75vh"
      />
      <Modall
        title="Editar"
        content={
          <>
            <form onSubmit={(e) => handleSubmit(e, handleFormSubmit)}>
              <div className="mb-2 block">
                <Label
                  htmlFor="nombre_producto_individual"
                  value="Nombre del producto:"
                />
                <TextInput
                  required
                  type="text"
                  name="nombre_producto_individual"
                  value={values.nombre_producto_individual}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2 block">
                <Label htmlFor="status" value="Estatus:" />
                <TextInput
                  disabled
                  type="text"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2 block">
                <Label htmlFor="codigo_barras" value="Codigo de barras:" />
                <TextInput
                  required
                  type="text"
                  name="codigo_barras"
                  value={values.codigo_barras}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="id_producto" value="Identificar del producto:" />
                <TextInput

                  disabled
                  type="text"
                  name="id_producto"
                  value={values.id_producto}
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
                ¿Estas seguro de eliminar este producto con el indentificador?
                <p>¡Se desminuye en stock!</p>

              </h3>
              <h1 className="text-4xl font-normal">{id}</h1>
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
      <Modall
        title="Agregar producto a merma"
        content={
          <>
            <div className="text-center">
              <AiOutlineArrowDown className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estas seguro de enviar este producto a merma con el indentificador?

              </h3>
              <h1 className="text-4xl font-normal">{id}</h1>
            </div>
          </>
        }
        onAccept={handleAccept}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal3}
        openModal={openModal3}
        modo={modo}
        zise="md"
      />

    </>
  );
}

export default Almacen;
