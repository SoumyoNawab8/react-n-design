import React from 'react'
import PropTypes from 'prop-types';
import { SwitchTransition, CSSTransition } from 'react-transition-group'; // ES6
import "./style.scss";

function Tabs({ active, options, className, handleTabChange }) {
    return (
        <div className={`rnd-tabs ${className}`}>
            <div className='rnd-tab-options'>
                {options.map((item, indx) => <div className={`rnd-tab-name ${active === indx ? 'rnd-tab-name-active' : ''}`} key={JSON.stringify(item)} onClick={() => handleTabChange(indx)} >{item.tabName}{active === indx && <span></span>}</div>)}
            </div>

            <SwitchTransition>
                <CSSTransition
                    key={options[active].tabName.toLowerCase()}
                    addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                    classNames='rnd-fade'
                >
                    <div className='rnd-tab-body'>
                        {options[active].content}
                    </div>
                </CSSTransition>
            </SwitchTransition>


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