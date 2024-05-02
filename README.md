# Elevator Simulation
This projects helps visualize elevator movement for a varied number of floors and elevators.

## Algorithm
This system uses a simple FCFS (first-come, first-serve) algorithm to assign the closest elevator to the floor from which it was called.
This simplifies the implementation, but introduces coverage problems - there is a possibility of "starving" outlier floors if not enough elevators are available.
In the future I plan to improve this by adding a request queue and dispatching elevators in a way that minimizes direction changes.

## Usage
- use the top panel to adjust simulation parameters - number of floors and elevators (accepted values are 0-16)
- use the buttons on the left to call an elevator to a specific floor
- use the buttons inside elevators to pick the floor you want to move to

## Setup
To use this app locally, clone this repository and install required dependencies:
```bash
npm install
```
Then start a development server:
```bash
npm run dev
```
Or build and preview the production version:
```bash
npm run build
npm run preview
```
