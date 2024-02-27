 import { useState } from "react";

 export default function useFormulario(initialValues) {

   const [values, setValues] = useState(initialValues);

   const handleChange = (event) => {
     const { name, value } = event.target;
     setValues((prevValues) => ({
       ...prevValues,
       [name]: value,
     }));
   };

   const handleSubmit = (event, onSubmitCallback) => {
     event.preventDefault();
    //  Puedes realizar alguna lógica adicional antes de llamar a la devolución de llamada
     if (onSubmitCallback) {
       onSubmitCallback(values);
     }
   };
   return {
     values,
     handleChange,
    
     handleSubmit,
   };
 }

// import { useState } from "react";

// export default function useFormulario(initialValues) {
//   const [values, setValues] = useState(initialValues);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   // Funciones para manejar las firmas
//   const setFirmaCliente = (firmaCliente) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       prefirma_cliente: firmaCliente,
//     }));
//   };

//   const setFirmaTrabajador = (firmaTrabajador) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       prefirma_trabajador: firmaTrabajador,
//     }));
//   };

//   const handleSubmit = (event, onSubmitCallback) => {
//     event.preventDefault();
//     // Puedes realizar alguna lógica adicional antes de llamar a la devolución de llamada
//     if (onSubmitCallback) {
//       onSubmitCallback(values);
//     }
//   };

//   return {
//     values,
//     handleChange,
//     setFirmaCliente,
//     setFirmaTrabajador,
//     handleSubmit,
//   };
// }