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

declare type Direction = "left" | "right" | "up" | "down";
declare interface TinderCardApi {
  swipe(dir?: Direction): Promise<void>;

  restoreCard(): Promise<void>;
}

const db = [
  {
    name: "Richard Hendricks",
    url: "./duck/271447666_960393897903523_5562152456725681542_n.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "./duck/271515651_1146534419084810_1172171651743990187_n.jpg",
  },
  {
    name: "Monica Hall",
    url: "./duck/271608447_1012524735966256_821590788211691384_n.jpg",
  },
  {
    name: "Jared Dunn",
    url: "./duck/271669154_990864498507581_2679485406268569312_n.jpg",
  },
];

export const ClassifierPage = () => {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState<string>();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs: RefObject<TinderCardApi>[] = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef<TinderCardApi>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current?.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < db.length) {
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
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <Card
              sx={{
                backgroundImage: "url(" + character.url + ")",
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
