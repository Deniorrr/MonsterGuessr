import PropTypes from "prop-types";
import maps from "../data/mapImages";
import { useState } from "react";
import { Backdrop } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Slider,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

GameNavbar.propTypes = {
  guess: PropTypes.func.isRequired,
  question: PropTypes.object,
  selectedRegion: PropTypes.object,
  resetMap: PropTypes.func.isRequired,
  switchMaps: PropTypes.func.isRequired,
  switchLayers: PropTypes.func.isRequired,
  markerPosition: PropTypes.object,
};

function GameNavbar(props) {
  const guess = props.guess;
  const question = props.question;
  const selectedRegion = props.selectedRegion;
  const resetMap = props.resetMap;
  const switchMaps = props.switchMaps;
  const switchLayers = props.switchLayers;
  const markerPosition = props.markerPosition;
  const [layerIndex, setLayerIndex] = useState(0);
  const [selectedRegionName, setSelectedRegionName] =
    useState("ancient_forest");

  const [hasGuessed, setHasGuessed] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const guessHandler = () => {
    setHasGuessed(true);
    guess();
  };

  const nextHandler = () => {
    setHasGuessed(false);
    resetMap();
  };

  const renderQuestion = () => {
    if (question == null) return null;
    return (
      <figure>
        <img
          src={`/src/assets/screenshots/${question.screenName}`}
          alt="question"
          onClick={handleOpen}
        />
      </figure>
    );
  };

  const handleChange = (event, newRegion) => {
    console.log(newRegion);
    console.log(selectedRegion.name);
    if (newRegion !== null) {
      const regionData = maps.MHW[newRegion];
      switchMaps(regionData);
      setSelectedRegionName(newRegion);
    }
  };

  const generateMapsNavigation = () => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          MH World
        </AccordionSummary>
        <AccordionDetails>
          <ToggleButtonGroup
            orientation="vertical"
            value={selectedRegionName}
            exclusive
            onChange={handleChange}
          >
            {/* <ToggleButton value="list" aria-label="list">
        <ViewListIcon />
      </ToggleButton>
      
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="quilt" aria-label="quilt">
        <ViewQuiltIcon />
       */}
            {Object.keys(maps.MHW).map((region) => {
              //const regionData = maps.MHW[region];
              return (
                <ToggleButton key={region} value={region} aria-label={region}>
                  {maps.MHW[region].name}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </AccordionDetails>
      </Accordion>
    );
  };

  const generateLayersNavigation = () => {
    return (
      <Slider
        aria-label="Layer"
        defaultValue={1}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={selectedRegion.maps.length}
        onChange={(e, value) => switchLayers(value - 1)}
      />
    );
    // return (
    //   <div>
    //     {Array.from({ length: selectedRegion.maps.length }, (_, index) => (
    //       <button key={index} onClick={() => switchLayers(index)}>
    //         {index + 1}
    //       </button>
    //     ))}
    //   </div>
    // );
  };

  return (
    <nav className="right">
      {renderQuestion()}

      {hasGuessed ? (
        <Button onClick={() => nextHandler()}>Next</Button>
      ) : (
        <Button
          onClick={() => {
            guessHandler();
          }}
          disabled={markerPosition == null}
        >
          Guess
        </Button>
      )}

      <h3>Region</h3>
      {generateMapsNavigation()}
      <h3>Layer</h3>
      <Box>{generateLayersNavigation()}</Box>

      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        {question !== null ? (
          <img
            className="backdrop-image"
            src={`/src/assets/screenshots/${question.screenName}`}
            alt="question"
          />
        ) : (
          ""
        )}
      </Backdrop>
    </nav>
  );
}

export default GameNavbar;
