import React from 'react'
import PropTypes from 'prop-types'
import "./style.scss";

function Card({ children, hideHeader, title, headerAction, customFooter, disableBorder, loading, className }) {
  return (
    <div className={`rnd-card ${!disableBorder ? 'rnd-card-outlined' : ''} ${className} ${loading ? 'isLoading' : ''}`}>
      {/* Card Header */}
      {!hideHeader && <div className="rnd-card-header">
        <span className="rnd-card-title">{!loading && title}</span>
        {headerAction && <div className="rnd-card-right">{headerAction}</div>}
      </div>}
      {/* card body */}
      <div className='rnd-card-body'>{!loading && children}</div>
      {/* card footer */}
      {!loading && customFooter && <div className="rnd-card-footer">
        {customFooter}
      </div>}
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  hideHeader: PropTypes.bool,
  customFooter: PropTypes.node,
  headerAction: PropTypes.node,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  disableBorder: PropTypes.bool,
  className: PropTypes.string,
}

Card.defaultProps = { hideHeader: false, customFooter: null, disableBorder: false, loading: false, className: '' }


export default Card;