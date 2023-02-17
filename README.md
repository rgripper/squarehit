## Squarehit

This is browser-base game. A simple grid with battleships.
You can see a deployed version here: https://rgripper.github.io/squarehit/

## Rules

When all of the ships are sunk the game is over.
Ships are randomly allocated in a way that no ships are adjacent to each other.

## Notes

I know ship adjacency condition is not in the assignment, but it makes sense to have it.
Written in React and Typescript.
There are also a few basic unit tests.

## Hot to run

Assuming you have NodeJS on your machine, run this in your terminal:

```shell
git clone https://github.com/rgripper/squarehit.git
cd squarehit
npm -g add pnpm
pnpm i
pnpm build # to build
pnpm preview # to run local server with a preview of the game (http://127.0.0.1:4173/squarehit)
```
