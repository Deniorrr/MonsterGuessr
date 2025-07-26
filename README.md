# Monster Guessr

[MH Guessr][MHG-url] is a web game, where players can test their knowledge about the locations from the game [Monster Hunter World](https://www.monsterhunter.com/world/).
Player recieves a series of screenshots, and the goal of the game is to guess the exact position of taken images.

App inspired by https://www.geoguessr.com/.

## Description

The game contains two gamemodes: **easy** and **normal** mode. In easy mode, the locations to guess will be more recognizable and iconic, while the second mode will be more challanging and intended for more experienced players.
After selecting a game mode from the main menu, the player will get a map, the mentioned screenshot, and a section where the player can select a desired map (Monster Hunter World consists of a few separate unique maps). Players task is to guess the position closest
to the one shown on the screen. There are 5 random screenshots per game and each one is worth up to 500 points. Player can zoom in on the map, as well as the screenshot. 


## Tech stack

This project consists of:

### **Frontend**
[![React.js][React.js]][React-url]
[![Sass][Sass]][Sass-url]
[![Leaflet][Leaflet]][Leaflet-url]
[![MaterialUI][MaterialUI]][MaterialUI-url]
  - Includes an **admin page** for submitting new map locations  
  - Uses [Leaflet][Leaflet-url] to display and manage interactive maps  
  - Preloads map images into memory (RAM) for instant transitions

### **Backend**
[![Node.js][Node.js]][Node-url]
[![Express.js][Express.js]][Express-url]
  - Provides API endpoints for game logic and admin features  
  - Secured against **CORS**, **SQL injection**, **XSS**, and related vulnerabilities

### **Database**
[![SQL][SQL]][SQL-url]
  - Stores map screenshots and their metadata

### **Hosting platform**
[![Azure][Azure]][Azure-url]
  - **Azure App Services** for serving the frontend and backend
  - **Azure SQL Database** for persistent storage
  - **Public URL**: [MH Guessr][MHG-url]

## Privacy

#### Data collection

This app does not collect any personal data from users, does not use cookies, and does not track user activity.

#### Affiliation

This is a fan-made project and is not affiliated with Capcom or Geoguessr. We respect your privacy and are committed to protecting your personal information.

## Roadmap
- [x] Deploy the app
- [x] Upgrade some insufficient hosting services
- [x] Buy a domain
- [x] Add more questions/screenshots
- [ ] Let the gaming world know about this 😊 

<!-- LINKS  -->

[MHG-url]: https://mhguessr.com/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/

[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/

[Leaflet]: https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white
[Leaflet-url]: https://leafletjs.com/

[Azure]: https://img.shields.io/badge/Microsoft%20Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white
[Azure-url]: https://azure.microsoft.com/

[SQL]: https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white
[SQL-url]: https://www.postgresql.org/

[MaterialUI]: https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MaterialUI-url]: https://mui.com/

[Sass]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[Sass-url]: https://sass-lang.com/
