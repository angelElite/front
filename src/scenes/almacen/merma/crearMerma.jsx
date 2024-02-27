import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Card,
  Radio,
  Select
} from "flowbite-react";
import Modall from "../../../components/Modal";
import { useState, useEffect } from "react";
import useFormulario from "../../../hooks/useFormulario";
import { postData } from "../../../hooks/api";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { IconButton } from "@mui/material";
import { fetchData } from "../../../hooks/api";

function CrearMerma() {
  const [openModal, setOpenModal] = useState(true);
  const [modo, setModo] = useState("crear");
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const día = fechaActual.getDate();
  const horas = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();

  const fechaYHoraActual = `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}`;
  //const fechaFormateada = fecha.toISOString().slice(0, 10);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [data, setData] = useState([]);
  const { values, handleChange, handleSubmit } = useFormulario({
    falla_descripcion: "",
    fecha_entrada: fechaYHoraActual,
    status: 1,
    id_producto_individual: 107,
  });

  // Cerrar el modal
  const handleDecline = () => {
    setOpenModal(false);
    setShowToast3(true);
    setShowToast2(true);
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const result = await fetchData("http://127.0.0.1:8000/api/sistemaSolit/almacenProductos_indiviaduales/");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    obtenerDatos(); // Llamada a la función para obtener los datos al montar el componente
  }, []);


  const todosLosCamposLlenos = Object.values(values).every(
    (value) => value !== null && value !== ""
  );

  const activate = () => {
    if (todosLosCamposLlenos) {
      postData(
        values,
        "http://127.0.0.1:8000/api/sistemaSolit/almacenMerma/"
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
        title="Crear merma"
        content={
          <>
            <Card className="">
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
                    value="Descripcion de la falla:"
                  />
                </div>
                <TextInput
                  id="nombre_producto"
                  type="text"
                  name="falla_descripcion"
                  onChange={handleChange}
                  required
                />

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="fecha_ingreso" value="Fecha ingreso:" />
                  </div>
                  <TextInput
                    id="fecha_ingreso"
                    type="text"
                    name="fecha_entrada"
                    disabled
                    value={fechaYHoraActual}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="productos" value="Identificador del producto individual:" />
                </div>
                <Select id="productos" name="id_producto_individual" onChange={handleChange}>
                  {data.map(producto => (
                    <option key={producto.id} value={producto.id}>{producto.nombre_producto_individual} , codigo de barras: {producto.codigo_barras}</option>
                  ))}
                </Select>
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
export default CrearMerma;
