import React, { useEffect } from "react";
import Table from "../../../components/Table";
import { IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modall from "../../../components/Modal";
import { Label, TextInput, Radio } from "flowbite-react";
import useFormulario from "../../../hooks/useFormulario";
import { fetchData, deleteData, putData } from "../../../hooks/api";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Usuarios({ user }) {
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [modo, setModo] = useState("null");
  const { values, handleChange, handleSubmit } = useFormulario({
    nombre_completo: "",
    correo_electronico: "",
    numero_celular: "",
    equipo_trabajo: "",
    estatus: "",
    fecha_nacimiento: null,
    foto_perfil: "",
    ubicacion: "",
    tipo_rol: "",
    password: "",
  });
  const [data, setData] = useState([]);
  // const historial = async () => {
  //   const datos = {
  //     usuario: user.user.nombre_completo,
  //     accion: modo,
  //     tabla: "Usuarios"
  //   };
  //   postData(
  //     datos,
  //     "http://127.0.0.1:8000/api/sistemaSolit/almacenHistoricoView/"
  //   );
  // };

  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://127.0.0.1:8000/api/sistemaSolit/almacenUsuarios/"
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
  if(modo === "Eliminar"){
    try {
      await deleteData(
        `http://127.0.0.1:8000/api/sistemaSolit/almacenUsuarios/${id}/`
      );
      setOpenModal2(false);

    } catch (error) {
      console.error("Error deleting data:", error);
    } finally{
      await fetchDataAndFillTable();
    }
{hola}


  }else if (modo === "Editar") {
      await putData(
        `http://127.0.0.1:8000/api/sistemaSolit/almacenUsuarios/${id}/`,
        values
      );
    } else if (modo === "") setModo(null);
    setOpenModal(false);
    fetchDataAndFillTable();
  };


  const handleDecline = () => {
    // Perform actions when "Decline" is clicked
    setOpenModal(false);
    setOpenModal2(false);
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
              setOpenModal2(true);
              setModo("Eliminar");
              setId(params.row.id)
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
                // Asigna los datos al estado 'values'
                handleChange({
                  target: {
                    name: "nombre_completo",
                    value: itemToEdit.nombre_completo,
                  },
                });
                handleChange({
                  target: {
                    name: "correo_electronico",
                    value: itemToEdit.correo_electronico,
                  },
                });
                handleChange({
                  target: {
                    name: "numero_celular",
                    value: itemToEdit.numero_celular,
                  },
                });
                handleChange({
                  target: {
                    name: "equipo_trabajo",
                    value: itemToEdit.equipo_trabajo,
                  },
                });
                handleChange({
                  target: { name: "estatus", value: itemToEdit.estatus },
                });
                handleChange({
                  target: {
                    name: "fecha_nacimiento",
                    value: itemToEdit.fecha_nacimiento,
                  },
                });
                handleChange({
                  target: { name: "ubicacion", value: itemToEdit.ubicacion },
                });
                handleChange({
                  target: { name: "tipo_rol", value: itemToEdit.tipo_rol },
                });
                handleChange({
                  target: { name: "password", value: itemToEdit.password },
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
      flex: .3,
    },
    {
      field: "nombre_completo",
      headerName: "Nombre completo",
      flex: 1,
    },
    {
      field: "correo_electronico",
      headerName: "Correo electronico",
      flex: 1,
    },
    {
      field: "numero_celular",
      headerName: "Numero celular",
      flex: 1,
    },

    {
      field: "equipo_trabajo",
      headerName: "Equipo trabajo",
      flex: 1,
    },
    {
      field: "estatus",
      headerName: "Estatus",
      flex: .5,
    },

    {
      field: "fecha_nacimiento",
      headerName: "Fecha Nacimiento",
      flex: 1,
    },
    {
      field: "ubicacion",
      headerName: "Ubicacion",
      flex: 1,
    },
    {
      field: "tipo_rol",
      headerName: "Puesto-Rol",
      flex: 1,
    },
    {
      field: "password",
      headerName: "Clave",
      flex: 1,
      renderCell: (params) => '*'.repeat(params.row.password.length),
    },
  ];

  return (
    <>
      <Table
        title="Usuarios"
        subtitle="Usuarios"
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
                <Label htmlFor="nombre_completo" value="Nombre completo:" />
                <TextInput
                  required
                  type="text"
                  name="nombre_completo"
                  value={values.nombre_completo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label
                  htmlFor="correo_electronico"
                  value="Correo Electronico:"
                />
                <TextInput
                  required
                  type="text"
                  name="correo_electronico"
                  value={values.correo_electronico}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="numero_celular" value="Numero Celular:"/>
                <TextInput
                  required
                  type="text"
                  name="numero_celular"
                  value={values.numero_celular}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="equipo_trabajo" value="Equipo trabajo:" />
                <TextInput
                  required
                  type="text"
                  name="equipo_trabajo"
                  value={values.equipo_trabajo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="estatus" value="Estatus:" />
                <TextInput
                  required
                  type="text"
                  name="estatus"
                  value={values.estatus}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="fecha_nacimiento" value="Fecha nacimiento:" />
                <TextInput
                  required
                  type="date"
                  name="fecha_nacimiento"
                  value={values.fecha_nacimiento}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="ubicacion" value="Ubicacion:" />
                <TextInput
                  required
                  type="text"
                  name="ubicacion"
                  value={values.ubicacion}
                  onChange={handleChange}
                />
              </div>
             
              <div>
                <Label htmlFor="password" value="Clave:" />
                <TextInput
                  
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <fieldset className="flex max-w-md flex-row gap-4">
                  <legend className="mb-4 text-black">Puesto-Rol:</legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="administrador"
                      name="tipo_rol"
                      value="admin"
                      checked={values.tipo_rol === "admin"} // Check based on current value
                      onChange={handleChange}
                      defaultChecked
                    />
                    <Label htmlFor="united-state">Administrador</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="Tecnico"
                      name="tipo_rol"
                      value="tecnico"
                      checked={values.tipo_rol === "tecnico"} // Check based on current value
                      onChange={handleChange}
                    />
                    <Label htmlFor="Tecnico">Tecnico</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="Fucionador"
                      name="tipo_rol"
                      value="fucion"
                      checked={values.tipo_rol === "fucion"} // Check based on current value
                      onChange={handleChange}
                    />
                    <Label htmlFor="Fucionador">Fucionador</Label>
                  </div>
                </fieldset>
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
        title="Detalles del producto"
        content={
          <>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Deseas eliminar a este usuario?
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

export default Usuarios;