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

GameNavbar.propTypes = {
  guess: PropTypes.func.isRequired,
  guessedPosition: PropTypes.object,
  question: PropTypes.object,
  selectedRegion: PropTypes.object,
  resetMap: PropTypes.func.isRequired,
  switchMaps: PropTypes.func.isRequired,
  switchLayers: PropTypes.func.isRequired,
  markerPosition: PropTypes.object,
  isLastQuestion: PropTypes.bool,
  layer: PropTypes.number,
};

function GameNavbar(props) {
  const guess = props.guess;
  const question = props.question;
  const selectedRegion = props.selectedRegion;
  const resetMap = props.resetMap;
  const switchMaps = props.switchMaps;
  const switchLayers = props.switchLayers;
  const markerPosition = props.markerPosition;
  const isLastQuestion = props.isLastQuestion;
  const layer = props.layer;

  const [layerIndex, setLayerIndex] = useState(0);
  const [selectedRegionName, setSelectedRegionName] =
    useState("ancient_forest");
  const [hasGuessed, setHasGuessed] = useState(false);
  const [isBigImageOpen, setIsBigImageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (isLastQuestion) return;
    setHasGuessed(false);

    setIsLoading(true);
  };

  const handleQuestionLoad = () => {
    setIsLoading(false);
  };

  const renderQuestion = () => {
    if (question == null) return null;

    return (
      <figure>
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography fontWeight={"bold"}>MH World</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonGroup orientation="vertical">
            {Object.keys(maps.MHW).map((region) => {
              //const regionData = maps.MHW[region];
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

  const generateResult = () => {
    const distance = Math.sqrt(
      Math.pow(markerPosition.lat - question.lat, 2) +
        Math.pow(markerPosition.lng - question.lng, 2)
    );

    console.log(distance);

    return (
      <Box>
        <Typography
          variant="h4"
          margin={"10px"}
          marginTop={"2em"}
          marginBottom={"1em"}
          textAlign={"center"}
        >
          Result
        </Typography>
        <Typography variant="h6" margin={"10px"} textAlign={"center"}>
          Distance: {distance}
        </Typography>
        <Typography variant="h6" margin={"10px"} textAlign={"center"}>
          Region: {selectedRegion.name}
        </Typography>
        <Typography variant="h6" margin={"10px"} textAlign={"center"}>
          Layer: {layer + 1}
        </Typography>
      </Box>
    );
  };

  return (
    <Box component={"nav"}>
      {renderQuestion()}

      {hasGuessed ? (
        <Button
          variant="contained"
          style={{ width: "100%" }}
          onClick={() => nextHandler()}
        >
          {isLastQuestion ? "Finish" : "Next"}
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ width: "100%" }}
          onClick={() => {
            guessHandler();
          }}
          disabled={markerPosition == null}
        >
          {markerPosition == null ? "Select position" : "Guess"}
        </Button>
      )}
      {!hasGuessed ? (
        <>
          <Typography
            variant="h5"
            margin={"10px"}
            marginTop={"2em"}
            textAlign={"center"}
          >
            Region
          </Typography>
          {generateMapsNavigation()}
          <Typography
            variant="h5"
            margin={"10px"}
            marginTop={"2em"}
            textAlign={"center"}
          >
            Layer
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            {generateLayersNavigation()}
          </Box>
        </>
      ) : (
        generateResult()
      )}
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
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
