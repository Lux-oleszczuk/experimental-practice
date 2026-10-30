# Forest Run — Phaser Games workshop

A small browser platformer developed for the Year 3 Creative Computing Experimental Practice workshop. The player moves through a tile-based level and jumps between platforms to reach a golden flag.

## Current features

- A level designed in Tiled and loaded from `tiled/platformen.tmj`.
- Phaser Arcade Physics with gravity, solid tile collisions and world boundaries.
- Keyboard movement, jumping and a running animation.
- Layered background images, on-screen instructions and a finish flag.
- A level-complete message and restart control.

## Controls

| Action | Keys |
| --- | --- |
| Move | A / D or Left / Right arrows |
| Jump | Space, W or Up arrow |
| Restart | R |

## Running locally

Serve this folder with a local HTTP server, then open `index.html` through that server in a browser. For example, with Python installed, run `python -m http.server 8000` from this folder and visit `http://localhost:8000`.

Phaser is included in `lib/phaser.min.js`; no separate Phaser installation or package installation is needed. Opening the HTML directly as a local file may prevent the map and images from loading.

## Development and testing

The original workshop prototype included the Tiled map, tile collisions, gravity and horizontal movement. The subsequent development added jumping, animation playback, background layers, a finish condition and restart. The player's collision body was adjusted to make navigation around low platforms possible.

The current version was tested by moving and jumping from the starting position to the flag, checking the completion message and restarting the level. No JavaScript errors were reported during that test.

## Next iteration

The platform layout is an initial workshop experiment and needs refinement. Planned work is to improve the route, spacing and clarity of the jumps, then retest the level. The current map should not be treated as a final level design.

## AI assistance

OpenAI Codex assisted with reviewing the existing prototype, implementing the additional gameplay features, adjusting the collision body, testing the route and drafting this README. The original prototype and map predated these changes. This note does not replace the university's required Statement of Acknowledgement of AI usage.

## Assets

The project uses the graphics already present in the workshop repository. Their original sources and licence terms have not yet been verified in this README; attribution should be checked before wider distribution.
