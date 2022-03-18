import React from "react";
import ReactHowler from "react-howler";
import raf from "raf"; // requestAnimationFrame polyfill
import Switch from "@mui/material/Switch";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

// 1. Creating a class called FullControl which getting props from its father component,
//    This component holds the following states.
class FullControl extends React.Component {
  constructor(props) {
    super(props);
    // setting the initial component state
    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0,
      seek: 0.0,
      rate: 1,
      isSeeking: false,
    };
  }

  componentWillUnmount() {
    this.clearRAF();
  }

  // On update
  componentDidUpdate() {
    // if isPlayAll is signaled, and we are not playing, start playing:
    if (this.props.isPlayAll && !this.state.playing) {
      this.setState({ playing: true }); // start playing.
      // we need to turn the signal off on the parent side using the "handlePlayAll" function recived.
      this.props.handlePlayAll(); // signal Parent component that we reacted to the signal,
      // and reset the signal to false
    }

    // if parent signaled isStopALl, we neet to stop the player, and signal back we stopped.
    if (this.props.isStopAll) {
      this.setState({ playing: false }); // stop the player
      this.props.handleStopAll(); // signal we stopped.
    }
  }

  // Handles play/pause button
  handleToggle = () => {
    // reverse the state, playing/not playing.
    this.setState({
      playing: !this.state.playing,
    });
  };

  // Callback function when player finished loading
  handleOnLoad = () => {
    this.setState({
      loaded: true,
      duration: this.player.duration(),
    });
  };

  // This function called when audio starts or resumes playing.
  handleOnPlay = () => {
    this.setState({
      playing: true,
    });
    this.renderSeekPos();
  };

  // handles media finishes playing
  handleOnEnd = () => {
    this.setState({
      playing: false,
    });
    this.clearRAF();
  };

  // handles stop button,it reset the audio example to the start by renderSeekPos function
  handleStop = () => {
    this.player.stop();
    this.setState({
      playing: false, // Need to update our local state so we don't immediately invoke autoplay
    });
    this.renderSeekPos();
  };

  // This function is called when the user is marking the loop checkbox. it is only changing the loop state.
  handleLoopToggle = () => {
    this.setState({
      loop: !this.state.loop,
    });
  };
  // This function is called when the user is marking the mute checkbox. it is only changing the mute state.
  handleMuteToggle = () => {
    this.setState({
      mute: !this.state.mute,
    });
  };

  // when holding down the seeking slider, isSeeking=true
  handleMouseDownSeek = () => {
    this.setState({
      isSeeking: true,
    });
  };

  // when releasing the slider, isSeeking=false, and change audio position
  handleMouseUpSeek = (e) => {
    this.setState({
      isSeeking: false,
    });

    this.player.seek(e.target.value); // change the player location to the dropped location of the slider.
  };

  // change the current position of the Audio [seek location]
  handleSeekingChange = (e) => {
    this.setState({
      seek: parseFloat(e.target.value),
    });
  };

  renderSeekPos = () => {
    // if we are not seeking, change the state of the seek (the time)
    // (while we are seeking we want the time to not move every ms)
    if (!this.state.isSeeking) {
      this.setState({
        seek: this.player.seek(),
      });
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  };

  clearRAF = () => {
    raf.cancel(this._raf);
  };

  render() {
    return (
      <div
        style={{
          background: this.props.backGroundColor,
          width: "80%",
        }}
      >
        <div
          className="full-control"
          style={{
            display: "flex",
          }}
        >
          <ReactHowler
            src={this.props.src}
            playing={this.state.playing}
            onLoad={this.handleOnLoad}
            onPlay={this.handleOnPlay}
            onEnd={this.handleOnEnd}
            loop={this.state.loop}
            mute={this.state.mute}
            volume={this.state.volume}
            ref={(ref) => (this.player = ref)}
          />

          <div className="toggles">
            <label>
              Loop:
              <Switch
                checked={this.state.loop}
                onChange={this.handleLoopToggle}
              />
            </label>
            <label>
              Mute:
              <Switch
                checked={this.state.mute}
                onChange={this.handleMuteToggle}
              />
            </label>
          </div>

          <div
            className="seek"
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <label> 
              <span className="slider-container">
                <input
                  type="range"
                  min="0"
                  max={this.state.duration ? this.state.duration.toFixed(2) : 0}
                  step=".01"
                  value={this.state.seek}
                  onChange={this.handleSeekingChange}
                  onMouseDown={this.handleMouseDownSeek}
                  onMouseUp={this.handleMouseUpSeek}
                />
              </span>
            </label>
            <p style={{ margin: "1px" }}>
              {this.state.seek.toFixed(2)}
              {" / "}
              {this.state.duration ? this.state.duration.toFixed(2) : "NaN"}
            </p>
          </div>

          <div className="volume">
            <label>
              Volume:
              <span className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={this.state.volume}
                  onChange={(e) =>
                    this.setState({ volume: parseFloat(e.target.value) })
                  }
                />
              </span>
              {this.state.volume.toFixed(2)}
            </label>
          </div>
        </div>

        <div>
          <IconButton onClick={this.handleToggle}>
            {this.state.playing && !this.props.isStopAll ? (
              <PauseIcon />
            ) : (
              <PlayArrowIcon />
            )}
          </IconButton>
          <IconButton onClick={this.handleStop}>
            <StopIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default FullControl;
