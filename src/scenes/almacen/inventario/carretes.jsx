import React, { useEffect } from "react";
import Table from "../../../components/Table";
import { IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modall from "../../../components/Modal";
import { Label, TextInput, Select, Card } from "flowbite-react";
import useFormulario from "../../../hooks/useFormulario";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { postData, fetchData, putData } from "../../../hooks/api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
function Carretes({user}) {
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [modo, setModo] = useState(null);
  const [data, setData] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState([]);

  const { values, handleChange, handleSubmit } = useFormulario({

    metraje_inicial: "",
    metraje_usado: "",
    id_producto_individual: "",
    id_usuario: null,
  });
  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://localhost:8000/api/sistemaSolit/almacenCarretes/"
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const historial = async () => {
  //   const datos = {
  //     usuario: user.user.nombre_completo,
  //     accion: modo,
  //     tabla: "Carretes"
  //   };
  //   postData(
  //     datos,
  //     "http://127.0.0.1:8000/api/sistemaSolit/almacenHistoricoView/"
  //   );
  // };
  const usuarios = async () => {
    try {
      const result = await fetchData(
        `http://127.0.0.1:8000/api/sistemaSolit/almacenUsuarios/`
      );
      setUsuario(result);
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
      setProductos(result);
      setOpenModal4(true);
  }      

  useEffect(() => {
    fetchDataAndFillTable();
 
  }, []);

  const handleAccept = async (modo) => {
    if (modo === "Editar") {
      try {
        await putData(
        `http://localhost:8000/api/sistemaSolit/almacenCarretes/${id}/`,
        values
      );
      // historial();
        }catch (error){
        console.log("Error no se proceso la peticion:", error);
        }finally{
          await fetchDataAndFillTable();
        }
        
    } else if (modo === "") setModo(null);
    setOpenModal(false);
    fetchDataAndFillTable();
    setUsuario([]);
  };

  const handleDecline = () => {
    // Perform actions when "Decline" is clicked
    setOpenModal(false);
    setOpenModal2(false);
    setOpenModal3(false);
    setOpenModal4(false);
    setUsuario([]);
  };
  const handleFormSubmit = (formData) => {
    // Lógica para manejar el envío del formulario
    console.log("Formulario enviado:", formData);
  };

  const columnaAccesorio = [
    {
      field: "actions",
      headerName: "Acciones",
      flex: .5,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              setId(params.row.id);
              setModo("Editar");
              setOpenModal(true);
              usuarios();
              const itemToEdit = data.find((item) => item.id === params.row.id);
              if (itemToEdit) {
                // Asigna los datos al estado 'values'
                handleChange({
                  target: {
                    name: "codigo_barras",
                    value: itemToEdit.codigo_barras,
                  },
                });

                handleChange({
                  target: {
                    name: "metraje_inicial",
                    value: itemToEdit.metraje_inicial,
                  },
                });
                handleChange({
                  target: {
                    name: "metraje_usado",
                    value: itemToEdit.metraje_usado,
                  },
                });
                handleChange({
                  target: {
                    name: "id_producto_individual",
                    value: itemToEdit.id_producto_individual,
                  },
                });
                handleChange({
                  target: { name: "id_usuario", value: itemToEdit.id_usuario },
                });
              }
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton>
       <RemoveRedEyeIcon
        onClick={() => {
          setOpenModal3(true);
          consultaProductoId(params.row.id_producto_individual);
          setModo("detalles");

        }}
       />
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
      field: "metraje_inicial",
      headerName: "Metraje",
      flex: .5,
    },
    {
      field: "metraje_usado",
      headerName: "Metraje usado",
      flex: .5,
    },
    {
      field: "id_producto_individual",
      headerName: "Identificador producto individual",
      flex: .5,
    },
    {
      field: "id_usuario",
      headerName: "usuario",
      flex: .5,
    },


  ];

  return (
    <>
      <Table
        title="Carretes"
        subtitle="Carretes"
        rows={data}
        columns={columnaAccesorio}
        height="75vh"
      />
      <Modall
        title="Editar"
        content={
          <>
            <form onSubmit={(e) => handleSubmit(e, handleFormSubmit)}>
              <div className="mb-3 block">
                <Label htmlFor="metraje_inicial" value="Metraje" />
                <TextInput
                  required
                  type="text"
                  name="metraje_inicial"
                  value={values.metraje_inicial}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 block">
                <Label htmlFor="metraje_usado" value="Metraje usado" />
                <TextInput
                  required
                  type="text"
                  name="metraje_usado"
                  value={values.metraje_usado}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 block">
                <Label
                  htmlFor="id_producto_individual"
                  value="Identificador producto individual"
                />
                <TextInput
                  disabled
                  type="text"
                  name="id_producto_individual"
                  value={values.id_producto_individual}
                  onChange={handleChange}
                />
              </div>
              <Label value="Asignar usuario:" />
              <div className="mb-3 block" class="columns-2">
                <Select id="productos" name="id_usuario" onChange={handleChange}>
                  {usuario.map((producto) => (
                    <option key={producto.id} value={producto.id}> {producto.nombre_completo}</option>
                  ))}
                </Select>
                <TextInput
                  name="id_usuario"
                  value={values.id_usuario}
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
      <Modall
        title="Detalles del carrete"
        content={
          <>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Deseas ver mas detalles del carrete?
            </h3>
          </div>
          </>
        }
        onAccept={segundoEnvio}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal3}
        openModal={openModal3}
        modo={modo}
        zise="md"
      />
      <Modall
        title="Datos del producto"
        content={(
            <>
              <Card>
                {Object.entries(productos).map(([clave, valor]) => (
                  <>
                    <div className="flex flex-row">
                      <div class="basis-2/4">
                        <Label htmlFor="nombre_producto" value={clave} />
                      </div>
                      <div class="basis-2/4">
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
        setOpenModalProp={setOpenModal4}
        openModal={openModal4}
        modo={modo}
        size="2xl"
      />
      
    </>
  );
}

export default Carretes;
