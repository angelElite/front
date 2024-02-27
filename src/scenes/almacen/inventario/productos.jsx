import React, { useEffect } from "react";
import Table from "../../../components/Table";
import { IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modall from "../../../components/Modal";
import { Label, TextInput, FileInput, Tooltip, Button } from "flowbite-react";
import useFormulario from "../../../hooks/useFormulario";
import { postData, fetchData, deleteData, putData } from "../../../hooks/api";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Box } from "@mui/material";
import { AiOutlineArrowUp } from "react-icons/ai";

function Productos({ user }) {
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [producto, setProducto] = useState("");
  const [modo, setModo] = useState(null);
  const { values, handleChange, handleSubmit } = useFormulario({
    nombre_producto: "",
    codigo_barras: "",
    marca: "",
    modelo: "",
    stock: null,
    observaciones: "",
    fecha_ingreso: null,
    unidad_medida: "",
    empresa: "",
    proveedor: "",
    zona: "",
    stock_minimo: null,
  });
  const [valorMerma, setValorMerma] = useState("");
  const [data, setData] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleDecline = () => {
    setOpenModal(false);
    setOpenModal1(false);
    setOpenModal2(false);
    setOpenModal3(false);
    setOpenModal4(false);
  };

  // const historial = async () => {
  //   const datos = {
  //     usuario: user.user.nombre_completo,
  //     accion: modo,
  //     tabla: "Productos"
  //   };
  //   postData(
  //     datos,
  //     "http://127.0.0.1:8000/api/sistemaSolit/almacenHistoricoView/"
  //   );
  // };
  const handleInputChange = (event) => {
    setValorMerma(event.target.value);
  };
  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://127.0.0.1:8000/api/sistemaSolit/almacenProdcutos/"
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
      await putData(
        `http://127.0.0.1:8000/api/sistemaSolit/almacenProdcutos/${id}/`,
        values
      );
    //  historial();
    } else if (modo === "Importar") {
      const formData = new FormData();
      formData.append("pdf_file", selectedFile);
      try {
        const response = await fetch(
          "http://localhost:8000/api/sistemaSolit/upload-pdf/",
          {
            method: "POST",
            body: formData,
          }
        );
       // historial();
      } catch (error) {
        console.log("error al importar", error)
      }finally{
        fetchDataAndFillTable();
      }
    } else if (modo === "Eliminar") {
      try {
        // Elimina el accesorio
        deleteData(
          `http://127.0.0.1:8000/api/sistemaSolit/almacenProdcutos/${id}/`
        );
      //  historial();
      } catch (error) {
        console.error("Error deleting data:", error);
      }finally{
        await fetchDataAndFillTable();
      }
    }
    setId(null);
    setModo(null);
    setOpenModal(false);
    setOpenModal1(false);
    setOpenModal2(false);
    setOpenModal3(false);
    fetchDataAndFillTable();
  };

  const subirProducto = (modo) => {
    if (modo === "Envio de producto al instalador") {
      postData(
        {
          nombre: producto,
        },
        `http://localhost:8000/api/sistemaSolit/almacenProductosTecnico/`
      );
     // historial();
      setOpenModal4(false);
    } else if (modo === "Envio de producto al fusionador") {
      postData(
        {
          nombre: producto,
        },
        `http://localhost:8000/api/sistemaSolit/almacenProductosFucionador/`
      );
     // historial();
      setOpenModal4(false);
    }
  };

  const handleFormSubmit = (formData) => {
    // Lógica para manejar el envío del formulario
    console.log("Formulario enviado:", formData);
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
              setModo("Eliminar");
              setId(params.row.id);
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
                    name: "nombre_producto",
                    value: itemToEdit.nombre_producto,
                  },
                });
                handleChange({
                  target: {
                    name: "codigo_barras",
                    value: itemToEdit.codigo_barras,
                  },
                });
                handleChange({
                  target: { name: "marca", value: itemToEdit.marca },
                });
                handleChange({
                  target: { name: "modelo", value: itemToEdit.modelo },
                });
                handleChange({
                  target: { name: "stock", value: itemToEdit.stock },
                });
                handleChange({
                  target: {
                    name: "stock_minimo",
                    value: itemToEdit.stock_minimo,
                  },
                });
                handleChange({
                  target: {
                    name: "observaciones",
                    value: itemToEdit.observaciones,
                  },
                });
                handleChange({
                  target: {
                    name: "fecha_ingreso",
                    value: itemToEdit.fecha_ingreso,
                  },
                });
                handleChange({
                  target: {
                    name: "unidad_medida",
                    value: itemToEdit.unidad_medida,
                  },
                });
                handleChange({
                  target: { name: "empresa", value: itemToEdit.empresa },
                });
                handleChange({
                  target: { name: "proveedor", value: itemToEdit.proveedor },
                });
                handleChange({
                  target: { name: "zona", value: itemToEdit.zona },
                });
              }
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              setOpenModal4(true);
              setProducto(params.row.nombre_producto);
              setModo("Envio de producto al fusionador");

            }}
          >
            <CloseFullscreenIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              setOpenModal4(true);
              setProducto(params.row.nombre_producto);
              setModo("Envio de producto al instalador");
            }}
          >
            <PsychologyIcon />
          </IconButton>
        </div>
      ),
    },
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
      field: "marca",
      headerName: "Marca",
      flex: 0.3,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.5,
    },
    {
      field: "observaciones",
      headerName: "Observaciones",
      flex: 1,
    },
    {
      field: "fecha_ingreso",
      headerName: "Fecha ingreso",
      flex: 0.5,
    },

    {
      field: "unidad_medida",
      headerName: "Unidad medida",
      flex: 0.5,
    },
    {
      field: "proveedor",
      headerName: "Proveedor",
      flex: 1,
    },

    {
      field: "zona",
      headerName: "Zona",
      flex: 1,
    },
    {
      field: "stock_minimo",
      headerName: "Limite",
      flex: 0.1,
    },
    {
      field: "empresa",
      headerName: "Empresa",
      flex: 0.5,
    },


  ];

  return (
    <>
      <>
        <Box display="flex" justifyContent="end" p={2}>
          <Button
            color="purple"
            onClick={() => {
              setOpenModal2(true);
              setModo("Importar");
            }}
          >
            <ContentPasteSearchIcon className="mr-2 h-5 w-5" />
            Importar Pedido
          </Button>
        </Box>
      </>
      <Table
        title="Productos"
        subtitle="En este apartado podras ver todos los productos"
        rows={data}
        columns={columnaAccesorio}
        height="75vh"
      />

      <Modall
        title="Editar"
        content={
          <>
            <form onSubmit={(e) => handleSubmit(e, handleFormSubmit)}>
              <div>
                <Label htmlFor="nombre_producto" value="Nombre producto:" />
                <TextInput
                  required
                  type="text"
                  name="nombre_producto"
                  value={values.nombre_producto}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="marca" value="Marca:" />
                <TextInput
                  required
                  type="text"
                  name="marca"
                  value={values.marca}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="modelo" value="Modelo:" />
                <TextInput
                  required
                  type="text"
                  name="modelo"
                  value={values.modelo}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="stock" value="Stock:" />
                <TextInput
                  disabled
                  type="number"
                  name="stock"
                  value={values.stock}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="observaciones" value="Observaciones:" />
                <TextInput
                  required
                  type="text"
                  name="observaciones"
                  value={values.observaciones}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="unidad_medida" value="Unidad medida:" />
                <TextInput
                  required
                  type="text"
                  name="unidad_medida"
                  value={values.unidad_medida}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="proveedor" value="Proveedor:" />
                <TextInput
                  required
                  type="text"
                  name="proveedor"
                  value={values.proveedor}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="zona" value="Zona:" />
                <TextInput
                  required
                  type="text"
                  name="zona"
                  value={values.zona}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="stock_minimo" value="Limite:" />
                <TextInput
                  required
                  type="number"
                  name="stock_minimo"
                  value={values.stock_minimo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="empresa" value="Empresa:" />
                <TextInput
                  required
                  type="text"
                  name="empresa"
                  value={values.empresa}
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
        title="Crear merma"
        content={
          <>
            <div>
              <Label htmlFor="Cantidad a merma" value="Cantida a merma" />
              <TextInput
                required
                type="number"
                name="merma"
                value={valorMerma}
                onChange={handleInputChange}
              />
            </div>
          </>
        }
        onAccept={handleAccept}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal1}
        openModal={openModal1}
        modo={modo}
        zise="md"
      />
      <Modall
        title="Subir Documento"
        content={
          <>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Seleciona un archivo PDF:" />
              </div>
              <FileInput id="file-upload" onChange={handleFileUpload} />
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
        setOpenModalProp={setOpenModal3}
        openModal={openModal3}
        modo={modo}
        zise="md"
      />
      <Modall
        title={<>{modo}</>}
        content={
          <>
            <div className="text-center">
              <AiOutlineArrowUp className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estas seguro de agregar este producto?
              </h3>
            </div>
          </>
        }
        onAccept={subirProducto}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal4}
        openModal={openModal4}
        modo={modo}
        zise="md"
      />
    </>
  );
}

export default Productos;
