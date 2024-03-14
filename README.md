# JavaScriptProject1

## Background

Mahjong is a tile based game that was developed in the 19th century in China and has spread throughout the world since the early 20th century. Different region got different scoring and playing rules, but they all follow many basic rules. This project is intended to create a general scoring calculator for Mahjong and user can customize them accordingly.

The application will have a page to let user to generate his/her winning hand, by selecting the tiles they have in hand and meld(pong, kong , and chow) on the table. Then the calculator is going to evaluate the hand and determine if it is a valid win(hu) or not.

## Functionality & MVPs

# In this Mahjong calculator, users will be able to:
- construct their winning hand by choosing the tiles
- have a button to submit the hand to evaluate if it is a winning hand or not
- identify some speical hand
- Reset the hand

# In addition, this project will include:
- A production README
- An About modal explaining how to use the tool

## Wire Frame
[https://wireframe.cc/1MyPGK]
## Technology, Library, and APIs
- Webpack and Babel to bundle and transpile the source Javascript
- npm to manage project dependency

## Implementation Timeline
- Thursday: Create tile class in JavaScript and create the front end tile selection form
- Friday and weekend: Create game class object store all hand and melds for evaluation. Connect the Game object with front end interface. Add restriction to the front end tile choosing to prevent invalid max hand number
- Monday: Fix bugs and errors of event listener for adding tiles to hand and continue working on game class helper function for winning hand detection
- Tuesday: Write a sorting callback function to display hand tiles in order. Continue working on the evaluation function
- Wednesday: Finish the evalutaion function for winning hand and test for edge cases
- Thursday: Final touch on errors and bugs in backend. Create required html element on the front end page and add styles and interface in tiles selection

## Future improvment in functionality:
- Calculate the score that the winning hand can get
- Add the form to submit the winning situation(wind of the game, win from stealing kong, etc.)
- Have default setting for some popular Mahjong rules
- remove tile from hand or meld by clicking the tile
