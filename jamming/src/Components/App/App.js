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
      searchResults: [],
      playlistName: 'My playlist',
      playlistTrack: []
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
