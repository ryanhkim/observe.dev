import React from "react";
import Router from "next/router";
import AnnotationList from "./annotationList";
import { render } from "react-dom";
import VideoTitle from "./videoTitle";
import VideoInfo from "./videoInfo";

/**
 * VideoListing: component for each video for search result page
 */
class VideoListing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var videoElementFinal = this.props.videoElement;
    const videoId = videoElementFinal.VideoURL.replace("https://youtu.be/", "");
    console.log(videoId);
    const url = "https://noembed.com/embed?url=" + videoElementFinal.VideoURL;

    return (
      <div>
        <div
          style={{
            paddingTop: "2%",
            paddingBottom: "1.3%",
            paddingLeft: "5%",
            paddingRight: "5%",
            borderStyle: "solid",
            borderColor: "lightgray",
            borderRadius: "8px"
          }}
        >
          <div className="media">
            <div
            // onClick={() =>
            //   // Router.push(`/posts/${videoId}/${this.props.searchQuery}`)
            // Router.push(
            //   `/posts/ ${videoId}/${JSON.stringify(videoElementFinal)}`
            // )
            // }
            >
              <img
                className="mr-3"
                style={{ width: "170px" }}
                src={
                  "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg"
                }
                alt="YouTube Thumbnail Goes Here"
              />
            </div>
            <div className="media-body">
              <div
              // onClick={() =>
              //   // Router.push(`/posts/${videoId}/${this.props.searchQuery}`)
              //   Router.push(
              //     `/posts/ ${videoId}/${JSON.stringify(videoElementFinal)}`
              //   )
              // }
              >
                <h6 className="mt-0" style={{}}>
                  <VideoTitle videoElem={videoElementFinal} />
                </h6>
              </div>

              {/* number of instances would be something like annotations(video.Annotations).filter(x === query).length */}

              <VideoInfo
                searchQuery={this.props.searchQuery}
                vidElem={videoElementFinal}
              />
            </div>
          </div>
          <div>
            <br />
            <AnnotationList
              videoElem={videoElementFinal}
              searchResult={false}
              videoID={null}
            />
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default VideoListing;
