import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import "./style.scss"

function Button({ onClick, children, type, className, rounded}) {
    let [classNames,setClassNames] = useState(`rnd-btn `);

    const setClassNamesBasedOnType =()=>{
        switch (type) {
            case 'primary':
                setClassNames(`${classNames} rnd-btn-primary`);
                break;
            case 'danger':
                setClassNames(`${classNames} rnd-btn-danger`);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setClassNamesBasedOnType()
    }, [type])
    
    return (
        <button className={`${classNames} ${className} ${rounded?'rnd-btn-rounded':''}`} onClick={onClick}>{children}</button>
    )
}

Button.propTypes ={
 onClick: PropTypes.func,
 children: PropTypes.node.isRequired,
 type: PropTypes.string.isRequired,
 classNames: PropTypes.string,
 rounded: PropTypes.bool
}

Button.defaultProps = {
    type:"primary",
    className:'',
    rounded: false,
}

export default Button;