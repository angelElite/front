import { useTheme, Box, Typography, IconButton } from "@mui/material";
import { React } from "react";
import { tokens } from "../../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular0BarIcon from "@mui/icons-material/SignalCellular0Bar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import useApiRequest from "../../../hooks/useGestionRed";
import Modall from "../../../components/Modal";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useState } from "react";
import { Spinner } from "flowbite-react";
function OnusConfigurados() {
  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  //funcion importado para hacer las peticiones
  const { data, loading, error } = useApiRequest(
    "http://localhost:8000/gestion_red/api/olt/data/","GET");
  const dataRouningConfig = useApiRequest(
    `http://localhost:8000/gestion_red/api/olt/get-rounting-config/?ip=${id}`,
    "GET"
  );
  const dataFullOnus = useApiRequest(
    `http://localhost:8000/gestion_red/api/olt/get-onu-status/?ip=${id}`,
    "GET"
  );

  /***
   * <showModal
        title="modal1"
        content={<div>hola</div>}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
   */
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onu =
    data.onus_data?.["2"]?.onus?.map((onuItem, index) => ({
      ...onuItem,
      id: onuItem.unique_external_id || index,
    })) || [];

  //onClick={() => (getOnusFullStatus(params.row.unique_external_id),setOpenModal(true))}

  const handleAccept = () => {
    // Perform actions when "I accept" is clicked
    setOpenModal(false);
  };

  const handleDecline = () => {
    // Perform actions when "Decline" is clicked
    setOpenModal(false);
  };
  const columnsClientePPPoE = [
    {
      field: "unique_external_id",
      headerName: "external id",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "name",
      flex: 1.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "sn",
      headerName: "sn",
      flex: 1,
    },
    {
      field: "olt_name",
      headerName: "olt_name",
      flex: 1,
    },
    {
      field: "status",
      headerName: "status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "Online"
                ? colors.blueAccent[700]
                : status === "Offline"
                ? colors.primary[300]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {status === "Online" && <ThumbUpIcon />}
            {status === "Offline" && <ThumbDownAltIcon />}

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "board",
      headerName: "board",
      flex: 0.5,
    },
    {
      field: "port",
      headerName: "port",
      flex: 0.5,
    },
    {
      field: "signal",
      headerName: "signal",
      flex: 1,
      renderCell: ({ row: { signal } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              signal === "Warning"
                ? colors.primary[700]
                : signal === "Very good"
                ? colors.greenAccent[700]
                : signal === "Critical"
                ? colors.redAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {signal === "Warning" && <SignalCellular1BarIcon />}
            {signal === "Very good" && <SignalCellular4BarIcon />}
            {signal === "Critical" && <SignalCellular0BarIcon />}

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {signal}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "signal_1310",
      headerName: "signal_1310",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              setId(params.row.unique_external_id);
              setOpenModal(true);
            }}
          >
            <AccessTimeFilledIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setId(params.row.unique_external_id);
              setOpenModal(true);
            }}
          >
            <AccessTimeFilledIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  //172.16.15.124
  /**
   *--usuario sistema
   * --  Changarr0**
   */
  return (
    <Box m="10px">
      <Box
        m="5px 0 0 0"
        height="65vh"
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
        }}
      >
        {onu && (
          <DataGrid
            rows={onu}
            columns={columnsClientePPPoE}
            components={{ Toolbar: GridToolbar }}
          />
        )}

        <Modall
          title="Título del Modal"
          content={
            dataRouningConfig.loading ? (
              <div className="text-center">
                <Spinner aria-label="Extra large spinner example" size="xl" />
              </div>
            ) : (
              <pre style={{ fontSize: "smaller" }}>
                {dataRouningConfig.data.running_config}
              </pre>
            )
          }
          onAccept={handleAccept}
          onDecline={handleDecline}
          setOpenModalProp={setOpenModal}
          openModal={openModal}
        />

        <Modall
          title="Título del Modal"
          content={
            dataFullOnus.loading ? (
              <div className="text-center">
                <Spinner aria-label="Extra large spinner example" size="xl" />
              </div>
            ) : (
              <pre style={{ fontSize: "smaller" }}>
                {dataFullOnus.data.full_status_info}
              </pre>
            )
          }
          onAccept={handleAccept}
          onDecline={handleDecline}
          setOpenModalProp={setOpenModal}
          openModal={openModal}
        />
      </Box>
    </Box>
  );
}
export default OnusConfigurados;
