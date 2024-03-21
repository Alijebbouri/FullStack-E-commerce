import React from 'react'

function Loading() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-2">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div>
            Loading data ...
        </div>
    </div>
  )
}

export default Loading