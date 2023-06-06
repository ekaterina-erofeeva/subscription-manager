import { React, useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { LoadingButton } from "@mui/lab";

export default function UserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  const fetchSubscriptionPlans = () => {
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

  const addUser = () => {
    setLoading(true);
    try {
      fetch("http://localhost:8080/addUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
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

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  return (
    <div className="popover-contents">
      <form className="new-user-container" autoComplete="off">
        <TextField
          id="first-name"
          label="First Name"
          required
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setSubmitEnabled(validateFormData(e.target.value, lastName, email));
          }}
          error={validateName(firstName)}
          helperText={
            validateName(firstName) ? "Please enter only characters" : ""
          }
          margin="normal"
        />
        <TextField
          id="last-name"
          label="Last Name"
          required
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setSubmitEnabled(
              validateFormData(firstName, e.target.value, email)
            );
          }}
          error={validateName(lastName)}
          helperText={
            validateName(lastName) ? "Please enter only characters" : ""
          }
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSubmitEnabled(
              validateFormData(firstName, lastName, e.target.value)
            );
          }}
          error={validateEmail(email)}
          helperText={validateEmail(email) ? "Please enter a valid email" : ""}
          margin="normal"
        />
        <TextField
          sx={{ minWidth: 130 }}
          id="select-plan"
          select
          label="Subscription"
          variant="outlined"
          value={plan}
          onChange={(e) => {
            setPlan(e.target.value);
          }}
        >
          <MenuItem value={0} key={0}>
            None
          </MenuItem>
          {subscriptionPlans.map((plan) => (
            <MenuItem value={plan.planId} key={plan.planId}>
              {plan.name}
            </MenuItem>
          ))}
        </TextField>
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
          addUser();
        }}
      >
        Save user
        <SaveAltIcon />
      </LoadingButton>
      {error ? <p>{errorMessage}</p> : <p></p>}
    </div>
  );
}

function validateName(name) {
  return name !== "" && !name.match(new RegExp(/^[A-Za-z]+$/));
}

function validateEmail(email) {
  return (
    email !== "" &&
    !email.match(
      new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
  );
}

function validateFormData(firstName, lastName, email) {
  return (
    !validateName(firstName) &&
    !validateName(lastName) &&
    !validateEmail(email) &&
    firstName !== "" &&
    lastName !== "" &&
    email !== ""
  );
}
