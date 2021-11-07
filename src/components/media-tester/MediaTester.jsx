import React from 'react'
import PropTypes from 'prop-types'

import MultiProgressBar from '../../components/multi-progress-bar'

const MediaTester = ({ currentTime, loop, muteVideo, sources }) => {
  const audioRef = React.useRef()
  const videoRef = React.useRef()
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progresses, setProgresses] = React.useState([])

  React.useEffect(() => {
    if (audioRef.current && videoRef.current) {
      audioRef.current.currentTime = currentTime
      videoRef.current.currentTime = currentTime
    }
  }, [currentTime])

  const handleAnyTimeUpdate = React.useCallback((value) => {
    if (loop && value >= loop.end) {
      audioRef.current.currentTime = loop.start
      videoRef.current.currentTime = loop.start
    }
  }, [loop])

  const handleAudioTimeUpdate = React.useCallback((event) => {
    const newTime = event.target.currentTime
    setProgresses([
      newTime / event.target.duration,
      videoRef.current.currentTime / videoRef.current.duration
    ])
    handleAnyTimeUpdate(newTime)
  }, [handleAnyTimeUpdate])

  const handleVideoTimeUpdate = React.useCallback((event) => {
    const newTime = event.target.currentTime
    setProgresses([
      audioRef.current.currentTime / audioRef.current.duration,
      newTime / event.target.duration,
    ])
    handleAnyTimeUpdate(newTime)
  }, [handleAnyTimeUpdate])

  const toggleIsPlaying = React.useCallback(
    () => {
      setIsPlaying((wasPlaying) => {
        if (wasPlaying) {
          audioRef.current.pause()
          videoRef.current.pause()
        } else {
          audioRef.current.play().then(() => {
            videoRef.current.play()
          })
        }

        return !wasPlaying
      })
    },
    []
  )

  return (
    <>
      <button type="button" onClick={toggleIsPlaying}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <audio
        onTimeUpdate={handleAudioTimeUpdate}
        preload="auto"
        ref={audioRef}
        src={sources.audio}
      />
      <video
        onTimeUpdate={handleVideoTimeUpdate}
        playsInline
        preload="auto"
        ref={videoRef}
        src={sources.video}
        muted={muteVideo}
      />
      <MultiProgressBar progresses={progresses} />
    </>
  )
}

MediaTester.propTypes = {
  currentTime: PropTypes.number.isRequired,
  loop: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
  }),
  muteVideo: PropTypes.bool,
  sources: PropTypes.shape({
    audio: PropTypes.string,
    video: PropTypes.string,
  }).isRequired,
}

MediaTester.defaultProps = {
  loop: null,
  muteVideo: true,
}

export default React.memo(MediaTester)
