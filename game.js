// 1. Initialize Kaboom
kaboom({
  background: [20, 20, 30],
  scale: 2,
});

// 2. Load Sprites
loadSprite("robot",   "https://th.bing.com/th/id/OIP.jTE__cmysmzZ0II90oD0PwHaLI?w=119&h=180&c=7&r=0&o=5&pid=1.7");
loadSprite("wall",    "https://th.bing.com/th/id/ODL.e271f3bdd38f4d8f84ffdf6f6ea64900?w=134&h=134&c=10&rs=1&o=6&pid=AlgoBlockDebug");
loadSprite("mailbox", "https://th.bing.com/th/id/OIP.A8gO97NojI2rfZWyrd35nAHaI4?w=160&h=191&c=7&r=0&o=5&pid=1.7");

// 3. Constants & Level Data
const TILE_SIZE = 32;
const levelMap = [
  "================",
  "=              =",
  "=    @         =",
  "=              =",
  "=     M        =",
  "=              =",
  "================",
];

// 4. Main Scene
scene("main", () => {
  // 4a. Add Level with correct config
  addLevel(levelMap, {
    tileWidth:  TILE_SIZE,
    tileHeight: TILE_SIZE,
// Replace all instances of solid() with just area()

tiles: {
    "=": () => [ sprite("wall"),    area()                 ],
    "@": () => [ sprite("robot"),   area(), "player"       ],
    "M": () => [ sprite("mailbox"), area(), "mailbox"      ],
  },  
  });

  // 5. Player & Controls
  const player = get("player")[0];
  onKeyDown("a",  () => player.move(-100, 0));
  onKeyDown("d", () => player.move( 100, 0));
  onKeyDown("w",    () => player.move(0, -100));
  onKeyDown("s",  () => player.move(0,  100));

  onKeyPress("e", () => {
    if (player.isTouching("mailbox")) {
      add([
        text("Deliver it to the garden...", { size: 16 }),
        pos(10, 10),
        color(255, 255, 255),
        lifespan(2),
      ]);
    }
  });
});

// 6. Start the Game
go("main");