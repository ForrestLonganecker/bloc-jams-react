import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);
        
        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });

        this.state = {
            album: album,
            currentSong: null,
            currentSongIndex: null,
            currentTime: 0,
            duration: album.songs[0].duration,
            volume: 0.8,
            isPlaying: false,
            isHovered: false
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }

    setSong(song, index) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
        this.setState({ currentSongIndex: index });
    }

    handleSongClick(song, index) {
        const isSameSong = this.state.currentSongIndex === index;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
          if (!isSameSong) { 
            this.setSong(song, index); 
            }

            this.play();
        }
    }

    handleHover(index) {
        this.setState({ isHovered: index });
    }

    displayButton(song, index) {
        if ( this.state.isHovered === index) {
            if ( this.state.currentSongIndex === index ) {
                if ( this.state.isPlaying === true ) {
                    return <button type="button" className="ion-pause" />;
                }
                else {
                    return <button type="button" className="ion-play" />;
                }
            }
            else {
                return <button type="button" className="ion-play" />;
            }
        }
        else if ( this.state.currentSongIndex === index) {
            if ( this.state.isPlaying === true ) {
                return <button type="button" className="ion-pause" />;
            }
            else {
                return <button type="button" className="ion-play" />;
            }
        }
        else {
            return index +1;
        }
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    
    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            }
        };

        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.evenListeners.durationchange);
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    formatTime(inputTime) {
        var minutes = Math.floor(inputTime / 60);
        var seconds = Math.floor(inputTime % 60);

        if (minutes > 0) {
            return minutes + ":" + (seconds < 10 ? 0 : seconds);
        } else if (seconds < 10 && seconds > 0) {
            return "0:" + "0" + seconds;
        } else {
            return "-:--";
        }
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({ volume: newVolume });
    }

    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                      {
                        this.state.album.songs.map( (song, index) =>
                            <tr className="song" key={index} onClick={() => this.handleSongClick(song, index)} onMouseEnter={() => this.handleHover(index) } onMouseLeave={() => this.setState({ isHovered: false}) }>
                                <td> 
                                    { this.displayButton(song, index) } 
                                </td>
                                <td>{song.title}</td>
                                <td>{this.formatTime(song.duration)}</td>
                            </tr>
                        )
                      }
                    </tbody>
                </table>
                <PlayerBar 
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration}
                    volume={this.audioElement.volume}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                    formatTime={(inputTime) => this.formatTime(inputTime)}
                />
            </section>
        );
    }
}

export default Album;