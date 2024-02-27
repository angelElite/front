import React, { useState, useRef } from "react";
import Logo from "./LogoEmpresa.png";
import { Button } from "flowbite-react";
import useFormulario from "../../../../hooks/useFormulario";
import { Label, TextInput, Card, Radio, FileInput } from "flowbite-react";
import Modall from "../../../../components/Modal";
import CanvasDraw from "react-canvas-draw";
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';

const Contrato = ({ data }) => {
  const { values, handleChange, handleSubmit } = useFormulario({
    telefono_cliente: "",
    nombre_cliente: "",
    direccion_cliente: "",
    tipo_servicio: "",
    observaciones: "",
    zona:"",
    nombre_instalador: data.user.nombre_completo,
    //fibra//
    fserieRouter: "",
    fclave: "",
    fterminal: "",
    fpuerto: "",
    fPTerminalDB: "",
    fpotenciaOntDb: "",
    fcableCordonCircularFO: 0,
    fconectorPrepulido: 0,
    fontOnu: 0,
    frouter: 0,
    froseta: 0,
    fgrapas: 0,
    ftensorParaAcometida: 0,
    fcintaDeAislar: 0,
    fjumper: 0,
    ftaqueteDePlastico: 0,
    farmella: 0,
    fpijas: 0,
    falcohol: 0,
    ftoallas: 0,
    //antena//
    wserieRouter: "",
    wclave: "",
    wsNAntena: "",
    wmodelo: "",
    wcableUTP: 0,
    wconectorRJ45: 0,
    wantena: 0,
    wrouter: 0,
    wtaqueteDePlastico: 0,
    wargolla: 0,
    wmastil: 0,
    wsujetadorGrapas: 0,
    wcintaDeAislar: 0,
    wcintiuronNylon: 0,
    wselloPasamuros: 0,
    otros: "",
    archivo: null
  });

  const trabajadorCanvasRef = useRef(null);
  const clienteCanvasRef = useRef(null);
  const [mostrar, setMostrar] = useState(true);
  const [terminalImage, setTerminalImage] = useState(null);
  const [routerImage, setRouterImage] = useState(null);
  const [pTerminalDBImage, setPTerminalDBImage] = useState(null);
  const [fotoPosicionAntenaImage, setfotoPosicionAntenaImage] = useState(null);
  const [capturaInformacionImage, setFileImage] = useState(null);
  const [navegacionImage, setNavegacionImage] = useState(null);
  const [alert, setAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fieldName = event.target.id;
    if (fieldName === 'file1') {
      setTerminalImage(file);
    } else if (fieldName === 'file2') {
      setRouterImage(file);
    } else if (fieldName === 'file3') {
      setPTerminalDBImage(file);
    } else if (fieldName === 'file4') {
      setfotoPosicionAntenaImage(file);
    } else if (fieldName === 'file5') {
      setFileImage(file);
    } else if (fieldName === 'file6') {
      setNavegacionImage(file);
    }
  };
  const HadDecline = () => {
    setOpenModal(false);
  }


  const crearInstalacion = async () => {



    const formData = new FormData();
    const firma_cliente = clienteCanvasRef.current.getSaveData();
    const firma_trabajador = trabajadorCanvasRef.current.getSaveData();
    const concaValoresFibra = {
      "zona":`${values.zona}`,
      "Serie Router": `${values.fserieRouter}`,
      "Contraseña": `${values.fclave}`,
      "Terminal": `${values.fterminal}`,
      "Puerto": `${values.fpuerto}`,
      "P-Terminal DB": `${values.fPTerminalDB}`,
      "Potencia ONT DB": `${values.fpotenciaOntDb}`,
      "Cable cordon cirular F.O": `${values.fcableCordonCircularFO}`,
      "Conector prepolido": `${values.fconectorPrepulido}`,
      "ONT / ONU": `${values.fontOnu}`,
      "Router": `${values.frouter}`,
      "Roseta": `${values.froseta}`,
      "Grapas": `${values.fgrapas}`,
      "Tensor para acometida": `${values.ftensorParaAcometida}`,
      "Cinta de aislar": `${values.fcintaDeAislar}`,
      "Jumper": `${values.fjumper}`,
      "Taquete de plastico": `${values.ftaqueteDePlastico}`,
      "Armella": `${values.farmella}`,
      "Pijas": `${values.fpijas}`,
      "Alcohol": `${values.falcohol}`,
      "Toallas": `${values.ftoallas}`,
      "otros": `${values.otros}`
    };

    const concaValoresAntena = {
      "zona":`${values.zona}`,
      "Serie Router": `${values.wserieRouter}`,
      "Contraseña": `${values.wclave}`,
      "S/N antena": `${values.wsNAntena}`,
      "Modelo": `${values.wmodelo}`,
      "Cable UTP": `${values.wcableUTP}`,
      "Conector RJ-45": `${values.wconectorRJ45}`,
      "Antena": `${values.wantena}`,
      "Router": `${values.wrouter}`,
      "Taquete de plastico": `${values.wtaqueteDePlastico}`,
      "Argolla": `${values.wargolla}`,
      "Mastil": `${values.wmastil}`,
      "Sujetador/Grapas": `${values.wsujetadorGrapas}`,
      "Cinta de aislar": `${values.wcintaDeAislar}`,
      "Cinturon nylon": `${values.wcintiuronNylon}`,
      "Sello pasamuros": `${values.wselloPasamuros}`,
      "otros": `${values.otros}`
    };
    const objetoAntena = JSON.stringify(concaValoresAntena);
    const objetoFibra = JSON.stringify(concaValoresFibra);


    formData.append("telefono_cliente", values.telefono_cliente);
    formData.append("nombre_cliente", values.nombre_cliente);
    formData.append("tipo_servicio", values.tipo_servicio);
    formData.append("nombre_instalador", values.nombre_instalador);
    formData.append("direccion_cliente", values.direccion_cliente);
    formData.append("observaciones", values.observaciones);
    formData.append("prefirma_trabajador", firma_trabajador);
    formData.append("prefirma_cliente", firma_cliente);
    let fotosRequeridasPresentes = false;
    if (mostrar) {
      formData.append("informacionFibra", objetoFibra);
      formData.append("informacionAntena", null);
      formData.append("archivoTerminal", terminalImage);
      formData.append("archivoRouter", routerImage);
      formData.append("archivoPTerminal", pTerminalDBImage);
      formData.append("archivoNavegacion", navegacionImage);
      fotosRequeridasPresentes = Boolean(terminalImage && routerImage && pTerminalDBImage && navegacionImage);
    } else {
      formData.append("informacionAntena", objetoAntena);
      formData.append("informacionFibra", null);
      formData.append("archivoPosicionAntena", fotoPosicionAntenaImage);
      formData.append("archivoInformacionAntena", capturaInformacionImage);
      formData.append("archivoNavegacion", navegacionImage);

      fotosRequeridasPresentes = Boolean(fotoPosicionAntenaImage && capturaInformacionImage && navegacionImage);
    }

    if (fotosRequeridasPresentes) {
      try {
        await fetch("http://localhost:8000/api/sistemaSolit/almacenMaterialInstalacion/", {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      }
    } else {
      setAlert(true);

    };
  }
  return (
    <>
      <Card className="">

        <div class="flex justify-center ...">
          <img src={Logo} alt="" />
        </div>

        <div id="pdf-content" class="">
          <p class="text-2xl font-black text-gray-900 dark:text-white flex justify-center ...">
            Orden de servicio
          </p>


          <form
            id="complet"
            onSubmit={(e) => {
              e.preventDefault(); // Evitar el envío por defecto del formulario
            }}
          >
            <div className="flex flex-row gap-2">
              <div class="basis-1/2">
                <Label htmlFor="tipo_servicio" value="Tipo de servicio:" />

                <TextInput
                  type="text"
                  name="tipo_servicio"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="basis-1/2">
                <Label htmlFor="nombre_cliente" value="Nombre del cliente:" />
                <TextInput
                  type="text"
                  name="nombre_cliente"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="basis-1/2">
                <Label htmlFor="fecha" value="Fecha:" />
                <TextInput
                  type="date"
                  name="fecha"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="basis-1/2">
                <Label htmlFor="telefono_cliente" value="Telefono:" />
                <TextInput
                  type="tel"
                  maxLength="10"
                  name="telefono_cliente"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="basis-1/2">
                <Label htmlFor="direccion_cliente" value="Direccion:" />
                <TextInput
                  type="text"
                  name="direccion_cliente"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="basis-1/2">
                <Label htmlFor="stock_minimo" value="Colonia:" />
                <TextInput
                  id="stock_minimo"
                  min="1"
                  type="text"
                  name="stock_minimo"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="observaciones" value="Observaciones:" />
              <TextInput
                id="observaciones"
                type="text"
                name="observaciones"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex items-center gap-2">
                <Radio
                  id="united-state"
                  name="zona"
                  value=""
                  onChange={handleChange}
                />
                <Label htmlFor="united-state">Soporte tecnico</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="germany"
                  name="zona"
                  value="Activacion de puerto"
                  onChange={handleChange}
                />
                <Label htmlFor="germany">Activacion de puerto</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="spain"
                  name="zona"
                  value="Cambio de domicilio"
                  onChange={handleChange}
                />
                <Label htmlFor="spain">Cambio de domicilio</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="uk"
                  name="zona"
                  value="Migracion"
                  onChange={handleChange}
                />
                <Label htmlFor="uk">Migracion</Label>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="basis-1/2">
                <div className="text-center">
                  <Radio
                    checked={mostrar}
                    //name="mostrar"
                    onChange={() => setMostrar(!mostrar)}
                  />
                  <Label htmlFor="uk">Fibra Optica</Label>
                </div>
              </div>
              <div className="basis-1/2">
                <div className="text-center">
                  <Radio
                    checked={!mostrar}
                    //name="mostrar"
                    onChange={() => setMostrar(!mostrar)}
                  />
                  <Label htmlFor="uk">Wireles / Antena</Label>
                </div>
              </div>
            </div>
            <div className="gap-3 text-center">

              {mostrar ? (
                <div className="tex-center">
                  <Label htmlFor="">Serie Router:</Label>
                  <TextInput type="text"
                    name="fserieRouter"
                    onChange={handleChange} />
                  <Label htmlFor="">Contraseña</Label>
                  <TextInput type="text" name="fclave"
                    onChange={handleChange} />
                  <Label htmlFor="">Terminal:</Label>
                  <TextInput type="text" id="" placeholder="" name="fterminal" onChange={handleChange} required />
                  <Label htmlFor="">Puerto:</Label>
                  <TextInput type="text" id="" placeholder="" name="fpuerto" onChange={handleChange} />
                  <Label htmlFor="">P-Terminal DB:</Label>
                  <TextInput type="text" id="" placeholder="" name="fPTerminalDB" onChange={handleChange} />
                  <Label htmlFor="">Potencia ONT DB:</Label>
                  <TextInput type="text" id="" placeholder="" name="fpotenciaOntDb" onChange={handleChange} />
                </div>
              ) : (
                <div className="tex-center">
                  <Label htmlFor="">Serie router:</Label>
                  <TextInput type="text" id="" placeholder="" name="wserieRouter" onChange={handleChange} />
                  <Label htmlFor="">Contraseña:</Label>
                  <TextInput type="text" id="" name="wclave" onChange={handleChange} />
                  <Label htmlFor="">S/N antena:</Label>
                  <TextInput type="text" id="" placeholder="" name="wsNAntena" onChange={handleChange} />
                  <Label htmlFor="">Modelo:</Label>
                  <TextInput type="text" id="" name="wmodelo" onChange={handleChange} />
                </div>
              )}

            </div>
            <div className="text-center">
              <p class="text-2xl font-black text-gray-900 dark:text-white">
                Material utilizado
              </p>
            </div>
            <div class="flex justify-center">
              {mostrar ? (
                <table>
                  <thead>
                    <tr>
                      <th>Fibra optica</th>
                      <th>Cantidad</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cable cordon circular F.O:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          min="0"
                          type="number"
                          name="fcableCordonCircularFO"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Conector prepolido:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          min="0"
                          type="number"
                          name="fconectorPrepulido"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>ONT/ONU:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          min="0"
                          name="fontOnu"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Router:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          min="0"
                          type="number"
                          name="frouter"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Roseta:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          min="0"
                          name="froseta"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Grapas:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          min="0"
                          name="fgrapas"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Tensor para acometida:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          min="0"
                          name="ftensorParaAcometida"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Cinta de aislar:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          min="0"
                          name="fcintaDeAislar"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Jumper:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          min="0"
                          type="number"
                          name="fjumper"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Taquete de plastico:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          name="ftaqueteDePlastico"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Armella:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          name="farmella"
                          onChange={handleChange}
                        ></TextInput>
                      </td>

                    </tr>
                    <tr>
                      <td>Pijas:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          name="fpijas"
                          onChange={handleChange}
                        ></TextInput>
                      </td>
                    </tr>
                    <tr>
                      <td>Alcohol:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          name="falcohol"
                          onChange={handleChange}
                        ></TextInput>
                      </td>
                    </tr>
                    <tr>
                      <td>Tollas:</td>
                      <td>
                        <TextInput
                          class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          type="number"
                          name="ftoallas"
                          onChange={handleChange}
                        ></TextInput>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) :
                (
                  <table >
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
                            placeholder="0"
                            min="0"
                            type="number"
                            name="wcableUTP"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Conector RJ-45:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            min="0"
                            type="number"
                            name="wconectorRJ45"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Antena:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            type="number"
                            min="0"
                            name="wantena"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Router:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            min="0"
                            type="number"
                            name="wrouter"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Taquete de plástico:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            type="number"
                            min="0"
                            name="wtaqueteDePlastico"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Argolla:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            type="number"
                            min="0"
                            name="wargolla"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Mastil:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            type="number"
                            min="0"
                            name="wmastil"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Sujetador / Grapas:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            type="number"
                            min="0"
                            name="wsujetadorGrapas"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Cinta de aislar:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            min="0"
                            type="number"
                            name="wcintaDeAislar"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Cinturón nylon:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            type="number"
                            name="wcintiuronNylon"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                      <tr>
                        <td>Sello pasamuros:</td>
                        <td>
                          <TextInput
                            class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0"
                            type="number"
                            name="wselloPasamuros"
                            onChange={handleChange}
                          ></TextInput>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
            </div>

            <Label htmlFor="" value="Otros:" />
            <TextInput id="" type="text" name="otros"
              onChange={handleChange} />

            <div className="text-center">
              <p class="text-2xl font-black text-gray-900 dark:text-white">
                Evidencias
              </p>
            </div>
            <div className="text-center gap-2">
              {mostrar ? (
                <div>
                  <div id="fileUpload1" className="max-w-sm">
                    <div className="mb-2 block">
                      <Label htmlFor="file1" value="Terminal:" />
                    </div>
                    <FileInput id="file1" required onChange={handleFileChange} />
                  </div>

                  <div id="fileUpload2" className="max-w-sm">
                    <div className="mb-2 block">
                      <Label htmlFor="file2" value="Foto posicion router:" />
                    </div>
                    <FileInput id="file2" required onChange={handleFileChange} />
                  </div>
                  <div id="fileUpload3" className="max-w-sm">
                    <div className="mb-2 block">
                      <Label htmlFor="file3" value="P-Terminal DB:" />
                    </div>
                    <FileInput id="file3" required onChange={handleFileChange} />
                  </div>
                </div>
              ) : (
                <div>
                  <div id="fileUpload4" className="max-w-sm">
                    <div className="mb-2 block">
                      <Label htmlFor="file4" value="Foto pocision de antena:" />
                    </div>
                    <FileInput id="file4" required onChange={handleFileChange} />
                  </div>
                  <div id="fileUpload5" className="max-w-sm">
                    <div className="mb-2 block">
                      <Label htmlFor="file5" value="Captura Informacion antena:" />
                    </div>
                    <FileInput id="file5" required onChange={handleFileChange} />
                  </div>
                </div>
              )}
            </div>
            <div id="fileUpload6" className="max-w-sm text-center">
              <div className="mb-2 block">
                <Label htmlFor="file6" value="Foto navegación:" />
              </div>
              <FileInput id="file6" required onChange={handleFileChange} />
            </div>
            <div>
              <CanvasDraw
                ref={trabajadorCanvasRef}
                brushRadius={1}
                hideGrid={false}
                canvasProps={{ width: 10, height: 10 }} />
              <Label class="block text-sm font-medium text-gray-900 dark:text-white text-start" value="Firma del trabajador:" />
              <CanvasDraw
                brushRadius={1}
                hideGrid={false}
                ref={clienteCanvasRef}
                canvasProps={{ width: 10, height: 10 }} />
              <Label class="block text-sm font-medium text-gray-900 dark:text-white text-start" value="Recibi servicio de conformidad:" />
            </div>
            <div class="flex justify-center ...">
              {alert ? (
                <Alert color="failure" icon={HiInformationCircle}>
                  <span className="font-medium">Faltan fotos requeridas. Por favor, asegúrate de adjuntar todas las fotos necesarias.</span>
                </Alert>
              ) : null}
            </div>
            <div class="flex justify-center ...">

              <Button type="button" onClick={crearInstalacion}>
                Guardar datos
              </Button>
            </div>
          </form>
        </div >
      </Card >
    </>
  );
};

export default Contrato;
