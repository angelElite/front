import { useTheme, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import {React} from "react";
import { tokens } from "../../../theme";
import useApiRequest from "../../../hooks/useGestionRed";
function ZonasConfigurados() {
  const { data,loading,error} = useApiRequest("http://localhost:8000/gestion_red/api/olt/get_zones/","GET")
 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  

  const columsZones = [
    {
    field: "id",
    headerName: "id",
    flex: 1,
    },
    {
        field: "name",
        headerName: "name",
        flex: 1,
    },
  ];
  return (
    <Box m="20px">
   
  
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
      {data.response && 
        <DataGrid
          rows={data.response}
          columns={columsZones}
          components={{ Toolbar: GridToolbar }}
        />
      }
    </Box>
  </Box>
  )
}

export default ZonasConfigurados;
