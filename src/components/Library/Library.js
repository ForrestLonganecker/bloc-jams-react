import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../../data/albums';
import './Library.css';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
    }

    render() {
        return (
            <section className='library'>
                {
                    this.state.albums.map( (album, index) =>
                        <Link className="App-Link" to={`/album/${album.slug}`} key={index}>
                                <img src={album.albumCover} alt={album.title} />
                                <section className="album-info">
                                    <div>{album.title}</div>
                                    <div>{album.artist}</div>
                                    <div>{album.songs.length} songs</div>
                                </section>    
                        </Link>
                    )
                }
            </section>
        );
    }
}

export default Library;