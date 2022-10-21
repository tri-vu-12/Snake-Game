
This is a sample project used to help teach some quick programming concepts and helps students create a project that will auto-deploy and be ready for them to share with others.

# Tasks for Students

Track your progress with the project by updating the checkmarks down below

## Set up
- [x] Read this readme
- [x] Fork this project into your own Github project
- [x] Confirm that your website is auto-deployed to [GitHub Pages](https://tri-vu-12.github.io/Snake-Game/game) 
  - [x] Make sure to update the `tri-vu-12` text on the line above to your github username
- [x] Make sure the following are installed (Two of these will already be installed on computer sets up for robotics)
  - [x] Git: [Install](https://git-scm.com/downloads)
  - [x] VS Code: [Install](https://code.visualstudio.com/download)
  - [x] Node.js: [Install](https://nodejs.org/en/)
- [x] Install node packages `npm install` in a command line window
- [x] Start the server locally: `npm run dev`
- [x] Browser to the local server: [http://localhost:3000/](http://localhost:3000/)

## Grid Helper

**All these changes can be made in `./game/studentCode.ts`**

- [x] getGridSize - you can change it from 10 to something, to see how it changes, but return to 10 after
- [ ] getBoardSpeedMs - we can explain it, but we will need to go back to it after the snake is moving
- [ ] createApple - change from going to the first cell to a random cell
- [ ] getDirection - we can explain how switch statements work and enums (for the Direction enum)

## Snake

**All these changes can be made in `./game/studentCode.ts`**

- [ ] Handle moving the snake head from the direction passed in
- [ ] Detect collision with a wall
- [ ] Detect collision with an apple
- [ ] Handle consuming an apple
- [ ] Add default body parts
- [ ] Handle updating the snake body when the head moves
- [ ] Detect collisions with the body
- [ ] Update background for the apple to `./game-assets/apple.png`
- [ ] Update image parts for the snake

# Next.js Documentation

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

