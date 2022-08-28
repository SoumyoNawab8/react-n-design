import React from 'react'
import "./style.scss";

export default function Card({ children, hideHeader = false, title, headerAction, customFooter = null, footer }) {
  return (
    <div className="rnd-card">
      {/* Card Header */}
      {!hideHeader && <div className="rnd-card-header">
        <span className="rnd-card-title">{title}</span>
        <div className="rnd-card-right">{headerAction}</div>
      </div>}
      {/* card body */}
      <div className='rnd-card-body'>{children}</div>
      {/* card footer */}
      <div className="rnd-card-footer">
        {customFooter ? customFooter :
          <div className="rnd-card-default-footer">
            {footer}
          </div>}
      </div>
    </div>
  )
}
