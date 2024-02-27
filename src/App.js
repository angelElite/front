import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Smartolt from "./scenes/gestionRed/smarolt";
import CajasNap from "./scenes/gestionRed/cajasNap";
import Inventario from "./scenes/almacen/inventario";
import Merma from "./scenes/almacen/merma";
import ContratosEchos from "./scenes/almacen/inventario/contratos";
import Fucionador from "./scenes/almacen/fucionador";
import CartaResponsiva from "./scenes/almacen/cartaResponsiva";
import Tecnico from "./scenes/almacen/tecnico";
import Login from "./scenes/login/";
import Permisos from "./scenes/almacen/inventario/permisos";
import Usuario from "./scenes/almacen/usuarios";
import Contrato from "./scenes/almacen/inventario/cartas/contrato";
import Historial from './scenes/almacen/inventario/historial'
import ContratosEmpledos from "./scenes/almacen/cartaResponsiva/contratosEmpledos";
import ContratoAdmin from "./scenes/almacen/inventario/cartas/contratoAdmin";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Agrega el estado para almacenar el rol del usuario
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setLoggedIn(true);
    setUserRole(userData.user.tipo_rol); // Almacena el rol del usuario después de iniciar sesión
    setUser(userData)
  };
//contratosEmpledos
  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn ? (
            <>
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                 
                  <Route path="/team" element={<Team />} />
                  {/* Otras rutas comunes para todos los roles */}
                  {userRole === "admin" && (
                    <>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/contacts" element={<Contacts />} />
                      <Route path="/invoices" element={<Invoices />} />
                      <Route path="/form" element={<Form />} />
                      <Route path="/bar" element={<Bar />} />
                      <Route path="/pie" element={<Pie />} />
                      <Route path="/line" element={<Line />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/geography" element={<Geography />} />
                      <Route path="/gestionRed/smartolt" element={<Smartolt />} />
                      <Route path="/gestionRed/cajasNap" element={<CajasNap />} />
                      <Route path="/almacen/inventario" element={<Inventario data = {user}/>} />
                      <Route path="/almacen/merma" element={<Merma  data = {user}/>} />
                      <Route path="/almacen/fucionador" element={<Fucionador data = {user}/>} />
                      <Route path="/almacen/tecnico" element={<Tecnico data ={user}/>} />
                      <Route path="/almacen/usuario" element={<Usuario data = {user}/>} />
                      <Route path="/almacen/permisos" element={<Permisos user = {user}/>}/>
                      
                      
                      <Route path="/almacen/contratosEchos" element={<ContratosEchos data={user}/>}/>
                      <Route path="/almacen/contratosEchos/contratoAdmin/:id" element={<ContratoAdmin/>}/>
                      <Route path="/almacen/cartaResponsiva" element={<CartaResponsiva data={user}/>}/>

                      <Route path="/almacen/contrato" element={<Contrato data = {user}/>}/>
                      <Route path="/almacen/historial" element={< Historial/>}/>
                      <Route path="/almacen/contratosEmpledos" element={< ContratosEmpledos data = {user}/>}/>
                      
                    </>
                  )}
                  {userRole === "tecnico" && (
                  <>
                   <Route path="/almacen/tecnico" element={<Tecnico data={user}/>} />
                   <Route path="/almacen/contrato" element={<Contrato data = {user}/>}/>
                  </>
                    
                  )}
                   {userRole === "fucion" && (
                    
                  <>
                  <Route path="/almacen/fucionador" element={<Fucionador data = {user}/>} />
                  <Route path="/almacen/cartaResponsiva" element={<CartaResponsiva />}/>

                     
                  </>
                    
                  )}
                </Routes>
              </main>
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
   
  );
}

export default App;

