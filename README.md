
# Rick and Morty Character Database

This project fetches character data from the [Rick and Morty API](https://rickandmortyapi.com/) and dynamically displays the information in a grid format. Each character card includes details such as:

- Character's name
- Status (Alive/Dead)
- Species
- Gender
- Origin
- Last known location
- First appearance in the show
- Last appearance in the show

## Features

- Fetches data from the Rick and Morty API.
- Displays character data in a responsive grid layout.
- Displays details of each character, including their avatar and episodes they appeared in.
- Loads character information lazily to improve performance.

## How it Works

1. **Fetching Data**: The `fetchData` function makes requests to the Rick and Morty API to fetch character data. It loops through all available pages of the API until no more data is available.
   
2. **Creating Character Cards**: For each character, a `div` card is created that contains the character's avatar, bio, status, species, gender, origin, location, first appearance, and last appearance.

3. **Error Handling**: The code includes error handling for both API request errors and unsuccessful API responses.

## Example Character Card

Each character card will look something like this:

- Name: Rick Sanchez
- Status: Alive
- Species: Human
- Gender: Male
- Origin: Earth (C-137)
- Location: Earth (C-137)
- First Appearance: "Pilot"
- Last Appearance: "The Ricklantis Mixup"
