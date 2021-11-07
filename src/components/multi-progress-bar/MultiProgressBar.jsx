import React from "react"
import PropTypes from "prop-types"

import './MultiProgressBar.css'

const MultiProgressBar = ({ progresses }) => {
  return (
    <div className="multi-progress-bar">
      {progresses.map((progress, index) => (
        <div
          className={`multi-progress-bar__bar multi-progress-bar__bar--${index}`}
          style={{ width: `${progress * 100}%` }}
          key={Math.random()}
        />
      ))}
    </div>
  )
}

MultiProgressBar.propTypes = {
  progresses: PropTypes.arrayOf(PropTypes.number),
}

export default MultiProgressBar
