import { Icon } from "@iconify/react";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import numeral from "numeral";
import { getAdminAppStats } from "../../../features/appointment/appointmentActions";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: "white",
  backgroundColor: "#630406",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------



export default function TotalAppointments() {
  const dispatch = useDispatch();

  const { all_no_appointments } = useSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(getAdminAppStats());
  }, [dispatch]);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="wpf:doctors-bag" width="26" height="26" />
      </IconWrapperStyle>
      <Typography variant="h3">
        {numeral(all_no_appointments).format()}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72, fontSize: 20 }}>
        Total Appointments
      </Typography>
    </RootStyle>
  );
}
