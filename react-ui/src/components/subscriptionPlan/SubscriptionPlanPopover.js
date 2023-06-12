import { useState } from "react";
import { IconButton, Popover } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SubscriptionPlanForm from "./SubscriptionPlanForm";

export default function SubscriptionPlanPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <PersonAddAlt1Icon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <SubscriptionPlanForm />
      </Popover>
    </div>
  );
}
