import af1 from "../assets/maps/MHW/ancient_forest/af1.jpg";
import af2 from "../assets/maps/MHW/ancient_forest/af2.jpg";
import af3 from "../assets/maps/MHW/ancient_forest/af3.jpg";

import ww1 from "../assets/maps/MHW/wildspire_waste/ww1.jpg";
import ww2 from "../assets/maps/MHW/wildspire_waste/ww2.jpg";
import ww3 from "../assets/maps/MHW/wildspire_waste/ww3.jpg";

import ch1 from "../assets/maps/MHW/coral_highlands/ch1.jpg";
import ch2 from "../assets/maps/MHW/coral_highlands/ch2.jpg";
import ch3 from "../assets/maps/MHW/coral_highlands/ch3.jpg";

import rv1 from "../assets/maps/MHW/rotten_vale/rv1.jpg";
import rv2 from "../assets/maps/MHW/rotten_vale/rv2.jpg";
import rv3 from "../assets/maps/MHW/rotten_vale/rv3.jpg";

import er1 from "../assets/maps/MHW/elder_recess/er1.jpg";
import er2 from "../assets/maps/MHW/elder_recess/er2.jpg";

import hr1 from "../assets/maps/MHW/hoarfrost_reach/hr1.jpg";
import hr2 from "../assets/maps/MHW/hoarfrost_reach/hr2.jpg";

import gl1 from "../assets/maps/MHW/guiding_lands/gl1.jpg";
import gl2 from "../assets/maps/MHW/guiding_lands/gl2.jpg";
import gl3 from "../assets/maps/MHW/guiding_lands/gl3.jpg";

const maps = {
  MHW: {
    ancient_forest: {
      name: "Ancient Forest",
      ratio: { height: 9, width: 16 },
      maps: [af1, af2, af3],
      color: "#2e7e0b", // green
    },
    wildspire_waste: {
      name: "Wildspire Waste",
      ratio: { height: 9.79, width: 11.03 },
      maps: [ww1, ww2, ww3],
      color: "#FF9800", // orange
    },
    coral_highlands: {
      name: "Coral Highlands",
      ratio: { height: 9.79, width: 11.03 },
      maps: [ch1, ch2, ch3],
      color: "#2196F3", // blue
    },
    rotten_vale: {
      name: "Rotten Vale",
      ratio: { height: 9, width: 16 },
      maps: [rv1, rv2, rv3],
      color: "#b12044", // purple
    },
    elder_recess: {
      name: "Elder Recess",
      ratio: { height: 9, width: 16 },
      maps: [er1, er2],
      color: "#FF5722", // red
    },
    hoarfrost_reach: {
      name: "Hoarfrost Reach",
      ratio: { height: 9, width: 16 },
      maps: [hr1, hr2],
      color: "#607D8B", // grey
    },
    guiding_lands: {
      name: "Guiding Lands",
      ratio: { height: 9, width: 16 },
      maps: [gl1, gl2, gl3],
      color: "#795548", // brown
    },
  },
};

export default maps;
