import {
    Label,
    TextInput,
    Card,
    Textarea,
    Radio
  } from "flowbite-react";
  import Modall from "../../../components/Modal";
  import { useState } from "react";
  import useFormulario from "../../../hooks/useFormulario";
  import { postData } from "../../../hooks/api";
  import { Toast } from "flowbite-react";
  import { HiCheck, HiX } from "react-icons/hi";
  import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
  import { IconButton } from "@mui/material";
  
  function CrearUsuarios() {
    const [openModal, setOpenModal] = useState(true);
    const [modo, setModo] = useState("Crear");
    const [showToast, setShowToast] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);
    const { values, handleChange, handleSubmit } = useFormulario({
        nombre_completo: "",
        correo_electronico: "",
        numero_celular: "",
        equipo_trabajo: "",
        estatus: true,
        fecha_nacimiento: "",
        foto_perfil: "foto",
        ubicacion: "15 norte",
        tipo_rol: "",
        password: "",
      });
  
    // Cerrar el modal
    const handleDecline = () => {
      setOpenModal(false);
      setShowToast3(true);
      setShowToast2(true);
    };
      const todosLosCamposLlenos = Object.values(values).every(
      (value) => value !== null && value !== ""
    );


    const activate = () => {
      if (todosLosCamposLlenos) {
        postData(
          values,
          "http://127.0.0.1:8000/api/sistemaSolit/almacenUsuarios/"
        );
        setOpenModal(false);
        setShowToast(true);
        setShowToast3(true);
    
      } else {
        setOpenModal(false);
        setShowToast2(true);
        setShowToast3(true);
      }
    
    };
  
    return (
      <>
        <Modall
          title="Crear Usuario"
          content={
            <>
              <Card>
                <form
                  id="complet"
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault(); // Evitar el envío por defecto del formulario
                  }}
                >
                  <div className="mb-2 block">
                    <Label
                      htmlFor="nombre_producto"
                      value="Nombre completo:"
                    />                 
                  <TextInput
                    id="nombre_producto"
                    type="text"
                    name="nombre_completo"
                    onChange={handleChange}
                    required
                  />
                  </div>
  
                  <div class="columns-2">
                    <div className="mb-2 block">
                      <Label htmlFor="numero_celular" value="Numero celular:" />
                    <TextInput
                      id="numero_celular"
                      type="text"
                      name="numero_celular"
                      maxLength="10"
                      onChange={handleChange}
                    />
                    </div>
                    
                    <div className="mb-2 block">
                      <Label htmlFor="correo_electronico" value="Correo electronico:" />
                    
                    <TextInput
                      id="correo_electronico"
                      type="email"
                      name="correo_electronico"
                      onChange={handleChange}
                    />
                    </div>
                    </div>

                    <div className="mb-2 block">
                      <Label htmlFor="equipo_trabajo" value="Equipo de trabajo:" />
                    
                    <Textarea
                      id="equipo_trabajo"
                      type="text"
                      name="equipo_trabajo"
                      onChange={handleChange}
                    />
                    </div>
                    <div class="columns-2">
                    <div className="mb-2 block">
                      <Label htmlFor="fecha_nacimiento" value="Fecha de nacimiento:" />
                    
                    <TextInput
                      id="fecha_nacimiento"
                      type="date"
                      name="fecha_nacimiento"
                      onChange={handleChange}
                    />
                    </div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Contraseña:" />
                    
                    <TextInput
                      id="password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                    />
                    </div>
                    </div>
                    
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
                    <Label htmlFor="Fucionador">Fusionador</Label>
                  </div>
                </fieldset>
              </div>
                  
                </form>
              </Card>
            </>
          }
          onAccept={activate}
          onDecline={handleDecline}
          setOpenModalProp={setOpenModal}
          openModal={openModal}
          modo={modo}
          zise="md"
        />
        <div className="flex flex-col gap-4">
          <div className="space-y-4 ">
            {showToast && (
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                  Su alta de producto defectuoso se realizo correctamente
                </div>
              </Toast>
            )}
          </div>
          <div className="space-y-4 ">
            {showToast2 && (
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                  No se regristro ningun producto
                </div>
              </Toast>
            )}
          </div>
          <div className="space-y-4 ">
            {showToast3 && (
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <IconButton
                    onClick={() => {
                      setShowToast3(false);
                      setOpenModal(true);
                      setShowToast2(false);
                      setShowToast(false);
                    }}
                  >
                    <ContentPasteSearchIcon className="h-5 w-5" />
                  </IconButton>
                </div>
                <div className="ml-3 text-sm font-normal">
                  Toca el icono para crear una nueva merma de producto.
                </div>
              </Toast>
            )}
          </div>
        </div>
      </>
    );
  }
  export default CrearUsuarios;