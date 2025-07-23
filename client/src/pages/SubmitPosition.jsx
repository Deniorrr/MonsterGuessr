import {
  MapContainer,
  ImageOverlay,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import maps from "../data/mapImages";
import {
  Grid,
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ButtonGroup,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import mapPointer from "../assets/pointer_small.png";
import L from "leaflet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MuiFileInput } from "mui-file-input";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useNavigate } from "react-router-dom";
import api from "../Api/ApiConfig";

function PositionSubmitSelector() {
  const navigate = useNavigate();

  useEffect(() => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      user = null;
    }
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
    };
    const handleDrop = (e) => {
      e.preventDefault();
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const [isDragActive, setIsDragActive] = useState(false);
  const dropRef = useRef();

  const handleDropZoneDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDropZoneDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDropZoneDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(
    maps.MHW.ancient_forest.maps[0]
  );
  const customIcon2 = new L.Icon({
    iconUrl: mapPointer,
    iconSize: [50, 68], // Adjust the size as needed
    iconAnchor: [25, 68], // Adjust the anchor point as needed
    popupAnchor: [1, -34], // Adjust the popup anchor point as needed
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    shadowSize: [68, 68], // Adjust the shadow size as needed
  });

  const [selectedRegion, setSelectedRegion] = useState(maps.MHW.ancient_forest);
  const [layerIndex, setLayerIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [easyMode, setEasyMode] = useState(false);
  const [passwd, setPasswd] = useState("");
  const bounds = [
    [0, 0], // Top-left corner
    [23, 23],
  ];

  const zoom_level = 7;

  // preload the map images
  useEffect(() => {
    const imagesToPreload = Object.values(maps.MHW).flatMap(
      (region) => region.maps
    );

    imagesToPreload.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng);
      },
    });

    return markerPosition === null ? null : (
      <Marker position={markerPosition} icon={customIcon2}></Marker>
    );
  };

  const submitHandler = () => {
    const myID = localStorage.getItem("myID");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("region", selectedRegion.name);
    formData.append("layer", layerIndex + 1);
    formData.append("lat", markerPosition.lat);
    formData.append("lng", markerPosition.lng);
    formData.append("easyMode", easyMode);
    formData.append("localKey", myID);
    formData.append("passwd", passwd);
    api
      .post("submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        resetData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetData = () => {
    //reset oprócz pliku, żeby wiedzieć jaki dodano ostatnio
    setMarkerPosition(null);
    //setSelectedRegion(maps.MHW.ancient_forest);
    //setSelectedLayer(maps.MHW.ancient_forest.maps[0]);
    //setLayerIndex(0);
    //setFile(null);
    setEasyMode(false);
  };

  const switchMaps = (region) => {
    if (region === selectedRegion) return;
    setIsLoading(true);
    setSelectedRegion(region);
    setLayerIndex(0);
    setSelectedLayer(region.maps[0]);
  };

  const switchLayers = (index) => {
    if (index === layerIndex) return;
    setIsLoading(true);
    setLayerIndex(index);
    setSelectedLayer(selectedRegion.maps[index]);
  };

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  const handleSwitchLayers = (layerIndex) => {
    setLayerIndex(layerIndex);
    switchLayers(layerIndex);
  };

  const handleChange = (newRegion) => {
    setLayerIndex(0);
    if (newRegion !== null) {
      const regionData = maps.MHW[newRegion];
      switchMaps(regionData);
      setSelectedRegion(maps.MHW[newRegion]);
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
              return (
                <Button
                  key={region}
                  onClick={() => handleChange(region)}
                  style={{
                    border: `2px solid ${maps.MHW[region].color}`,
                    marginBottom: "1px",
                    backgroundColor: `${maps.MHW[region].color}55`,
                    color: "white",
                  }}
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

  return (
    <div className="game-container">
      <Grid container style={{ height: "100%" }}>
        <Grid row item xs={7}>
          {isLoading ? (
            <Box className="loading-text">
              <Typography variant="h5">Loading...</Typography>
            </Box>
          ) : null}
          <MapContainer
            center={[10, 10]}
            zoom={zoom_level}
            scrollWheelZoom={true}
            minZoom={6}
            maxZoom={8}
            maxBounds={bounds}
          >
            <ImageOverlay
              url={selectedLayer}
              bounds={bounds}
              eventHandlers={{ load: handleMapLoad }}
            />
            <LocationMarker />
          </MapContainer>
        </Grid>
        <Grid row item xs={5} className="aside-bar">
          {
            //FORM
          }
          <Box component={"nav"}>
            <Box display={"flex"} justifyContent={"center"}>
              <MuiFileInput
                value={file}
                onChange={setFile}
                placeholder="Insert an image"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InsertDriveFileIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              ref={dropRef}
              onDragOver={handleDropZoneDragOver}
              onDragLeave={handleDropZoneDragLeave}
              onDrop={handleDropZoneDrop}
              sx={{
                border: isDragActive ? "2px solid #4fac27" : "2px dashed #ccc",
                borderRadius: "8px",
                padding: "1.5em",
                textAlign: "center",
                margin: "1em 3em",
                marginTop: "0em",
                cursor: "pointer",
              }}
            >
              {file ? (
                <Typography variant="body1">{file.name}</Typography>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Drag & drop image
                </Typography>
              )}
            </Box>
            {file && file.type.startsWith("image/") && (
              <Box display="flex" justifyContent="center" marginTop={2}>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="submit-image-preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 400,
                  }}
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)} // Clean up memory
                />
              </Box>
            )}
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h5" textAlign={"center"}>
                Easy mode
              </Typography>
              <Checkbox
                onChange={() => {
                  setEasyMode(!easyMode);
                }}
                checked={easyMode}
              />
            </Box>
            <Typography
              variant="h5"
              margin={"10px"}
              marginTop={"1em"}
              textAlign={"center"}
            >
              Region
            </Typography>
            {generateMapsNavigation()}
            <Typography
              variant="h5"
              margin={"10px"}
              marginTop={"1em"}
              textAlign={"center"}
            >
              Layer
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              {generateLayersNavigation()}
            </Box>
            <Typography
              variant="h5"
              margin={"10px"}
              marginTop={"1em"}
              textAlign={"center"}
            >
              Password
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              <input
                type="password"
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
            <Button
              variant="contained"
              style={{ width: "100%", marginTop: "2em" }}
              onClick={() => {
                submitHandler();
              }}
              disabled={markerPosition == null}
            >
              {markerPosition == null ? "Select position" : "Submit"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default PositionSubmitSelector;

//it is possible that each map will have to have the same dimensions
//because the bounds are set to the first map's dimensions and they are not updated when the map is switched
