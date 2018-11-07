import React, { Component } from 'react';

class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar">
                <section id="buttons">
                    <button id="previous" onClick={this.props.handlePrevClick}>
                        <span className="ion-skip-backward" />
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick} >
                        <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'} />
                    </button>
                    <button id="next" onClick={this.props.handleNextClick} >
                        <span className="ion-skip-forward" />
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">{this.props.currentTime}</div>
                    <input
                        type="range"
                        className="seek-bar"
                        value={(this.props.currentTime / this.props.duration) || 0}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleTimeChange}
                    />
                    <div className="total-time">-:--</div>
                </section>
                <section id="volume-control">
                    <div className="icon ion-volume-low" />
                    <input type="range" className="seek-bar" value="80" />
                    <div className="icon ion-volume-high" />
                </section>
            </section>
        );
    }
}

export default PlayerBar;