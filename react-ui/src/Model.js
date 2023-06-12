import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const userColumns = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "email", headerName: "Email", width: 180 },
  { field: "subscription", headerName: "Subscription", width: 130 },
  {
    field: "edit",
    headerName: "",
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const onClick = (e) => {
        console.log("Edit ID " + params.id);
      };

      return (
        <IconButton variant="text" className="edit-button" onClick={onClick}>
          <EditIcon />
        </IconButton>
      );
    },
  },
  {
    field: "delete",
    headerName: "",
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const onClick = (e) => {
        console.log("Delete ID " + params.id);
        fetch(`http://localhost:8080/users/${params.id}`, {
          method: "DELETE",
        }).then((result) => {
          console.log(result);
        });
      };

      return (
        <IconButton onClick={onClick}>
          <DeleteForeverIcon />
        </IconButton>
      );
    },
  },
];

export const subscriptionColumns = [
  {
    field: "name",
    headerName: "Name",
    headerClassName: "theme-header",
    sortable: false,
    disableColumnMenu: true,
    headerAlignment: "left",
    width: 80,
  },
  {
    field: "price",
    headerName: "Subscription Price",
    headerClassName: "theme-header",
    disableColumnMenu: true,
    sortable: true,
    type: "number",
    width: 160,
  },
  {
    field: "services",
    headerName: "Services",
    headerClassName: "theme-header",
    disableColumnMenu: true,
    sortable: false,
    width: 160,
  },
  {
    field: "edit",
    headerName: "",
    headerClassName: "theme-header",
    sortable: false,
    disableColumnMenu: true,
    width: 60,
    renderCell: (params) => {
      const onClick = (e) => {
        console.log("Edit ID " + params.id);
      };

      return (
        <IconButton variant="text" className="edit-button" onClick={onClick}>
          <EditIcon />
        </IconButton>
      );
    },
  },
  {
    field: "delete",
    headerName: "",
    headerClassName: "theme-header",
    sortable: false,
    disableColumnMenu: true,
    width: 60,
    renderCell: (params) => {
      const onClick = (e) => {
        console.log("Delete ID " + params.id);
        fetch(`http://localhost:8080/subscriptionPlans/${params.id}`, {
          method: "DELETE",
        }).then((result) => {
          console.log(result);
        });
      };

      return (
        <IconButton onClick={onClick}>
          <DeleteForeverIcon />
        </IconButton>
      );
    },
  },
];
