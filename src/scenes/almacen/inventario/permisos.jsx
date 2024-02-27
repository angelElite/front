import React, { useEffect } from "react";
import Table1 from "../../../components/Table";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Modall from "../../../components/Modal";
import { fetchData, putData } from "../../../hooks/api";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Peticion from "./cartas/peticion";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { AiOutlineCheck } from "react-icons/ai";
import { Card } from "flowbite-react";
import { FiPrinter } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";



function Permisos({ user }) {
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [openModal5, setOpenModal5] = useState(false);
  const [modo, setModo] = useState("null");
  const [data, setData] = useState([]);
  const [productos_cantidad, setProductos_cantidad] = useState([]);
  const [id, setID] = useState(null);
  const [peticiones, getPeticiones] = useState([]);
  const [producto, setProducto] = useState(null);
  // const [nombre, setNombre] = useState(null);
  // const [idUsuario, setIdUsuario] = useState(null);

  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://localhost:8000/api/sistemaSolit/reparto"
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
    if (modo === "verProductos") {
      setOpenModal1(false)
    }
  };

  const handleDecline = () => {
    setOpenModal(false);
    setOpenModal1(false);
    setOpenModal2(false);
    setOpenModal3(false);
    setOpenModal4(false);
    setOpenModal5(false);
  };

  const obtenerProductosPorId = async () => {
    if (modo === "verProductos") {
      setOpenModal2(false);
      setOpenModal1(true);
      try {
        const result = await fetchData(
          `http://localhost:8000/api/sistemaSolit/reparto/${id}/`
        );

        setProductos_cantidad(result.producto_cantidad.productos);

      } catch (error) {
        console.log("no entro", error);
      }

    } else if (modo === "aprobarMaterial") {
      setOpenModal3(false);
      let jsonData = {
        nombre_administrador: user.user.nombre_completo,
        producto_cantidad: producto.producto_cantidad,
        nombre_solicitante: producto.nombre_solicitante,
        id_usuario: producto.id_usuario,
      };

      try {
        await putData(
          `http://localhost:8000/api/sistemaSolit/reparto/${id}/`,
          jsonData
        );
        console.log("aprobado");
      } catch (error) {
        console.log("no entro", error);
      } finally {
        fetchDataAndFillTable();
      }


    } else if (modo === "vistaPrevia") {
      try {
        setOpenModal4(false);
        const result = await fetchData(
          `http://localhost:8000/api/sistemaSolit/reparto/${id}/`
        );
        getPeticiones(result);
        setOpenModal5(true);
      } catch (error) {

      }
    }
    await fetchDataAndFillTable();
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
              setModo("verProductos");
              setID(params.row.id);
              setOpenModal2(true);
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setID(params.row.id);
              const result = fetchData(
                `http://localhost:8000/api/sistemaSolit/reparto/${params.row.id}/`,
              )
              setProducto(result);  
              setModo("aprobarMaterial");
              setOpenModal3(true);
            
            }}
          >
            <VpnKeyIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              //aqui es donde quiero poner la funcion de inprimir
              setOpenModal4(true);
              setID(params.row.id);
              setModo("vistaPrevia");
            }}
          >
            <LocalPrintshopIcon />
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
      field: "fecha_solicitud",
      headerName: "Fecha solicitud",
      flex: 1,
    },
    {
      field: "nombre_administrador",
      headerName: "Aceptado por:",
      flex: 1,
    },
    {
      field: "nombre_solicitante",
      headerName: "Nombre del solicitante:",
      flex: 1,
    },

  ];

  return (
    <>
      <Table1
        title="Peticiones de material"
        subtitle="Aceptar las solicitudes de instalaciones"
        rows={data}
        columns={columnaAccesorio}
        height="55vh"
        button={<></>}
      />

      <Modall
        title="Tabla de historial"
        content={<></>}
        onAccept={handleAccept}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal}
        openModal={openModal}
        modo={modo}
        size="xl"
      />
      <br />
      <Modall
        title="Productos"
        content={<>
          <Table>
            <TableHead>
              <TableHeadCell>Identificador</TableHeadCell>
              <TableHeadCell>Nombre del producto</TableHeadCell>
              <TableHeadCell>Unidades</TableHeadCell>
            </TableHead>
            <TableBody>
              {productos_cantidad.map((item) => (
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

        </>}
        onAccept={handleAccept}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal1}
        openModal={openModal1}
        modo={modo}
        size="xl"
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
        onAccept={obtenerProductosPorId}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal2}
        openModal={openModal2}
        modo={modo}
        zise="md"
      />
      <Modall
        title="Alerta"
        content={
          <>
            <div className="text-center">
              <AiOutlineCheck className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estas seguro de aprobar este pedido?
              </h3>
            </div>
          </>
        }
        onAccept={obtenerProductosPorId}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal3}
        openModal={openModal3}
        modo={modo}
        zise="md"
      />
      <Modall
        title="Alerta"
        content={
          <>
            <div className="text-center">
              <FiPrinter className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Deseas abrir la vista previa?
              </h3>
            </div>
          </>
        }
        onAccept={obtenerProductosPorId}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal4}
        openModal={openModal4}
        modo={modo}
        zise="md"
      />
      <Modall
        title="Vista"
        content={
          <div class="flex justify-center">
            {<Card>
              <Peticion
                admin={peticiones.nombre_administrador}
                empleado={peticiones.nombre_solicitante}
                folio={peticiones.id}
                productos={peticiones?.producto_cantidad?.productos}
                fecha={peticiones.fecha_solicitud}
              ></Peticion>
            </Card>}
          </div>
        }
        onAccept={handleDecline}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal5}
        openModal={openModal5}
        modo={modo}
        zise="md"
      />
    </>
  );
}

export default Permisos;
