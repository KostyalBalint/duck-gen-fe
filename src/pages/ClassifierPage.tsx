import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

import DoneIcon from "@mui/icons-material/Done";
import React, { useState } from "react";
import {
  GetNonVerifiedImageDocument,
  ImageByIdDocument,
  StatsDocument,
  useGetNonVerifiedImageQuery,
  useStatsQuery,
  useUnVerifyImageMutation,
  useVerifyImageMutation,
} from "../generated/graphql";
import { Stats } from "../components/Stats";
import { UndoRounded } from "@mui/icons-material";

declare type Direction = "left" | "right";

export const ClassifierPage = () => {
  const image = useGetNonVerifiedImageQuery({
    onCompleted: (data) => {
      setImageData(data.nonVerifiedImage);
    },
  });
  const [verifiedImages, setVerifiedImages] = useState<string[]>([]);
  const [imageData, setImageData] = useState(image.data?.nonVerifiedImage);
  const [lastDirection, setLastDirection] = useState<Direction>("right");

  const stats = useStatsQuery();

  const [verifyImage] = useVerifyImageMutation({
    refetchQueries: [GetNonVerifiedImageDocument, StatsDocument],
  });

  const [unVerifyImage] = useUnVerifyImageMutation({
    refetchQueries: [ImageByIdDocument, StatsDocument],
  });

  const imageServerURL = process.env.REACT_APP_IMAGE_ENDPOINT ?? "";

  const swipe = async (dir: Direction) => {
    if (imageData) {
      setLastDirection(dir);
      const res = await verifyImage({
        variables: {
          id: imageData.id,
          imageType: dir === "right" ? "DUCK" : "NOT_DUCK",
        },
      });
      if (res.data) {
        setVerifiedImages([res.data.verifyImage.id, ...verifiedImages]);
      }
    }
  };

  const goBack = () => {
    verifiedImages.length > 0 &&
      unVerifyImage({
        variables: {
          id: verifiedImages[0],
        },
        onCompleted: (data) => {
          setImageData(data.undoVerifyImage);
        },
      });
    setVerifiedImages(verifiedImages.slice(1, verifiedImages.length));
  };

  const canGoBack = verifiedImages.length > 0;

  return (
    <Container sx={{ backgroundColor: blueGrey[300], minHeight: "100vh" }}>
      <Typography variant="h2" textAlign="center" sx={{ mb: 2 }}>
        Duck Classifier
      </Typography>
      <Stack alignItems="center" gap={2}>
        <Card
          sx={{
            backgroundImage: imageData
              ? `url(${imageServerURL}/${imageData.fileName})`
              : "",
            backgroundColor: "darkGray.main",
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "80vw",
            maxWidth: "500px",
            transition: "all 0.5s ease",
            aspectRatio: "1/1",
          }}
          elevation={2}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <IconButton
            aria-label="delete"
            size="large"
            sx={{
              backgroundColor: "error.main",
            }}
            onClick={() => swipe("left")}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <Button
            disabled={!canGoBack}
            variant="contained"
            sx={{ backgroundColor: "primary.main" }}
            onClick={() => goBack()}
            endIcon={<UndoRounded />}
          >
            Undo
          </Button>
          <IconButton
            aria-label="delete"
            size="large"
            sx={{
              backgroundColor: "success.main",
            }}
            onClick={() => swipe("right")}
          >
            <DoneIcon fontSize="inherit" />
          </IconButton>
        </Stack>
        <Box>
          {lastDirection === "left" && (
            <Typography variant="h4" textAlign="center" color="error.main">
              It wos NOT a duck!
            </Typography>
          )}
          {lastDirection === "right" && (
            <Typography variant="h4" textAlign="center" color="success.main">
              It was a duck!
            </Typography>
          )}
        </Box>
        <Stats
          loading={stats.loading}
          totalImages={stats.data?.stats.totalImages}
          totalVerifiedImages={stats.data?.stats.totalVerifiedImages}
          verifiedDucks={stats.data?.stats.verifiedDucks}
          verifiedNotDucks={stats.data?.stats.verifiedNotDucks}
        />
      </Stack>
    </Container>
  );
};
