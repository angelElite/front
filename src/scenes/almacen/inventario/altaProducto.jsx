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
import { fetchData, postData, putData } from "../../../hooks/api";
import { Toast } from 'flowbite-react';
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { IconButton } from "@mui/material";
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { FaCheck } from "react-icons/fa6";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';


function AltaProducto() {
    const [openModal, setOpenModal] = useState(true);
    const [openModal1, setOpenModal1] = useState(false);
    const [showToast3, setShowToast3] = useState(false);
    const [modo, setModo] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const [dataEncontrada, setDataEncontrada] = useState([]);
    const { values, handleChange, handleSubmit } = useFormulario({
        codigo_barras: "",
    });
    const handleDecline = () => {
        setOpenModal(false);
        setOpenModal1(false);
        setShowToast3(true);
    };
    const handleAccept = async () => {
        //  if (todosLosCamposLlenos) {
        try {
            const result = await fetchData(
                "http://127.0.0.1:8000/api/sistemaSolit/almacenHistoricoView/"
            );
            let encontrado = false;
            for (let i = 0; i < result.length; i++) {
                if (values.codigo_barras === result[i].codigo_barras) {
                    setDataEncontrada(result[i]);
                    encontrado = true;
                    break;
                }
            }
            if (encontrado) {
                setMensaje(true);
            } else {
                setMensaje(false);
            }

        } catch (error) {
            console.log("No se hizo la peticion: ", error);
        }
    };
    const agregarProductoIndividual = async () => {
        try {
            let estructura = {
                id: null,
                nombre: dataEncontrada.nombre_producto,
                cantidad: 1
            }
            await postData(
                estructura,
                "http://127.0.0.1:8000/api/sistemaSolit/almacenPedido/"
            )

        } catch (e) {
            console.log("no se realizo la peticon", e)
        }
        setOpenModal(false);
        setOpenModal1(true);

    }
    const agragarCodigoBarras = async () => {
        try{
            const result = await fetchData(
                "http://127.0.0.1:8000/api/sistemaSolit/almacenProductos_indiviaduales/"
            );
            
            for (let i = 0; i < result.length; i++) {
                console.log(result[i]);
                if (dataEncontrada.nombre_producto === result[i].nombre_producto_individual && result[i].codigo_barras === null) {
                        try {
                            let estructura = {
                                nombre_producto_individual: result[i].nombre_producto_individual,
                                status:result[i].status,
                                codigo_barras:dataEncontrada.codigo_barras,
                                id_producto:result[i].id_producto
                            }
                            await putData(
                                `http://127.0.0.1:8000/api/sistemaSolit/almacenProductos_indiviaduales/${result[i].id}/`,
                                estructura
                                )
                        } catch (e) {
                            console.log("no se realizo la peticon", e)
                        }
                }
            }

        }catch (e){
            console.log("error", e)
        }
        setOpenModal1(false);
    }
    return (
        <>
            <Modall
                title="Alta de producto"
                content={
                    <>
                        <form
                            id="complet"
                            className="flex flex-col gap-4"
                            onSubmit={(e) => {
                                e.preventDefault(); // Evitar el envío por defecto del formulario

                            }}
                        >
                            <div className="mb-4 block">
                                <Label htmlFor="stock" value="Codigo de barras:" />
                                <TextInput
                                    type="text"
                                    name="codigo_barras"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </form>
                        {!mensaje ?
                            (<div>
                                <Alert color="failure" icon={HiInformationCircle} >
                                    <span className="font-medium">No se encontro hisorial de este producto</span>
                                </Alert>
                            </div>
                            ) : <div>
                                <div>
                                    <Alert color="success" icon={FaCheck} className="mb-4 " >
                                        <span className="font-medium ">Historial de producto encontrado</span>
                                    </Alert>

                                </div>
                                <div className="overflow-x-auto mb-2">
                                    <Table>
                                        <TableHead>
                                            <TableHeadCell>ID</TableHeadCell>
                                            <TableHeadCell>Codigo de barras</TableHeadCell>
                                            <TableHeadCell>Nombre del producto</TableHeadCell>
                                            <TableHeadCell>Uso</TableHeadCell>
                                        </TableHead>
                                        <TableBody className="divide-y">
                                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <TableCell>
                                                    {dataEncontrada.id}
                                                </TableCell>
                                                <TableCell>
                                                    {dataEncontrada.codigo_barras}
                                                </TableCell>
                                                <TableCell>
                                                    {dataEncontrada.nombre_producto}
                                                </TableCell>
                                                <TableCell>
                                                    {dataEncontrada.uso}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div class="flex justify-center ...">

                                    <Button color="success" onClick={agregarProductoIndividual}>
                                        Agregar a productos
                                    </Button>
                                </div>

                            </div>
                        }

                    </>
                }
                onAccept={handleAccept}
                onDecline={handleDecline}
                setOpenModalProp={setOpenModal}
                openModal={openModal}
                modo={modo}
                zise="md"
            />
            <div className="flex flex-col gap-4">
                <div className="space-y-4 ">

                    {showToast3 && (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <IconButton onClick={() => { setShowToast3(false); setOpenModal(true); }}>
                                    <ContentPasteSearchIcon className="h-5 w-5" />
                                </IconButton>
                            </div>
                            <div className="ml-3 text-sm font-normal">Toca el icono para dar de alta un nuevo producto.</div>

                        </Toast>
                    )}
                </div>
            </div>
            <Modall
                title={<></>}
                content={
                    <>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center mb-4">
                            El producto se dio de alta exitosamente
                        </h5>
                        <div class="flex justify-center">
                        <FaCheck className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"/>
                        </div>
                    </>
                }
                onAccept={agragarCodigoBarras}
                onDecline={agragarCodigoBarras}
                setOpenModalProp={setOpenModal1}
                openModal={openModal1}
                modo={modo}
                zise="md"
            />
        </>
    );
}
export default AltaProducto;
