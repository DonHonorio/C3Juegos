import React from 'react'

const Estrella = ({ fill, stroke, className, onMouseEnter, onMouseLeave }) => {
  return (
    <svg className={className} 
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.34214 21.957L7.02735 14.6078L7.09416 14.3165L6.86916 14.1197L1.21204 9.17209L8.68362 8.51783L8.98446 8.49149L9.10116 8.21295L12 1.29392L14.8988 8.21295L15.0155 8.49149L15.3164 8.51783L22.788 9.17209L17.1308 14.1197L16.9058 14.3165L16.9726 14.6078L18.6579 21.957L12.2599 18.0637L12 17.9055L11.7401 18.0637L5.34214 21.957Z" 
        fill={fill}
        stroke={stroke}
      />
    </svg>
  )
}

export default Estrella