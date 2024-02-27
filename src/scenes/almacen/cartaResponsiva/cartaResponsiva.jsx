import { Card } from "flowbite-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect } from "react";
import PrintIcon from "@mui/icons-material/Print";
import React from "react";
import Logo from "../inventario/cartas/LogoEmpresa.png";
import { fetchData, postData } from "../../../hooks/api";
import { NoMeals } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
function CartaResponsiva({ nombre, productos }) {
  const fecha = new Date();
  const componentRef = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataPro, setData] = React.useState([]);
  

  // const fetchDataAndFillTable = async () => {
  //   try {
  //     const result = await fetchData(
  //       "http://localhost:8000/api/sistemaSolit/almacenReparto/"
  //     );
  //     setData(result);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDataAndFillTable();
  // }, []);

  // const handleSaveAsPDF = async () => {
    
  //     setIsLoading(true);
  //     const content = componentRef.current;
  //     const pdfOptions = {
  //       margin: 10,
  //       filename: "Carta_responsiva.pdf",
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //     };
  //     const pdf = await html2pdf().from(content).set(pdfOptions).outputPdf();

      
  // };
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div ref={componentRef}>
      <>
        <Card>
          <>
            <div className="text-end">
              <button onClick={handlePrint}>
                <PrintIcon />
              </button>
            </div>
          </>
          <div
            style={{
              height: "80px",
              width: "200px",
            }}
          >
            <img src={Logo} alt="" />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Carta responsiva de entrega de material
          </h5>
          <h6 className="font-normal text-gray-900 dark:text-gray-400 text-end">
            Fecha: {fecha.toLocaleDateString()}
          </h6>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-start">
            Por medio de la presente hago constar que yo: {nombre}
          </p>

          <p className="font-normal text-gray-700 dark:text-gray-400 text-start">
            He resibido de la empresa SOLIT "Soluciones en Tecnologias de la
            Información" el material como herramienta de trabajo para realizar
            única y exclusivamente mis actividades laborales, mismo que estará
            bajo mi resguardo y es mi responsabilidad hacer correcto uso del
            mismo. Me comprometo a la devolucion del material descrito al
            finalizar mi jornada laboral o al término de la relación laboral con
            SOLIT
          </p>
          <p>
            Así mismo en caso de daño o perdida fisica del los productos
            descritos realizare el pago correspondiente.
          </p>
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableHeadCell>id</TableHeadCell>
                  <TableHeadCell>Material</TableHeadCell>
                  <TableHeadCell>Cantidad</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {productos && productos.length > 0 ? (
                    productos.map((producto, index) => (
                      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell>{producto.id}</TableCell>
                        <TableCell>{producto.nombre_Producto}</TableCell>
                        <TableCell>{producto.cantidad}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        <NoMeals /> No hay productos disponibles.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
          <div className="text-center">
           
            <p>__________________________________</p>
            Yo {nombre} acepto.
          </div>
        </Card>
      </>
    </div>
  );
}
export default CartaResponsiva;
