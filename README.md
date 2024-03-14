# JavaScriptProject1

## Background

Mahjong is a tile based game that was developed in the 19th century in China and has spread throughout the world since the early 20th century. Different region got different scoring and playing rules, but they all follow many basic rules. This project is intended to create a general scoring calculator for Mahjong and user can customize them accordingly.

The application will have a page to let user to generate his/her winning hand, by selecting the tiles they have in hand and meld(pong, kong , and chow) on the table. Then the calculator is going to generate the score(fan) for winning this hand.

## Functionality & MVPs

In this Mahjong calculator, users will be able to:
- construct their winning hand by choosing the tiles
- have a button to submit the hand to evaluate if it is a winning hand or not
- identify some speical hand
- have a setting button to get into a setting interface to customize scoring points rules
- clear the hand

In addition, this project will include:
- Calculate the score that the winning hand can get
- Add the form to submit the winning situation(wind of the game, win from stealing kong, etc.)
- Have default setting for some popular Mahjong rules


## Wire Frame
[https://wireframe.cc/1MyPGK]
## Technology, Library, and APIs
- Dom
- npm

## Implementation Timeline
- Thursday: Create tile class in JavaScript and create the front end tile selection form
- Friday and weekend: Create game class that includes the winning hand detection function and score calculator, connect the game class logic with the front end tile selection
- Monday: Create setting bar for customize scoring rules
- Tuesday: Final touch and bug fix, start creating final proposal
