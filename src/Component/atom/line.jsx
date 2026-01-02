import React from 'react'


function Line({marginTop, marginBottom, width}) {
  return (
     <hr
        style={{
          width: width || "100%",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          marginTop: marginTop || 12,
          marginBottom: marginBottom || 16,
        }}
      />
  )
}

export default Line