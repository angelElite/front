import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { fetchData, postData } from "../../../hooks/api";
import { Button } from "flowbite-react";
import Header from "../../../components/Header";
import Modall from "../../../components/Modal";
import { HiOutlineExclamationCircle, HiCheck } from 'react-icons/hi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

function Fucionador({ data }) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);

  const [productosIndividuales, setProductosIndividuales] = useState([]);
  const [modo, setModo] = useState(null);
  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://127.0.0.1:8000/api/sistemaSolit/almacenProductosFucionador/"
      );  
      setProductosIndividuales(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataAndFillTable();
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (id, nombre, unidades, checked) => {
    if (checked) {
      const existingItemIndex = selectedItems.findIndex(
        (item) => item.id === id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...selectedItems];
        updatedItems[existingItemIndex].unidades = unidades;
        setSelectedItems(updatedItems);
      } else {
        setSelectedItems([...selectedItems, { id, nombre, unidades }]);
      }
    } else {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    }
  };

  const handleDecline = () => {
    // Aquí puedes hacer lo que necesites con selectedItems
    setOpenModal(false);
    setOpenModal2(false);
    setOpenModal3(false);
  };

  const datosJson = {
    producto_cantidad: { productos: selectedItems },
    nombre_solicitante: data.user.nombre_completo,
    id_usuario: data.user.id
  };
  const handleAccept = async () => {
    try {
      // Realizar la solicitud POST
      await postData(datosJson, "http://localhost:8000/api/sistemaSolit/reparto/");
      
      // Si la solicitud POST se realizó correctamente, abrir el modal 2
      setOpenModal2(true);
    } catch (error) {
      // Si ocurrió un error durante la solicitud POST, abrir el modal 3
      setOpenModal3(true);
    } finally {
      // Independientemente del resultado, cerrar el modal actual
      setOpenModal(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <Header title="Apartado de fusionadores" subtitle="Solicitud de material" />
        <Header title={<></>} subtitle="Materiales que pueden solicitar" />
      </div>

      <Table>
        <TableHead>
          <TableHeadCell>Identificador</TableHeadCell>
          <TableHeadCell>Nombre del producto</TableHeadCell>
          <TableHeadCell>Seleccion</TableHeadCell>
          <TableHeadCell>Unidades</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {productosIndividuales.map((objeto) => (
            <TableRow
              key={objeto.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {objeto.id}
              </TableCell>
              <TableCell>{objeto.nombre}</TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) =>
                    handleCheckboxChange(
                      objeto.id,
                      objeto.nombre,
                      objeto.unidades,
                      e.target.checked
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <div className="ms-3">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    id="first_product"
                    className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    defaultValue="0"
                    onChange={
                      (e) =>
                        handleCheckboxChange(
                          objeto.id,
                          objeto.nombre,
                          e.target.value !== ""
                            ? parseInt(e.target.value)
                            : undefined,
                          true
                        ) // Verificar si el valor es una cadena vacía
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <Modall
        title="Datos de tu pedido"
        content={
          <>

            <Table>
              <TableHead>
                <TableHeadCell>Identificador</TableHeadCell>
                <TableHeadCell>Nombre del producto</TableHeadCell>
                <TableHeadCell>Unidades</TableHeadCell>
              </TableHead>
              <TableBody>
                {selectedItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.id}
                    </TableCell>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.unidades}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </>
        }
        onAccept={handleAccept}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal}
        openModal={openModal}
        modo={modo}
        size="2xl"
      />

        <div class="flex justify-center ">
        <Button
          color="success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
        
          Confirma solicitud
        </Button>
      </div>
      <Modall
        title="Pedido enviado"
        content={
          <>
          <div className="text-center">
            <HiCheck className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Su pedido fue ingresado con exito 
            </h3>
          </div>
          </>
        }
        onAccept={handleDecline}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal2}
        openModal={openModal2}
        modo={modo}
        zise="md"
      />
       <Modall
        title={<></>}
        content={
          <>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Lo siento hubo un error intentelo mas tarde
            </h3>
          </div>
          </>
        }
        onAccept={handleDecline}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal3}
        openModal={openModal3}
        modo={modo}
        zise="md"
      />
    </>
  );
}

export default Fucionador;
