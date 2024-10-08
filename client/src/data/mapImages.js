import af1 from "../assets/maps/MHW/ancient_forest/1.png";
import af2 from "../assets/maps/MHW/ancient_forest/2.png";
import af3 from "../assets/maps/MHW/ancient_forest/3.png";

import ww1 from "../assets/maps/MHW/wildspire_waste/1.png";
import ww2 from "../assets/maps/MHW/wildspire_waste/2.png";
import ww3 from "../assets/maps/MHW/wildspire_waste/3.png";

const maps = {
  MHW: {
    ancient_forest: {
      ratio: { height: 9, width: 16 },
      maps: [af1, af2, af3],
    },
    wildspire_waste: {
      ratio: { height: 9.79, width: 11.03 },
      maps: [ww1, ww2, ww3],
    },
    coral_highlands: {
      ratio: { height: 9.79, width: 11.03 },
      maps: [],
    },
    rotten_vale: {
      ratio: { height: 9, width: 16 },
      maps: [],
    },
    elder_recess: {
      ratio: { height: 9, width: 16 },
      maps: [],
    },
    hoarfrost_reach: {
      ratio: { height: 9, width: 16 },
      maps: [],
    },
    guiding_lands: {
      ratio: { height: 9, width: 16 },
      maps: [],
    },
  },
};

export default maps;
