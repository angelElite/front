import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Blockquote } from 'flowbite-react';

function Login({ onLogin, setUser }) {
  const [openModal, setOpenModal] = useState(true);
  const [form, setForm] = useState({
    correo_electronico: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  function onCloseModal() {
    setOpenModal(false);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/sistemaSolit/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("accessToken", data.access);
        onLogin(data);
        
        setUser(data.user);
       
        
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Error logging in");
    }
  };
 
  return (
    <>
      <Modal show={openModal} size="md" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
         
           
            <div>
                <img src="../assets/LogoEmpresa.png" alt=""  />
            </div>
            <Blockquote className='text-center'>
            Bienvenidos al Sistema SOLIT
            </Blockquote>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Correo Electronico:" />
              </div>
              <TextInput
                id="correo_electronico"
                placeholder="Ejemplo@gmail.com"
                value={form.correo_electronico}
                onChange={(e) => setForm({ ...form, correo_electronico: e.target.value })}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Contraseña:" />
              </div>
              <TextInput 
                id="password" 
                type="password" 
                required 
                value={form.password}
                onChange={(e) =>
                setForm({ ...form, password: e.target.value })
                }/>
            </div>

            <div className="w-full">
              <Button
              color='blue'
              type='submit'
              onClick={(e) => (e.preventDefault(), handleLogin(e))}
              >Iniciar Sesion</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
              ¿No tienes cuenta? comunicate en el area de administración.
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Login;