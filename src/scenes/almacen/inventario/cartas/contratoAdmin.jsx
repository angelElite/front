import React, { useState, useRef, useEffect } from "react";
import Logo from "../cartas/LogoEmpresa.png";
import { Button } from "flowbite-react";
import { Label, TextInput, Card, Radio } from "flowbite-react";
import CanvasDraw from "react-canvas-draw";
import { fetchData } from "../../../../hooks/api";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const ContratoAdmin = () => {
    let { id } = useParams();
    const firmaCliente = useRef(null);
    const firmaTrabajador = useRef(null);
    //const [dataAntena, setDataAntena] = useState(false);
    //const [dataFibra, setDataFibra] = useState(false);
    const [data, setData] = useState("");
    useEffect(() => {
        const fetchContrato = async () => {
            try {

                const response = await fetchData(
                    `http://localhost:8000/api/sistemaSolit/almacenMaterialInstalacion/${id}/`
                );

                setData(response);
            } catch (error) {
                console.log("error", error)
            }

        }
        fetchContrato();
    }, [id]);

    useEffect(() => {
        if (data && data.prefirma_cliente && data.prefirma_trabajador) {
            const prefirmaClienteString = JSON.stringify(data.prefirma_cliente);
            const prefirmaTrabajadorString = JSON.stringify(data.prefirma_trabajador);

            firmaCliente.current.loadSaveData(prefirmaClienteString);
            firmaTrabajador.current.loadSaveData(prefirmaTrabajadorString);
        }
    }, [data]);
    const componentRef = React.useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "contrato",

    });

    return (
        <>
            <div className="flex flex-row gap-2">
                <div className="basis-1/2">
                    <Card className="max-w-3xl">
                        <div ref={componentRef} >

                            <img src={Logo} alt="" class="w-30 h-20" />

                            <p class="text-2xl font-black text-gray-900 dark:text-white flex justify-center ...">
                                Orden de servicio
                            </p>
                            <div className="flex flex-row gap-1">
                                <div className="basis-1/2">
                                    <table class="border-separate border-spacing-1 ">

                                        <tbody class="font-black text-gray-900 dark:text-white">
                                            <tr>
                                                <td class="">Nombre del cliente:</td>
                                                <td class="">{data.nombre_cliente}</td>
                                            </tr>
                                            <tr>
                                                <td class="">Fecha:</td>
                                                <td class="">{data.fecha_instalacion}</td>
                                            </tr>
                                            <tr>
                                                <td class="">Telefono del cliente:</td>
                                                <td class="">{data.telefono_cliente}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-black text-gray-900 dark:text-white">Nombre del instalador:</td>
                                                <td class="">{data.nombre_instalador}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-black text-gray-900 dark:text-white">Direccion del cliente:</td>
                                                <td class="">{data.direccion_cliente}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-black text-gray-900 dark:text-white">Observaciones:</td>
                                                <td class="">{data.observaciones}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-black text-gray-900 dark:text-white">Tipo servicio:</td>
                                                <td class="">{data.tipo_servicio}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="basis-1/2">

                                    {data.informacionFibra ? (
                                        <div class="flex justify-center">
                                            <table class="border-separate border-spacing-1 ">
                                                <tbody class="font-black text-gray-900 dark:text-white">
                                                    <tr >
                                                        <td class="">Serie Router:</td>
                                                        <td class="">{data.informacionFibra['Serie Router']}</td>
                                                    </tr>
                                                    <tr>
                                                        <td >Contraseña:</td>
                                                        <td >{data.informacionFibra['Contraseña']}</td>
                                                    </tr>
                                                    <tr>
                                                        <td >Terminal:</td>
                                                        <td >{data.informacionFibra['Terminal']}</td>
                                                    </tr>
                                                    <tr>
                                                        <td >Puerto:</td>
                                                        <td >{data.informacionFibra['Puerto']}</td>
                                                    </tr>
                                                    <tr>
                                                        <td >P-Terminal DB:</td>
                                                        <td >{data.informacionFibra['P-Terminal DB']}</td>
                                                    </tr>
                                                    <tr>
                                                        <td >Potencia ONT DB:</td>
                                                        <td >{data.informacionFibra['Potencia ONT DB']}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    ) :
                                        null
                                    }
                                    {data.informacionAntena ? (
                                        <div class="flex justify-center">
                                            <table class="border-separate border-spacing-1">
                                                <tbody class="font-black text-gray-900 dark:text-white">
                                                    <tr>
                                                        <td class="">Serie Router:</td>
                                                        <td class="">{data.informacionAntena['Serie Router']}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="">Contraseña:</td>
                                                        <td class="">{data.informacionAntena['Contraseña']}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="">S/N antena:</td>
                                                        <td class="">{data.informacionAntena['S/N antena']}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="">Modelo:</td>
                                                        <td class="">{data.informacionAntena['Modelo']}</td>
                                                    </tr>
                                                </tbody>
                                            </table>


                                        </div>
                                    ) :
                                        null
                                    }
                                </div>
                            </div>
                            <div>
                                {data.informacionAntena ? (
                                    <div className="flex justify-center gap-2">
                                        <Radio
                                        disabled
                                        checked
                                        className="focus:ring-blue-600 dark:ring-offset-blue-700 dark:focus:ring-blue-700 text-blue-700"
                                        />
                                        <Label htmlFor="spain" class="text-2xl font-black text-gray-900 dark:text-white">{data.informacionAntena['zona']}</Label>
                                    </div>
                                ) : null}
                                {data.informacionFibra ? (
                                    <div className="flex justify-center gap-2">
                                        <Radio
                                        disabled
                                        checked
                                        className="focus:ring-blue-600 dark:ring-offset-blue-700 dark:focus:ring-blue-700 text-blue-700"
                                            
                                        />
                                        <Label htmlFor="spain" class="text-2xl font-black text-gray-900 dark:text-white">{data.informacionFibra['zona']}</Label>
                                    </div>
                                ) : null}
                            </div>
                            <div className="text-center">
                                <p class="text-2xl font-black text-gray-900 dark:text-white">
                                    Material utilizado
                                </p>
                            </div>

                            {data.informacionFibra ? (
                                <>
                                    <div className="flex flex-row">
                                        <div className="flex justify-center basis-1/2">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Material</th>
                                                        <th>Cantidad</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Cable cordon circular F.O:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Cable cordon cirular F.O']}
                                                                type="number"
                                                                disabled

                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Conector prepolido:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Conector prepolido']}
                                                                type="number"
                                                                disabled

                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>ONT/ONU:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['ONT / ONU']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Router:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Router']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Roseta:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Roseta']}
                                                                type="number"
                                                                disabled

                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Grapas:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Grapas']}
                                                                type="number"
                                                                disabled

                                                            ></TextInput>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Tensor para acometida:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Tensor para acometida']}
                                                                type="number"
                                                                disabled

                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="flex justify-center basis-1/2">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Material</th>
                                                        <th>Cantidad</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Cinta de aislar:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Cinta de aislar']}
                                                                type="number"
                                                                disabled


                                                            ></TextInput>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Jumper:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Jumper']}
                                                                type="number"
                                                                disabled


                                                            ></TextInput>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Taquete de plastico:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Taquete de plastico']}
                                                                type="number"
                                                                disabled

                                                            ></TextInput>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Armella:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Armella']}
                                                                type="number"
                                                                disabled


                                                            ></TextInput>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>Pijas:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Pijas']}
                                                                type="number"
                                                                disabled


                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Alcohol:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Alcohol']}
                                                                type="number"
                                                                disabled


                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tollas:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionFibra['Toallas']}
                                                                type="number"
                                                                disabled


                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    <div className="text-center">
                                        <Label htmlFor="input-gray" color="gray" value="Otros materiales: " />
                                        <Label value={data.informacionFibra['otros']} disabled color="gray" />
                                    </div>
                                </>
                            ) : null}
                            {data.informacionAntena ? (
                                <>
                                    <div className="flex flex-row">
                                        <div className="flex justify-center basis-1/2">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Wireles / Antena</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Cable UTP:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Cable UTP']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Conector RJ-45:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Conector RJ-45']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Antena:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Antena']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Router:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Router']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Taquete de plástico:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Taquete de plastico']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Argolla:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Argolla']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="flex justify-center basis-1/2">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Wireles / Antena</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Mastil:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Mastil']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sujetador / Grapas:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Sujetador/Grapas']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Cinta de aislar:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Cinta de aislar']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Cinturón nylon:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Cinturon nylon']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sello pasamuros:</td>
                                                        <td>
                                                            <TextInput
                                                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={data.informacionAntena['Sello pasamuros']}
                                                                type="number"
                                                                disabled
                                                            ></TextInput>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <Label htmlFor="input-gray" color="gray" value="Otros materiales: " />
                                        <Label value={data.informacionAntena['otros']} disabled color="gray" />
                                    </div>
                                </>
                            ) : null}



                            <div className="flex flex-row gap-1">
                                <div className="basis-1/2">
                                    <CanvasDraw
                                        ref={firmaTrabajador}
                                        brushRadius={1}
                                        hideGrid={false}
                                        penColor="blue"
                                        disabled={true}
                                        canvasHeight={300}
                                        canvasWidth={300}
                                    //canvasProps={{ width: 350, height: 300 }} 
                                    />

                                    <label class="block text-sm font-medium text-gray-900 dark:text-white text-center">
                                        Firma del trabajador.
                                    </label>

                                </div>
                                <div className="basis-1/2">
                                    <CanvasDraw
                                        brushRadius={1}
                                        hideGrid={false}
                                        ref={firmaCliente}
                                        disabled={true}
                                        canvasHeight={300}
                                        canvasWidth={300}
                                    //canvasProps={{ width: 350, height: 300 }} 
                                    />

                                    <label class="block text-sm font-medium text-gray-900 dark:text-white text-center">
                                        Firma del cliente.
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div class="flex justify-center ...">
                            <Button type="button" color="blue" onClick={handlePrint}>
                                Imprimir
                            </Button>
                        </div>
                    </Card >
                </div>
                <div className="basis-1/2">
                    <Card className="max-w-3xl">
                        <div class="flex justify-end ">
                            <img src={Logo} alt="" class="w-25 h-20" />
                        </div>
                        <div className="text-center">
                            <p class="text-3xl font-black text-gray-900 dark:text-white">
                                Evidencias
                            </p>
                        </div>

                        {data.informacionAntena ? (
                            <div>
                                <div class="flex justify-center">
                                    <Card className="max-w-md  text-center mb-4">
                                        <Label class="text-2xl font-black text-gray-900 dark:text-white" value="Posicion Antena" />
                                        <img src={data.archivoPosicionAntena} alt="" />
                                    </Card>
                                </div>
                                <div class="flex justify-center">
                                    <Card className="max-w-md  text-center mb-4">
                                        <Label class="text-2xl font-black text-gray-900 dark:text-white" value="Navegacion" />
                                        <img src={data.archivoNavegacion} alt="" />
                                    </Card>
                                </div>
                                <div class="flex justify-center">
                                    <Card className="max-w-md text-center mb-4">
                                        <Label class="text-2xl font-black text-gray-900 dark:text-white" value="Captura Informacion Antena" />
                                        <img src={data.archivoInformacionAntena} alt="" />
                                    </Card>
                                </div>
                            </div>
                        ) : null}
                        {data.informacionFibra ? (
                            <div>
                                <div class="flex justify-center">
                                    <Card className="max-w-md text-center mb-4">
                                        <Label class="text-2xl font-black text-gray-900 dark:text-white" value="Terminal" />
                                        <img src={data.archivoTerminal} alt="" />
                                    </Card>
                                </div>
                                <div class="flex justify-center">
                                    <Card className="max-w-md text-center mb-4">
                                        <Label class="text-2xl font-black text-gray-900 dark:text-white" value="P-Terminal DB" />
                                        <img src={data.archivoPTerminal} alt="" />
                                    </Card>
                                </div>
                                <div class="flex justify-center">
                                    <Card className="max-w-md text-center mb-4">
                                        <Label class="text-2xl font-black text-gray-900 dark:text-white" value="Posicion router" />
                                        <img src={data.archivoRouter} alt="" />
                                    </Card>
                                </div>
                                <div class="flex justify-center">
                                    <Card className="max-w-md text-center mb-4">
                                        <Label class="text-2xl font-black text-gray-900 dark:text-white" value="Navegacion" />
                                        <img src={data.archivoNavegacion} alt="" />
                                    </Card>
                                </div>

                            </div>

                        ) : null}
                    </Card>
                </div>
            </div>

        </>
    );
}

export default ContratoAdmin;