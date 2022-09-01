import React from 'react'
import PropTypes from 'prop-types';
import "./style.scss";

function Tabs({ active, options, className, handleTabChange }) {
    return (
        <div className={`rnd-tabs ${className}`}>
            <div className='rnd-tab-options'>
                {options.map((item, indx) => <div className={`rnd-tab-name ${active === indx ? 'rnd-tab-name-active' : ''}`} key={JSON.stringify(item)} onClick={() => handleTabChange(indx)} >{item.tabName}</div>)}
            </div>
            <div className='rnd-tab-body'>
                {options[active].content}
            </div>
        </div>
    )
}

Tabs.propTypes = {
    active: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
    handleTabChange: PropTypes.func,
}

Tabs.defaultProps = {
    active: 0,
}

export default Tabs;