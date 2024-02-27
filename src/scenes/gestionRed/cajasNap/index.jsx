import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataContacts } from "../../../data/mockData";
import { useTheme } from "@mui/material";
import Header from "../../../components/Header";
function CajasNap() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "nombre",
      headerName: "nombre",
      flex: 1,
    },
    {
      field: "ubicacion",
      headerName: "ubicacion",
      flex: 1,
    },
    {
      field: "coordenadas",
      headerName: "coordenadas",
      flex: 1,
    },
    {
      field: "capacidad",
      headerName: "capacidad",
      flex: 1,
    },
    {
      field: "fecha_instalacion",
      headerName: "fecha_instalacion",
      flex: 1,
    },
    {
      field: "descripcion",
      headerName: "descripcion",
      flex: 1,
    },
  ];
  return (
    <Box m="20px">
      <Header
        title="CAJAS NAP"
        subtitle="Lista de cajas nap"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}

export default CajasNap;
