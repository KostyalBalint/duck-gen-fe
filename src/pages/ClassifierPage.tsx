import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import TinderCard from "react-tinder-card";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import React, { RefObject, useMemo, useRef, useState } from "react";
import { useGetNonVerifiedImagesQuery } from "../generated/graphql";

declare type Direction = "left" | "right" | "up" | "down";
declare interface TinderCardApi {
  swipe(dir?: Direction): Promise<void>;

  restoreCard(): Promise<void>;
}

export const ClassifierPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string>();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const images = useGetNonVerifiedImagesQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      updateCurrentIndex(data.nonVerifiedImages.length - 1);
    },
  });
  const imageServerURL = process.env.REACT_APP_IMAGE_ENDPOINT ?? "";

  const childRefs: RefObject<TinderCardApi>[] = useMemo(
    () =>
      Array(images.data?.nonVerifiedImages.length)
        .fill(0)
        .map((i) => React.createRef<TinderCardApi>()),
    [images.data]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack =
    images.data && currentIndex < images.data?.nonVerifiedImages.length - 1;

  const canSwipe = images.data && currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, imageId: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (id: string, idx: number) => {
    console.log(`${id} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current?.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: Direction) => {
    if (
      canSwipe &&
      images.data?.nonVerifiedImages &&
      currentIndex < images.data?.nonVerifiedImages.length
    ) {
      await childRefs[currentIndex].current?.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current?.restoreCard();
  };

  return (
    <Container>
      <Typography variant="h2" textAlign="center">
        Duck Classifier
      </Typography>
      <Grid sx={{ height: 450 }}>
        {images.data &&
          images.data.nonVerifiedImages.map((image, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={image.id}
              onSwipe={(dir) => swiped(dir, image.id, index)}
              onCardLeftScreen={() => outOfFrame(image.id, index)}
            >
              <Card
                sx={{
                  backgroundImage: `url(${imageServerURL}/${image.fileName})`,
                  position: "relative",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "80vw",
                  maxWidth: "400px",
                  //height: "300px",
                  aspectRatio: "1/1",
                }}
                elevation={2}
              ></Card>
            </TinderCard>
          ))}
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <IconButton
          aria-label="delete"
          size="large"
          disabled={!canSwipe}
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
        >
          Undo swipe!
        </Button>
        <IconButton
          aria-label="delete"
          size="large"
          disabled={!canSwipe}
          sx={{
            backgroundColor: "success.main",
          }}
          onClick={() => swipe("right")}
        >
          <DoneIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      {lastDirection === "left" && (
        <Typography variant="h4" textAlign="center" color="error.main">
          It is NOT a duck!
        </Typography>
      )}
      {lastDirection === "right" && (
        <Typography variant="h4" textAlign="center" color="success.main">
          It is a duck!
        </Typography>
      )}
    </Container>
  );
};
