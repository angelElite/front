import React, { forwardRef } from "react";
import Logo from "./LogoEmpresa.png";
import { useReactToPrint } from "react-to-print";
import { Button } from "flowbite-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const Peticion = forwardRef(({ admin, empleado, folio, productos, fecha }) => {
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div ref={componentRef}>
        <div class="w-100">
          <div class="flex justify-center">
          <img src={Logo} alt="Logo de la aplicación" />
          </div>
          
          <div>
          <Table>
          <Table.Head>
          <Table.HeadCell className="text-xs text-gray-900 dark:text-white">Ficha de salida </Table.HeadCell>
          <Table.HeadCell className="text-xs text-gray-900 dark:text-white">Folio: {folio}</Table.HeadCell>
          </Table.Head>
            <Table.Body className="text-xs text-gray-900 dark:text-white">
              <Table.Row>
                <Table.Cell >Administrador</Table.Cell>
                <Table.Cell>{admin}</Table.Cell>

              </Table.Row>
              <Table.Row>
                <Table.Cell>Fecha</Table.Cell>
                <Table.Cell>{fecha}</Table.Cell>

              </Table.Row>
              <Table.Row>
                <Table.Cell>Empleado</Table.Cell>
                <Table.Cell>{empleado}</Table.Cell>

              </Table.Row>
            </Table.Body>
          </Table>
          </div>
          <div class="w-50">
          <Table>
              <TableHead className="text-xs text-gray-900 dark:text-white">
                <TableHeadCell>Id</TableHeadCell>
                <TableHeadCell>Nombre del producto</TableHeadCell>
                <TableHeadCell>PZ</TableHeadCell>
              </TableHead>
              <TableBody className="text-xs text-gray-900 dark:text-white">
                {productos.map((item) => (
                  <TableRow
                    key={item.id}
                    
                  >
                    <TableCell>
                      {item.id}
                    </TableCell>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.unidades}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div  className="text-xs text-gray-900 dark:text-white text-center">
            <br />
            _______________________________
            <p>Firma de resibido:</p>
            

          </div>
          <br />
          <div style={{ pageBreakAfter: "always" }} />
        </div>
      </div>
      <div class="flex justify-center ...">
      <Button onClick={handlePrint}>Imprimir</Button>
      </div>
    </>
  );
});
export default Peticion;
