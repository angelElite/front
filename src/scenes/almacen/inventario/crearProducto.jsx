import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Card,
  Radio,
} from "flowbite-react";
import Modall from "../../../components/Modal";
import { useState } from "react";
import useFormulario from "../../../hooks/useFormulario";
import { postData } from "../../../hooks/api";
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { IconButton } from "@mui/material";

function CrearProducto() {
  const [openModal, setOpenModal] = useState(true);
  const [modo, setModo] = useState("crear");
  const fecha = new Date("Fri Jan 26 2024 09:43:59 GMT-0600 (hora estándar central)");
  const fechaFormateada = fecha.toISOString().slice(0, 10);
  const [showToast, setShowToast ] = useState(false);
  const [showToast2, setShowToast2 ] = useState(false);
  const [showToast3, setShowToast3 ] = useState(false);
  const { values, handleChange, handleSubmit } = useFormulario({
    
    nombre_producto: "",
    marca: "",
    modelo: "",
    stock: null,
    observaciones: "",
    fecha_ingreso: fechaFormateada,
    unidad_medida: "",
    empresa: "",
    proveedor: "",
    zona: "",
    stock_minimo: null,
  });
  
  


  // Cerrar el modal
  const handleDecline = () => {
    setOpenModal(false);
    setShowToast3(true);
    setShowToast2(true);

  };  
 

  const todosLosCamposLlenos = Object.values(values).every(value => value !== null && value !== "");


  const activate = () => {
    if (todosLosCamposLlenos) {
      postData(
        values,
        "http://127.0.0.1:8000/api/sistemaSolit/almacenProdcutos/"
        
      );
      setOpenModal(false);
      setShowToast(true);
      setShowToast3(true);
      
    }else{
      setOpenModal(false);
      setShowToast2(true);
      setShowToast3(true);
    }
  };

  return (
    <>
    <Modall
      title="Crear producto"
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
              <div class="columns-3">
                <div className="mb-2 block">
                  <Label
                    htmlFor="nombre_producto"
                    value="Nombre del producto:"
                  />
                </div>
                <TextInput
                  id="nombre_producto"
                  type="text"
                  name="nombre_producto"
                  onChange={handleChange}
                  required
                />

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="marca" value="Marca:" />
                  </div>
                  <TextInput id="marca" type="text" name="marca" required   onChange={handleChange} />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="modelo" value="Modelo:" />
                  </div>
                  <TextInput id="modelo" type="text" name="modelo" required  onChange={handleChange}/>
                </div>
              </div>

              <div class="columns-3">
                <div className="mb-2 block">
                  <Label htmlFor="stock" value="Stock:" />
                </div>
                <TextInput id="stock" type="number" min="1"  name="stock" required  onChange={handleChange}/>

                <div className="mb-2 block">
                  <Label htmlFor="stock_minimo" value="Estock minimo:" />
                </div>
                <TextInput id="stock_minimo"  min="1"  type="number" name="stock_minimo" required  onChange={handleChange}/>
              
                <div className="mb-2 block">
                  <Label htmlFor="fecha_ingreso" value="Fecha ingreso:" />
                  </div>  
                <TextInput id="fecha_ingreso"type="date" name="fecha_ingreso"  disabled value={fechaFormateada} onChange={handleChange}/>
              
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="observaciones" value="Observaciónes:" />
                </div>
                <TextInput id="observaciones" type="text" name="observaciones" required  onChange={handleChange}/>
              </div>

              <div class="columns-3">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="unidad_medida" value="Unidad de medida:" />
                  </div>
                  <TextInput id="unidad_medida" type="text" name="unidad_medida" required  onChange={handleChange}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="empresa" value="Empresa:" />
                  </div>
                  <TextInput id="empresa" type="text" name="empresa" required  onChange={handleChange}/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="proveedor" value="Proveedor:" />
                  </div>
                  <TextInput id="proveedor" type="text" name="proveedor" required  onChange={handleChange}/>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="promotion">Zona:</Label>
              </div>
              <div class="columns-4">
                <div className="flex items-center gap-2">
                  <Radio id="united-state" name="zona" value="Area A" onChange={handleChange}/>
                  <Label htmlFor="united-state">Area A</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="germany" name="zona" value="Area B" onChange={handleChange}/>
                  <Label htmlFor="germany">Area B</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="spain" name="zona" value="Area C" onChange={handleChange}/>
                  <Label htmlFor="spain">Area C</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="uk" name="zona" value="Area D" onChange={handleChange}/>
                  <Label htmlFor="uk">Area D</Label>
                </div>
               
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
        <Toast >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">

          <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Su alta de producto se realizo correctamente</div>
  
        </Toast>
      )}
    </div>
    <div className="space-y-4 ">
      
      {showToast2 && (
        <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">No se regristro ningun producto</div>
     
      </Toast>
      )}
    </div>
    <div className="space-y-4 ">
      
      {showToast3 && (
        <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <IconButton onClick={() => { setShowToast3(false); setOpenModal(true); setShowToast2(false); setShowToast(false); }}>
        <ContentPasteSearchIcon  className="h-5 w-5" />
        </IconButton>
        </div>
        <div className="ml-3 text-sm font-normal">Toca el icono para crear un nuevo producto.</div>
        
      </Toast>
      )}
    </div>
    </div>
  </>
  );
}
export default CrearProducto;
