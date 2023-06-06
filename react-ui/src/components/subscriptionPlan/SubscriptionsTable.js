import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { subscriptionColumns } from "../../Model";
import CustomPagination from "../CustomPagination";

export default function SubscriptionsTable() {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const fetchData = () => {
    fetch("http://localhost:8080/subscriptionPlans", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        for (var plan of json) {
          plan.id = plan.planId;
        }
        setSubscriptionPlans(json);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="table">
      <div className="table-heading">
        <h1>Manage Subscription Plans</h1>
        <Button className="add-button" variant="outlined">
          Add
        </Button>
      </div>
      <DataGrid
        sx={{ fontWeight: "fontWeightLight" }}
        rows={subscriptionPlans}
        columns={subscriptionColumns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slots={{
          pagination: CustomPagination,
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
