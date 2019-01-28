import React from 'react';
import YouTube from 'react-youtube';


 
export default class Media extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            video : []
        }
    }



  render() {
    const opts = {
      height: '470',
      width: '75%' ,
      playerVars: {
        autoplay: 1,
        start: 9638,
        end: 300,
        controls: 1,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
      }

    };
 
    return (
      <YouTube
        videoId= "UpBDxRUZP-8"
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
}