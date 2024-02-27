import React, { useEffect } from "react";
import Table from "../../../components/Table";
import { IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modall from "../../../components/Modal";
import { Label, TextInput, Card } from "flowbite-react";
import useFormulario from "../../../hooks/useFormulario";
import { fetchData, deleteData, putData } from "../../../hooks/api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import PostAddIcon from "@mui/icons-material/PostAdd";
import { AiOutlineArrowUp } from "react-icons/ai";

  
function Merma() {
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [modo, setModo] = useState("null");
  const [data, setData] = useState([]);
  const [productos2, setProductos2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [falla, setFalla] = useState(null);
  const [fecha, setFecha] = useState(null);
  //const [status, setStatus] = useState(null);
  const [id_producto, setIdProducto] = useState(null);
  
  const { values, handleChange, handleSubmit } = useFormulario({
    id: "",
    falla_descripcion: "",
    fecha_entrada: null,
    status: null,
    id_producto_individual: null,
  });
  

  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://127.0.0.1:8000/api/sistemaSolit/almacenMerma/"
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const consultaProductoId = async (id) => {
      const envio = await fetchData(
        `http://127.0.0.1:8000/api/sistemaSolit/almacenProductos_indiviaduales/${id}/`
      );
      setLoading(envio.id_producto);
  }
  
  const segundoEnvio = async () => {
    setOpenModal2(false);
    
      
      const result = await fetchData(
        `http://127.0.0.1:8000/api/sistemaSolit/almacenProdcutos/${loading}/`
      );
      setProductos2(result);
      setOpenModal1(true);
    }      

  useEffect(() => {
    fetchDataAndFillTable();
  }, []);

  const handleAccept = async (modo) => {
  if (modo === "eliminar"){
    try {
      // Elimina la merma //
      await deleteData(
        `http://localhost:8000/api/sistemaSolit/almacenMerma/${id}/`
      );
      //Cierra el modal//  
      setOpenModal3(false);
      //actualiza la tabla//
      await fetchDataAndFillTable();

    } catch (error) {
      console.error("Error deleting data:", error);
    
  };


  } else if (modo === "editar") {
      await putData(
        `http://localhost:8000/api/sistemaSolit/almacenMerma/${id}/`,
        values
      );
    } else if (modo === "") setModo("null");
    setOpenModal(false);
    fetchDataAndFillTable();
  };

  const handleDecline = () => {
    // Perform actions when "Decline" is clicked
    setOpenModal(false);
    setOpenModal1(false);
    setOpenModal2(false);
    setOpenModal3(false);
    setOpenModal4(false);
  };
  const handleFormSubmit = (formData) => {
    // Lógica para manejar el envío del formulario
    console.log("Formulario enviado:", formData);
  };
  const cambiarEstadoProductoIndividualMerma = async () => {
    try {
      await putData(
        `http://localhost:8000/api/sistemaSolit/almacenMerma/${id}/`,
        {
          falla_descripcion: falla,
          fecha_entrada: fecha,
          status: 0,
          id_producto_individual: id_producto
        }
      );
      
    } catch (error) {
      console.error(
        `Error al actualizar producto individual con ID ${id}:`,
        error
      );
    }finally{
      setOpenModal4(false);
      fetchDataAndFillTable();
    }
  };
  const columnaAccesorio = [
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              setOpenModal3(true);
              setModo("eliminar");
              setId(params.row.id)
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setId(params.row.id);
              setModo("editar");
              setOpenModal(true);

              const itemToEdit = data.find((item) => item.id === params.row.id);
              if (itemToEdit) {
                // Asigna los datos al estado 'values'

                handleChange({
                  target: {
                    name: "falla_descripcion",
                    value: itemToEdit.falla_descripcion,
                  },
                });
                handleChange({
                  target: {
                    name: "fecha_entrada",
                    value: itemToEdit.fecha_entrada,
                  },
                });
                handleChange({
                  target: { name: "status", value: itemToEdit.status },
                });
                handleChange({
                  target: {
                    name: "id_producto_individual",
                    value: itemToEdit.id_producto_individual,
                  },
                });
              }
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={ () => {
              consultaProductoId(params.row.id_producto_individual);
              setOpenModal2(true);
              setModo("detalles");

            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setId(params.row.id);
              setFalla(params.row.falla_descripcion);
              setFecha(params.row.fecha_entrada);
              setIdProducto(params.row.id_producto_individual);
              setOpenModal4(true);
            }}
          >
            <PostAddIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    {
      field: "falla_descripcion",
      headerName: "Descripcion de la falla",
      flex: 1,
    },
    {
      field: "fecha_entrada",
      headerName: "Fecha entrada",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Estatus",
      flex: 1,
    },
    {
      field: "id_producto_individual",
      headerName: "Identificador producto individual",
      flex: 1,
    },

  ];
  return (
    <>
      <Table
        title="Merma"
        subtitle="Productos defectuosos"
        rows={data}
        columns={columnaAccesorio}
        height="75vh"
      />
      <Modall
        title="Editar"
        content={
          <>
            <form
              onSubmit={(e) => handleSubmit(e, handleFormSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="mb-2 block">
                <Label
                  htmlFor="falla_descripcion"
                  value="Descripcion de la falla:"
                />
                <TextInput
                  required
                  type="text"
                  name="falla_descripcion"
                  value={values.falla_descripcion}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 block">
                <Label
                  htmlFor="id_producto"
                  value="Identificador producto individual:"
                />
                <TextInput
                  disabled
                  type="text"
                  name="falla_descripcion"
                  value={values.id_producto_individual}
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
        title="Datos del producto"
        content={(
            <>
              <Card>
                {Object.entries(productos2).map(([clave, valor]) => (
                  <>
                    <div className="flex flex-row">
                      <div class="basis-1/4">
                        <Label htmlFor="nombre_producto" value={clave} />
                      </div>
                      <div class="basis-3/4">
                        <Label value={valor} />
                      </div>
                    </div>
                  </>
                ))}
              </Card>
            </>
          )}
          onAccept={handleDecline}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal}
        openModal={openModal1}
        modo={modo}
        size="2xl"
      />
      <Modall
        title="Eliminar"
        content={
          <>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Deseas eliminar este registro?
            </h3>
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
      <Modall
        title="Detalles del producto"
        content={
          <>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Deseas ver las caracteristicas del producto?
            </h3>
          </div>
          </>
        }
        onAccept={segundoEnvio}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal2}
        openModal={openModal2}
        modo={modo}
        zise="md"
      />
      <Modall
        title="Regresar a productos individuales"
        content={
          <>
          <div className="text-center">
            <AiOutlineArrowUp className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Deseas regresar este producto a productos individuales?
            </h3>
          </div>
          </>
        }
        onAccept={cambiarEstadoProductoIndividualMerma}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal4}
        openModal={openModal4}
        modo={modo}
        zise="md"
      />
    </>
  );
}

export default Merma;
