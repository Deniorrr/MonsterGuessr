import PropTypes from "prop-types";
import maps from "../data/mapImages";
import { useState } from "react";
import { Backdrop, Typography } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  ButtonGroup,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GoodIcon from "@mui/icons-material/CheckBox";
import WrongIcon from "@mui/icons-material/DisabledByDefault";
import { useGame } from "../contexts/GameContext";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

GameNavbar.propTypes = {
  guess: PropTypes.func.isRequired,
  guessedPosition: PropTypes.object,
  selectedRegion: PropTypes.object,
  resetMap: PropTypes.func.isRequired,
  switchMaps: PropTypes.func.isRequired,
  switchLayers: PropTypes.func.isRequired,
  markerPosition: PropTypes.object,
  layer: PropTypes.number,
};

function GameNavbar(props) {
  const guess = props.guess;
  const selectedRegion = props.selectedRegion;
  const resetMap = props.resetMap;
  const switchMaps = props.switchMaps;
  const switchLayers = props.switchLayers;
  const markerPosition = props.markerPosition;
  const layer = props.layer;

  const [layerIndex, setLayerIndex] = useState(0);
  const [selectedRegionName, setSelectedRegionName] =
    useState("ancient_forest");
  const [hasGuessed, setHasGuessed] = useState(false);
  const [isBigImageOpen, setIsBigImageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const {
    score,
    lastAnswerInMeters,
    activeQuestion: question,
    isLastQuestion,
  } = useGame();

  const handleCloseBigImage = () => {
    setIsBigImageOpen(false);
  };
  const handleOpenBigImage = () => {
    setIsBigImageOpen(true);
  };

  const guessHandler = () => {
    setHasGuessed(true);
    guess();
  };

  const nextHandler = () => {
    resetMap();
    if (isLastQuestion()) return;
    setHasGuessed(false);

    setIsLoading(true);
  };

  const handleQuestionLoad = () => {
    setIsLoading(false);
  };

  const renderQuestion = () => {
    if (question == null) return null;

    return (
      <figure
        className={isImageHovered ? "figure-hovered" : ""}
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        {isLoading ? (
          <Box className="loading-text">
            <Typography>Loading...</Typography>
          </Box>
        ) : null}

        <img
          src={`data:image/png;base64,${question.imageData}`}
          alt="question"
          style={{ width: "100%" }}
          onClick={handleOpenBigImage}
          onLoad={handleQuestionLoad}
        />
        <span className="magnifier-overlay">
          <ZoomInIcon fontSize="inherit" />
        </span>
      </figure>
    );
  };

  const handleChange = (newRegion) => {
    setLayerIndex(0);
    if (newRegion !== null) {
      const regionData = maps.MHW[newRegion];
      switchMaps(regionData);
      setSelectedRegionName(newRegion);
    }
  };

  const handleSwitchLayers = (layerIndex) => {
    setLayerIndex(layerIndex);
    switchLayers(layerIndex);
  };

  const generateMapsNavigation = () => {
    return (
      <Accordion id="maps-panel" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={"bold"}>MH World</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
          }}
        >
          <ButtonGroup orientation="vertical">
            {Object.keys(maps.MHW).map((region) => {
              return (
                <Button
                  disabled={hasGuessed}
                  key={region}
                  onClick={() => handleChange(region)}
                  variant={
                    selectedRegionName === region ? "contained" : "outlined"
                  }
                >
                  {maps.MHW[region].name}
                </Button>
              );
            })}
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
    );
  };

  const generateLayersNavigation = () => {
    return (
      <ButtonGroup variant="outlined">
        {Array.from({ length: selectedRegion.maps.length }, (_, index) => (
          <Button
            disabled={hasGuessed}
            key={index}
            onClick={() => handleSwitchLayers(index)}
            variant={layerIndex === index ? "contained" : "outlined"}
          >
            {index + 1}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  const generateIcon = (isCorrect) => {
    return isCorrect ? (
      <Box display={"flex"} alignItems={"center"}>
        <GoodIcon sx={{ color: "#2e7e0b", marginLeft: "5px" }} />
      </Box>
    ) : (
      <Box display={"flex"} alignItems={"center"}>
        <WrongIcon sx={{ color: "red" }} />
      </Box>
    );
  };

  const generateResult = () => {
    return (
      <Box>
        <Typography
          variant="h4"
          margin={"10px"}
          marginTop={"2em"}
          textAlign={"center"}
          style={{
            borderBottom: "2px solid #2e7e0b",
          }}
        >
          Result
        </Typography>
        <Typography variant="h6" margin={"10px"} textAlign={"center"}>
          Distance: {lastAnswerInMeters}
        </Typography>
        <Typography variant="h6" margin={"10px"} textAlign={"center"}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box>Correct Region: {question.mapName}</Box>
            {generateIcon(selectedRegion.name === question.mapName)}
          </Box>
        </Typography>
        <Typography variant="h6" margin={"10px"} textAlign={"center"}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box>Correct Layer: {question.layer}</Box>
            {generateIcon(layer + 1 === question.layer)}
          </Box>
        </Typography>
        <Typography
          variant="h6"
          margin={"10px"}
          paddingTop={"1em"}
          textAlign={"center"}
          style={{
            borderTop: "2px solid #2e7e0b",
          }}
        >
          Score: {score[score.length - 1] || 0} {/*get last score*/}
        </Typography>
      </Box>
    );
  };

  return (
    <Box component={"nav"}>
      {renderQuestion()}
      <Box className="guess-button-wrapper">
        {hasGuessed ? (
          <Button variant="contained" onClick={() => nextHandler()}>
            {isLastQuestion() ? "Finish" : "Next"}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              guessHandler();
            }}
            disabled={markerPosition == null}
          >
            {markerPosition == null ? "Select position" : "Guess"}
          </Button>
        )}
      </Box>
      {!hasGuessed ? (
        <Box className="map-selector">
          <Typography
            variant="h5"
            margin={"8px"}
            textAlign={"center"}
            marginTop={"32px"}
          >
            Region
          </Typography>
          {generateMapsNavigation()}
          <Typography variant="h5" margin={"8px"} textAlign={"center"}>
            Layer
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            {generateLayersNavigation()}
          </Box>
        </Box>
      ) : (
        generateResult()
      )}
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 3 })}
        open={isBigImageOpen}
        onClick={handleCloseBigImage}
      >
        {question !== null ? (
          <img
            className="backdrop-image"
            src={`data:image/png;base64,${question.imageData}`}
            alt="question"
          />
        ) : (
          ""
        )}
      </Backdrop>
    </Box>
  );
}

export default GameNavbar;
