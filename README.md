# TV MAZE App

<img src="https://lenarfattakhov.com/assets/tvmaze/2.png" width="700px" />

<img src="https://lenarfattakhov.com/assets/tvmaze/1.png" width="700px" />

## Features

- **Browse Shows by Genre**: Users can view all shows categorized under genres.
- **Show Details**
- **Load More**: Shows are loaded on-demand as the user clicks "Load More", enhancing performance and user experience.
- **Search Functionality**: Users can search for shows by their names.
- **Responsive Design**: Compatible with desktop and mobile devices.

## Technologies Used

- **Vue3** with Composition API
- **Tailwind CSS** for styling
- **Vitest** for unit tests
- **Pinia** for state management
- **vue-router** for routing

## Solutions

- I tried to keep components dumb, making it easier to maintain and test them
- Added unit tests to components which contain any logic and to the store
- For simplicity search uses /singlesearch endpoint to find a single show which matches the query the most
- Used Pinia to store all the shows data
- tvmaze.com only returns 250 shows in a page. And there are 305 pages, therefore you need to click on "Load More" button to load the next page

## Installation

Node version - v20
NPM - v10.5

- `npm install`
- `npm run dev`
