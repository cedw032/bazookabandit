Tentative title:

# Revenge of the Bazooka Bandit


Game concept:
---

Uhh...a platformer where you shoot stuff with a bazooka?


**Keyboard Controls:**

Arrowkeys to move and jump

Mouse to point bazooka

**Gamepad controls:**

D-Pad to move and jump

Right thumbstick (up and down) to point bazooka 


Language:
---
Javascript/HTML5 using Phaser.io framework.

Note: I've set this up as an ES6 project!


Project structure
---

assets/ - art + sound assets

resources/ - svg/psd files etc.

src/ - da code


index.html  - game page 

src/main.js - defines the game states

src/states/boot.js - starting state, sets up screen

src/states/preloader.js - loads all the assets & displays loading screen

src/states/title.js - title screen

**src/states/game.js - main game code**



Install Instructions
---

Pre-requisites:

node + npm

Mac/Windows users, get those here: 
[Node.js website](https://nodejs.org/en/download/)


To install the required npm packages:

```
npm install
```

After that:

```
npm run build
```

to build the project

```
npm run start
```

Will open project in browser with live-reload enabled.

Links
---
[Phaser](http://phaser.io/)

[Phaser Examples](http://phaser.io/examples)


