import {
    Label,
    TextInput,
    Card,
    Textarea,
    Radio,
    Select
} from "flowbite-react";
import Modall from "../../../components/Modal";
import { useState, useEffect } from "react";
import useFormulario from "../../../hooks/useFormulario";
import { fetchData, postData } from "../../../hooks/api";
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { IconButton } from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';


function CrearCResponsiva() {
    const [openModal, setOpenModal] = useState(true);
    const [modo, setModo] = useState("Crear");
    const [data, setData] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);
    const { values, handleChange, handleSubmit } = useFormulario({
        nombre_usuario: "no ha seleccionado a nadie",
        productos: "",
        status: "Activo"
    });
    useEffect(() => {
        const usuarios = async () => {
            try {
                const result = await fetchData(
                    "http://127.0.0.1:8000/api/sistemaSolit/almacenUsuarios/"
                )
                setData(result);
            } catch (error) {
                console.log("no se realizo la peticion", error)
            }
        }
        usuarios(); // Llamada a la función para obtener los datos al montar el componente
    }, []);

    console.log(values);
    // Cerrar el modal
    const handleDecline = () => {
        setOpenModal(false);
        setShowToast3(true);
        setShowToast2(true);
    };
    const todosLosCamposLlenos = Object.values(values).every(
        (value) => value !== null && value !== ""
    );

    const activate = () => {
        try {
            const formData = new FormData();
            formData.append("productos", values.productos);
            formData.append("status", values.status);
            formData.append("nombre_usuario", values.nombre_usuario);
            fetch(
                `http://localhost:8000/api/sistemaSolit/almacenContratoFucionador/`,
                {
                    method: "POST",
                    body: formData,
                }
            );
        } catch (error) {
            console.log("no jala", error);
        }
        // } else {
        // setOpenModal(false);
        // setShowToast2(true);
        // setShowToast3(true);
    };

    return (
        <>
            <Modall
                title="Crear carta responsiva"
                content={
                    <>
                        <Card>
                            <form
                                id="complet"
                                className="flex flex-col gap-4"
                                onSubmit={(e) => {
                                    e.preventDefault(); // Evitar el envío por defecto del formulario
                                }}
                            >

                                <div class="columns-2">
                                    <div className="mb-2 block">
                                        <Label htmlFor="nombre_usuario" value="Nombre del usuario:" />
                                        <TextInput
                                            disabled
                                            type="text"
                                            onChange={handleChange}
                                            value={values.nombre_usuario}
                                        />
                                    </div>

                                    <div className="mb-2 block">
                                        <Label htmlFor="" value="Buscar usuario:" />
                                        <PersonSearchIcon />
                                        <Select id="usuarios" name="nombre_usuario" onChange={handleChange}>
                                            {data.map(usuario => (
                                                <option key={usuario.id} value={usuario.nombre_completo}>{usuario.nombre_completo} </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <div className="mb-2 block">
                                    <Label htmlFor="equipo_trabajo" value="Equipo de trabajo:" />

                                    <Textarea
                                        id="equipo_trabajo"
                                        type="text"
                                        name="productos"
                                        onChange={handleChange}
                                    />
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
export default CrearCResponsiva;