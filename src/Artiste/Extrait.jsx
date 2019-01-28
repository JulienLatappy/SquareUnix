import React from 'react';
import YouTube from 'react-youtube';
 
export default class Media extends React.Component {
  render() {
    const opts = {
      height: '570',
      width: '75%' ,
      playerVars: {
        autoplay: 0,
        start: 120,
        end: 300,
        controls: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
      }

    };
 
    return (
      <YouTube
        videoId="3dm_5qWWDV8"
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
}
