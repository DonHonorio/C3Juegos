import React from 'react'
import './LineaDivisoria.css'

const LineaDivisoria = ({clase=""}) => {
  return (
    <div className={`linea_divisioria text-center ${clase}`}>
      <svg width="100%" height="2" viewBox="0 0 1320 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1" x2="1320" y2="1" stroke="#D0D0D0" strokeWidth="2"/>
      </svg>
    </div>
  )
}

export default LineaDivisoria