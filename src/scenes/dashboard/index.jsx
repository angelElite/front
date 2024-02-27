import { BarChart } from "@mui/x-charts/BarChart";
import * as React from "react";
import { fetchData } from "../../hooks/api";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Modall from "../../components/Modal";
import { Card } from "flowbite-react";
//import { HiFire } from "react-icons/hi";
import { IconButton } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import StoreIcon from "@mui/icons-material/Store";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [idCarrete, setIdCarrete] = useState(null);
  const [idAdmin, setIdAdmin] = useState();
  const [idTecnico, setIdTecnico] = useState([]);
  const [idFusion, setIdFusion] = useState([]);
  const [metrajeI, setMetrajeI] = useState(null);
  const [metrajeF, setMetrajeF] = useState(null);
  const [nombreAlerta, setNombreAlerta] = useState([]);
  const [stock, setStock] = useState([]);
  const [data, setdata] = useState(["Usuarios"]);

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [modo, setmodo] = useState("mostrar");

  //Consulta de carretes y guardar los datos//
  const fetchDataAndFillTable = async () => {
    try {
      const result = await fetchData(
        "http://127.0.0.1:8000/api/sistemaSolit/almacenCarretes/"
      );

      setIdCarrete(result.map((carrete) => "id = " + carrete.id));
      setMetrajeI(result.map((carrete) => carrete.metraje_inicial));
      setMetrajeF(result.map((carrete) => carrete.metraje_usado));
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };
  useEffect(() => {
    fetchDataAndFillTable();
    consultarAlerta();
    consultarUsuarios();

  }, []);
  //Consulta de alertas y guardar los datos//

  const consultarAlerta = async () => {
    try {
      const result = await fetchData(
        "http://127.0.0.1:8000/api/sistemaSolit/almacenAlerta/"
      );
      setNombreAlerta(result.map((alerta) => alerta.nombre_producto));
      setStock(result.map((alerta) => alerta.stock_actual));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const consultarUsuarios = async () => {
    try {
      let Admin = 0;
      let Tecnico = 0;
      let Fucion = 0;
      const arreglo1 = [];
      const arreglo2 = [];
      const arreglo3 = [];
      const result = await fetchData(
        "http://127.0.0.1:8000/api/sistemaSolit/almacenUsuarios/"
      );
      const data = result.map((usuario) => usuario.tipo_rol);
      for (let i = 0; i < data.length; i++) {
        if (data[i] === 'admin') {
          Admin++;
        } else if (data[i] === 'tecnico') {
          Tecnico++;
        } else if (data[i] === 'fucion') {
          Fucion++;
        }
      }
      arreglo1.push(Admin);
      arreglo2.push(Tecnico);
      arreglo3.push(Fucion);
      setIdAdmin(arreglo1);
      setIdTecnico(arreglo2);
      setIdFusion(arreglo3);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDecline = () => {
    setOpenModal(false);
    setOpenModal2(false);
    setOpenModal3(false);
  };

  // const ModalContent = () => {
  //   if (!idCarrete || !Array.isArray(idCarrete) || !metrajeI || !Array.isArray(metrajeI) || !metrajeF || !Array.isArray(metrajeF)) {
  //     return null; // Si alguna de las variables no está definida o no es iterable, retorna null
  //   }


  return (
    <>
      <div className="text-center">
        <Header
          title="Panel de inicio del sistema solit"
          subtitle="Actividades"
        />
      </div>
      <div class="flex justify-evenly ...">
        {/*Verificacion si esta vacias las variables*/}
        {idCarrete && idCarrete.length > 0 && metrajeI && metrajeI.length > 0 && metrajeF && metrajeF.length > 0 && (
          <Card className="max-w-sm">
            <div className="text-center">
              <IconButton>
                <StoreIcon
                  class="w-full min-w-23 max-w-24 h-full max-h-24"
                  onClick={() => {
                    setOpenModal(true);
                    fetchDataAndFillTable();
                  }}
                />
              </IconButton>
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Historial de carretes
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Carretes utilizados, su metraje y cuanto esta ocupado.
            </p>
          </Card>
        )}
        {/*Verificacion si esta vacias las variables*/}
        {stock && stock.length > 0 && nombreAlerta  && nombreAlerta.length > 0 &&(
          <Card className="max-w-sm">
            <div className="text-center">
              <IconButton>
                <RunningWithErrorsIcon
                  class="w-full max-w-24 h-full max-h-24"
                  onClick={() => {
                    setOpenModal2(true);
                    consultarAlerta();

                  }}
                />
              </IconButton>
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Peligro de stock
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Productos abajo del stock minimo
            </p>
          </Card>
        )}

        <Card className="max-w-sm">
          <div className="text-center">
            <IconButton>
              <PersonSearchIcon
                class="w-full max-w-24 h-full max-h-24"
                onClick={() => {
                  setOpenModal3(true);
                  consultarUsuarios();
                }}
              />
            </IconButton>
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Usuarios
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Cuantos usuarios, puestos de usuarios agregados.
          </p>
        </Card>
      </div>


      <Modall
        title="Información Carretes"
        content={<BarChart
          width={500}
          height={300}
          series={[
            { data: metrajeI, label: "Metraje", id: "metrajeId" },
            { data: metrajeF, label: "Metraje ocupado", id: "metrajeOcupadoId" },
          ]}
          xAxis={[{ data: idCarrete, scaleType: "band" }]}
        />
        }
        onAccept={handleDecline}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal}
        openModal={openModal}
        modo={modo}
        zise="lg"
      />
      <Modall
        title="Productos en peligro"
        content={
          <BarChart
            width={500}
            height={300}
            series={[
              {
                data: stock,
                label: "Stock Actual",
                id: "PeligroId",
                color: "#fdb462",
              },
            ]}
            xAxis={[{ data: nombreAlerta, scaleType: "band" }]}
          />
        }
        onAccept={handleDecline}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal2}
        openModal={openModal2}
        modo={modo}
        zise="lg"
      />
      <Modall
        title="Roles y Puestos"
        content={
          <BarChart
            width={500}
            height={300}
            series={[
              { data: idAdmin, label: "Administradores", id: "AdministradoresId" },
              { data: idTecnico, label: "Tecnicos", id: "TecnicosId" },
              { data: idFusion, label: "Fusionadores", id: "FusionadoresId" }
            ]}
            xAxis={[{ data: data, scaleType: "band" }]}
          />

        }
        onAccept={handleDecline}
        onDecline={handleDecline}
        setOpenModalProp={setOpenModal3}
        openModal={openModal3}
        modo={modo}
        zise="lg"
      />
    </>
  );
};

export default Dashboard;
