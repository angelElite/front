import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Carretes from "./carretes";
import Productos from "./productos";
import ProductosIndividuales from "./productoIndividuales";
import Alertas from './tablaAlertas';
import Alert from './alertas';
import CrearProducto from "./crearProducto";
import AltaProducto from "./altaProducto";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Productos" {...a11yProps(0)} />
          <Tab label="Carretes" {...a11yProps(1)} />
          <Tab label="Productos Individuales" {...a11yProps(2)} />
          <Tab label="Alertas" {...a11yProps(3)} />
          <Tab label="Agregar un producto" {...a11yProps(4)} />
          <Tab label="Alta de producto" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Alert/>
        <Productos user={data}/> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Carretes user={data}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ProductosIndividuales user={data}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Alertas/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <CrearProducto></CrearProducto>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <AltaProducto/>
      </CustomTabPanel>
    </Box>
  );
}
