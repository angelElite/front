import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import RestoreIcon from '@mui/icons-material/Restore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DescriptionIcon from '@mui/icons-material/Description';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{

        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 40px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}

          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Sistema Solit
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="start">
                <img
                  alt="profile-user"
                  width="200px"
                  height="80px"
                  src={`../../assets/LogoEmpresa.png`}
                  style={{ cursor: "pointer", borderRadius: "0%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Tehuacan
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Wireless & Fibra Optica
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Inicio"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Almacen
            </Typography>
            <Item
              title="Inventario"
              to="/almacen/inventario"
              icon={<StoreIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Usuarios"
              to="/almacen/usuario"
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Merma"
              to="/almacen/merma"
              icon={<ProductionQuantityLimitsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Accesos"
              to="/almacen/permisos"
              icon={<SettingsAccessibilityIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contratos clinetes"
              to="/almacen/contratosEchos"
              icon={<GavelIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Historial"
              to="/almacen/historial"
              icon={<RestoreIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Constratos empledos"
              to="/almacen/cartaResponsiva"
              icon={< PeopleAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Fucionador
            </Typography>
            <Item
              title="Peticion Fusionador"
              to="/almacen/fucionador"
              icon={<CloseFullscreenIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Tecnico
            </Typography>
            <Item
              title="Peticion Tecnicos"
              to="/almacen/tecnico"
              icon={<SelfImprovementIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contrato"
              to="/almacen/contrato"
              icon={<DescriptionIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
