# Seesaw Simulation

This is a simple seesaw simulation project I built using only pure HTML, CSS, and JavaScript.

**Live Demo:** [https://emceyy.github.io/Seesaw.EmreCeylan-Uysal/](https://emceyy.github.io/Seesaw.EmreCeylan-Uysal/)

## My Approach

*   **Logic First:** I started with the core physics on the JavaScript side. I used a simple `state` object to keep track of everything, like where the weights are and the current angle of the seesaw.

*   **Visuals and Animation:** To make it more engaging, I added a drop animation. When you click, a temporary circle animates downwards, and the *actual* weight is added to the seesaw only after the animation finishes. The hover preview was also a nice touch to show what you're about to drop.

## Limitations

*   The physics engine is pretty basic. There is no momentum or collision detection between weights.
*   I'm clearing and redrawing all the weights on every update. This is fine for a few objects, but it could get slow if hundreds were added.

## AI Assistance

I used AI tools for help in a few areas. They were useful for getting suggestions on the CSS to achieve the visual style I wanted. They also helped in refactoring parts of the code to make it cleaner and more readable.

The core logic and structure of the project were written by me.
