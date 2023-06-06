import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CachedIcon from "@mui/icons-material/Cached";
import UserPopover from "./UserPopover";
import { userColumns } from "../../Model";
import CustomPagination from "../CustomPagination";
import WarningIcon from "@mui/icons-material/Warning";

export default function UserTable() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  const fetchUsers = () => {
    fetch("http://localhost:8080/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          } else return Promise.reject(response);
        },
        (error) => {
          setError(true);
        }
      )
      .then((json) => {
        fetch("http://localhost:8080/subscriptionPlans", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })
          .then(
            (response) => {
              if (response.ok) {
                return response.json();
              }
            },
            (error) => {
              setError(true);
            }
          )
          .then((plans) => {
            for (var user of json) {
              user.id = user.userId;
              if (user.planId != null) {
                user.subscription = plans.find(
                  (x) => x.planId === user.planId
                ).name;
              } else {
                user.subscription = "None";
              }
            }
            console.log(json);
            setUsers(json);
          });
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleReload = () => {
    handleOpen();
    fetchUsers();
    setTimeout(() => {
      handleClose();
    }, 500);
  };

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  return (
    <div className="table">
      <Backdrop
        sx={{
          color: "#fff",
          fontFamily: "Roboto",
          fontSize: 15,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
        }}
        open={error}
      >
        <WarningIcon fontSize="large" />
        <h1>Something went wrong</h1>
        <p>Please check connection to server</p>
      </Backdrop>
      <div className="table-heading">
        <h1>Manage Users</h1>
        <div className="button-container">
          <IconButton onClick={handleReload}>
            <CachedIcon />
          </IconButton>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <UserPopover />
        </div>
      </div>
      <DataGrid
        rows={users}
        columns={userColumns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slots={{
          pagination: CustomPagination,
        }}
        pageSizeOptions={[10, 30]}
      />
    </div>
  );
}
