import React from 'react';
import './App.css';
import TrackList from '../Tracklist/TrackList';
import Track from '../Track/Track';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResult';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../Util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
        { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
        { name: 'name3', artist: 'artist3', album: 'album3', id: 3 }],
      playlistName: 'My playlist',
      playlistTrack: [
        { name: 'playlistName1', artist: 'playlistArtist1', album: 'playlistAlbum1', id: 4 },
        { name: 'playlistName2', artist: 'playlistArtist2', album: 'playlistAlbum2', id: 5 },
        { name: 'playlistName3', artist: 'playlistArtist3', album: 'playlistAlbum3', id: 6 }]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //removeTrack

  removeTrack(track) {
    let tracks = this.state.playlistTrack
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTrack: tracks });

  }

  //addTrack

  addTrack(track) {
    let tracks = this.state.playlistTrack;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }


    tracks.push(track);
    this.setState({ playlistTrack: tracks })

  }


  //update playlistName
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  //savePlaylist
  savePlaylist() {
    const trackUris = this.state.playlistTrack.map(track => track.uri);
    Spotify.savePlayList(this.state.playlistName, trakUris).then(() => {
      this.setState({
        playlistName: 'New Playlist' ,
        playlistTracks: []
      })
    })
  }

  //Search
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  // render
  render() {
    return (<div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTrack={this.state.playlistTrack}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
        </div>
      </div>
    </div>)

  }
}


export default App;
