import React from 'react'

function Video() {
  return (
<center>
<div className="row">
      <div className="col">
        <div className="video-container">
          <video autoPlay controls src={"/videos/event-fest.mp4"} className="object-fit-contain" style={{ width: "99%", height: "auto" }}/>
        </div>
      </div>
    </div>
</center>
  )
}

export default Video
