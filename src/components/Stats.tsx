import {
  Box,
  LinearProgress,
  linearProgressClasses,
  LinearProgressProps,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export function Stats(props: {
  loading: boolean;
  totalImages?: number;
  totalVerifiedImages?: number;
  verifiedDucks?: number;
  verifiedNotDucks?: number;
}) {
  let progress = (props.totalVerifiedImages ?? 0) / (props.totalImages ?? 1);
  let verifiedDucks = props.verifiedDucks ?? 0;
  let verifiedNotDucks = props.verifiedNotDucks ?? 0;

  let verifiedDucksPercentage =
    verifiedDucks / (verifiedDucks + verifiedNotDucks);
  return (
    <Stack alignItems="center" sx={{ width: "100%" }}>
      <Typography variant="body1" textAlign="center">
        {props.totalImages} / {props.totalVerifiedImages}
      </Typography>
      <Box sx={{ width: "100%" }}>
        {props.loading ? (
          <LinearProgress />
        ) : (
          <LinearProgressWithLabel value={progress * 100} />
        )}
      </Box>
      <Typography variant="h5" textAlign="center" sx={{ mt: 3 }}>
        Verified duck percentage
      </Typography>
      <Typography variant="h5" sx={{ mt: 3 }}>
        {(verifiedDucksPercentage * 100).toFixed(2)} %
      </Typography>
    </Stack>
  );
}
