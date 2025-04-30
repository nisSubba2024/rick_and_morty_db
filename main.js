const grid = document.querySelector('.grid');
const characterDb = [];
const apiRequest = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`${response.status}, ${response.statusText}`);
            return;
        }
        return await response.json();
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const fetchData = async () => {
    let apiUrl = `https://rickandmortyapi.com/api/character`;

    while (apiUrl) {
        const data = await apiRequest(apiUrl);
        for (const character of data.results) {
            const firstEpisode = character.episode[0];
            const firstEpisodeData = await apiRequest(firstEpisode);
            const lastEpisode = character.episode[character.episode.length - 1];
            const lastEpisodeData = await apiRequest(lastEpisode);

            const characterData = {
                id: character.id,
                name: character.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                origin: character.origin.name,
                location: character.location.name,
                avatar: character.image,
                firstEpisode: firstEpisodeData.name,
                lastEpisode: lastEpisodeData.name,
            }

            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('loading', 'lazy');

            // Avatar
            const avatar = document.createElement('div');
            avatar.classList.add('avatar');
            const avatarImg = document.createElement('img');
            avatarImg.setAttribute('src', characterData.avatar);
            avatarImg.setAttribute('alt', `${characterData.name} avatar`);
            avatar.appendChild(avatarImg);
            card.appendChild(avatar);

            // Details
            const details = document.createElement('div');
            details.classList.add('details');

            // Bio
            const bio = document.createElement('div');
            bio.classList.add('bio');

            const name = document.createElement('h2');
            name.classList.add('name');
            name.textContent = characterData.name;
            bio.appendChild(name);

            // Status field
            const statusField = document.createElement('p');
            statusField.classList.add('status-field');

            const statusIndicator = document.createElement('span');
            statusIndicator.classList.add('status-indicator');
            statusField.appendChild(statusIndicator);

            const status = document.createElement('span');
            status.classList.add('status');
            status.textContent = characterData.status;
            statusField.appendChild(status);
            card.classList.add(`${characterData.status.toLowerCase()}`);

            statusField.appendChild(document.createTextNode(' - '));

            const species = document.createElement('span');
            species.classList.add('species');
            species.textContent = characterData.species;
            statusField.appendChild(species);

            bio.appendChild(statusField);

            // Gender
            const genderField = document.createElement('p');
            genderField.classList.add('gender-field');
            genderField.textContent = 'Gender: ';
            const gender = document.createElement('span');
            gender.classList.add('gender');
            gender.textContent = characterData.gender;
            genderField.appendChild(gender);
            bio.appendChild(genderField);

            // Origin
            const originField = document.createElement('p');
            originField.classList.add('origin-field');
            originField.textContent = 'Origin: ';
            const origin = document.createElement('span');
            origin.classList.add('origin');
            origin.textContent = characterData.origin;
            originField.appendChild(origin);
            bio.appendChild(originField);

            details.appendChild(bio);

            // Location
            const locationDiv = document.createElement('div');
            locationDiv.classList.add('location');
            const locationLabel = document.createElement('p');
            locationLabel.classList.add('location-label');
            locationLabel.textContent = 'Last known location:';
            const locationName = document.createElement('p');
            locationName.classList.add('location-name');
            locationName.textContent = characterData.location;
            locationDiv.appendChild(locationLabel);
            locationDiv.appendChild(locationName);
            details.appendChild(locationDiv);

            // First Episode
            const firstEpDiv = document.createElement('div');
            firstEpDiv.classList.add('episode', 'first-episode');
            const firstEpLabel = document.createElement('p');
            firstEpLabel.classList.add('episode-label');
            firstEpLabel.textContent = 'First appearance in:';
            const firstEpField = document.createElement('p');
            firstEpField.classList.add('episode-field');
            const firstEpName = document.createElement('span');
            firstEpName.classList.add('episode-name');
            firstEpName.textContent = characterData.firstEpisode;
            firstEpField.appendChild(firstEpName);
            firstEpDiv.appendChild(firstEpLabel);
            firstEpDiv.appendChild(firstEpField);
            details.appendChild(firstEpDiv);

            // Last Episode
            const lastEpDiv = document.createElement('div');
            lastEpDiv.classList.add('episode', 'last-episode');
            const lastEpLabel = document.createElement('p');
            lastEpLabel.classList.add('episode-label');
            lastEpLabel.textContent = 'Last appearance in:';
            const lastEpField = document.createElement('p');
            lastEpField.classList.add('episode-field');
            const lastEpName = document.createElement('span');
            lastEpName.classList.add('episode-name');
            lastEpName.textContent = characterData.lastEpisode;
            lastEpField.appendChild(lastEpName);
            lastEpDiv.appendChild(lastEpLabel);
            lastEpDiv.appendChild(lastEpField);
            details.appendChild(lastEpDiv);

            // Append everything
            card.appendChild(details);

            grid.appendChild(card);

            characterDb.push(characterData);
        }
        apiUrl = data.info.next;
    }
}

fetchData().catch(console.error);