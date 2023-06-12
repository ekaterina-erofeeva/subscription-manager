import { React, useState } from "react";
import { TextField } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { LoadingButton } from "@mui/lab";

export default function SubscriptionPlanForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addSubscription = () => {
    setLoading(true);
    try {
      fetch("http://localhost:8080/addSubscriptionPlan", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: price,
        }),
      })
        .then((response) => {
          if (response.ok) {
            setTimeout(() => {
              setLoading(false);
            }, 800);
            console.log("Sucess");
          } else {
            setLoading(false);
            setError(true);
            return response.text();
          }
        })
        .then((errorMessage) => setErrorMessage(errorMessage));
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <div className="popover-contents">
      <form className="new-user-container" autoComplete="off">
        <TextField
          id="name"
          label="Name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSubmitEnabled(validateFormData(e.target.value, price));
          }}
          error={validateName(name)}
          helperText={validateName(name) ? "Please enter only characters" : ""}
          margin="normal"
        />
        <TextField
          id="price"
          label="Price"
          required
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setSubmitEnabled(validateFormData(name, e.target.value));
          }}
          error={validatePrice(price)}
          helperText={
            validatePrice(price)
              ? "Please enter a valid  number from 0 to 99.99"
              : ""
          }
          margin="normal"
        />
      </form>
      <LoadingButton
        sx={{
          fontSize: 15,
          fontFamily: "Roboto",
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
        loading={loading}
        disabled={!submitEnabled}
        onClick={() => {
          addSubscription();
        }}
      >
        Save subscription plan
        <SaveAltIcon />
      </LoadingButton>
      {error ? <p>{errorMessage}</p> : <p></p>}
    </div>
  );
}

function validateName(name) {
  return name !== "" && !name.match(new RegExp(/^[A-Za-z]+$/));
}

function validatePrice(price) {
  return (
    price !== "" &&
    !price.match(new RegExp(/^(\d{1,2}|\d{0,2}\.\d{1,2}|\d{0,2})$/))
  );
}

function validateFormData(name, price) {
  return (
    !validateName(name) && !validatePrice(price) && name !== "" && price !== ""
  );
}
