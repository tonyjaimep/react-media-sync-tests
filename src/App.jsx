import React from 'react'
import MediaTester from './components/media-tester'

import audioSource from './assets/audio.mp3'
import videoSource from './assets/video.mp4'

const MEDIA_SOURCES = {
  audio: audioSource,
  video: videoSource,
}

const App = () => {
  const [tentativeCurrentTime, setTentativeCurrentTime] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [isVideoMuted, setIsVideoMuted] = React.useState(true)
  const [loop, setLoop] = React.useState(null)
  const [tentativeLoopStart, setTentativeLoopStart] = React.useState(0)
  const [tentativeLoopEnd, setTentativeLoopEnd] = React.useState(1)

  const handleCurrentTimeFormSubmit = React.useCallback(
    (event) => {
      event.preventDefault()
      // Add random value to trigger re-render
      setCurrentTime(
        Math.random() * 0.01
        + Number(tentativeCurrentTime)
      )
    },
    [tentativeCurrentTime]
  )

  const handleTentativeCurrentTimeInputChange = React.useCallback(
    (event) => {
      setTentativeCurrentTime(event.target.value)
    },
    []
  )

  const handleTentativeLoopStartChange = React.useCallback(
    (event) => {
      setTentativeLoopStart(event.target.value)
    },
    []
  )

  const handleTentativeLoopEndChange = React.useCallback(
    (event) => {
      setTentativeLoopEnd(event.target.value)
    },
    []
  )

  const toggleIsVideoMuted = () => setIsVideoMuted((oldValue) => !oldValue)

  const toggleLoop = React.useCallback(() => {
    setLoop((previousLoop) => {
      if (previousLoop) {
        return null
      } else {
        return {
          start: tentativeLoopStart,
          end: tentativeLoopEnd,
        }
      }
    })
  }, [tentativeLoopStart, tentativeLoopEnd])

  return (
    <>
      <h1>Media Tester</h1>
      <form onSubmit={handleCurrentTimeFormSubmit}>
        <input
          type="number"
          onChange={handleTentativeCurrentTimeInputChange}
          value={tentativeCurrentTime}
        />
        <button type="submit">Set currentTime</button>
      </form>
      <div>
        <label htmlFor="loopStart">Loop start</label>
        <input
          name="loopStart"
          type="number"
          onChange={handleTentativeLoopStartChange}
          value={tentativeLoopStart}
        />
        <label htmlFor="loopStart">Loop end</label>
        <input
          name="loopEnd"
          type="number"
          onChange={handleTentativeLoopEndChange}
          value={tentativeLoopEnd}
        />
        <button type="button" onClick={toggleLoop}>
          {loop ? 'Quit loop' : 'Loop'}
        </button>
      </div>
      <button type="button" onClick={toggleIsVideoMuted}>
        {isVideoMuted ? 'Unmute video' : 'Mute video'}
      </button>
      <MediaTester
        currentTime={currentTime}
        loop={loop}
        sources={MEDIA_SOURCES}
      />
    </>
  )
}

export default App
