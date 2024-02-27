import { useTheme, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import {React} from "react";
import { tokens } from "../../../theme";
import useApiRequest from "../../../hooks/useGestionRed";
function VlanConfigurados() {
  const { data,loading,error} = useApiRequest("http://localhost:8000/gestion_red/api/olt/vlans/","GET")
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columnsVLAS = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
  },
    {
        field: "vlan",
        headerName: "vlan",
        flex: 1,
    },
    {
        field: "description",
        headerName: "description",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "olt_id",
        headerName: "olt_id",
        flex: 1,
    },
    {
        field: "scope",
        headerName: "scope",
        flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Vlans configurados"
        subtitle="Lista de vlans configurados en la olt"
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
        {data.vlans && 
          <DataGrid
            rows={data.vlans}
            columns={columnsVLAS}
            components={{ Toolbar: GridToolbar }}
          />
        }
      </Box>
    </Box>
  );
}

export default VlanConfigurados;
