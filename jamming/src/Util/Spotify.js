const cliendID = '243da855fd454677ad92aae227a3e848';
const redirectUri = 'http://localhost/3000';
let accessToken;


const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // check for access token match
        const access = window.location.href.match(/access_token=([^&]*)/);
        const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expireInMatch) {
            accessToken = accessTokenMatch[1];
            const expireIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access Token when it expires.
            window.setTimeout(() => accessToken = '', expireIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=CLIENT_ID=${cliendID}&response_type=token&scope=playlist-modify-public&redirect_uri=REDIRECT_URI=${redirectUri}`;
            window.location = accessUrl;
        }




    }, search(team) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });

    },
    savePlayList(name , trackUris) {
        if (!name || !trackUris.length){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {userID = jsonResponse.Id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name})
        }).then(response => response.json()
        ).then(jsonResponse =>{
            const playlistId = jsonResonse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({  uris: trackUris })
            });
        });
    });

}
}
export default Spotify;