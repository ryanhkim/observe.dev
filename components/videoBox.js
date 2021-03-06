import React from "react";
import Router from "next/router";
import VideoTitle from "./videoTitle";
import MediaPlayer from "./mediaPlayer";

/**
 * VideoBox: component for holding video box in each video post page
 */
export default class VideoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoElement: null,
      isLoaded: false,
      videoId: null,
      searchQuery: null
    };
  }

  componentWillMount() {
    if (this.state.isLoaded === false) {
      let videoProp = this.props.video;
      let searchProp = this.props.searchQuery;
      let vidID = this.props.video.VideoURL.replace("https://youtu.be/", "");
      this.setState({
        videoElement: videoProp,
        isLoaded: true,
        videoId: vidID,
        searchQuery: searchProp
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm" />
        <div
          className="col-lrg"
          style={{
            paddingRight: "8%",
            paddingLeft: "8%",
            borderColor: "lightgray",
            borderStyle: "solid",
            borderRadius: "8px"
          }}
        >
          <br />
          <div
          // onClick={() =>
          //   Router.push(`/posts/${videoID}/${this.state.searchQuery}`)
          // }
          >
            <h3 class="mt-0" style={{}}>
              <VideoTitle videoElem={this.state.videoElement} />
            </h3>
          </div>

          {console.log(this.state.videoId)}
          {console.log("https://www.youtube.com/embed/" + this.state.videoId)}

          <MediaPlayer
            searchQuery={this.state.searchQuery}
            vidElem={this.state.videoElement}
            videoID={this.state.videoId}
            vidURL={"https://www.youtube.com/embed/" + this.state.videoId}
          />

          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="col-sm" />
      </div>
    );
  }
}
