import React from 'react';
import './App.css';
import PropTypes from 'prop-types';


export default function GoBack(props) {
    return (
        <div >
            <button className='goBackButton' onClick={e => props.history.goBack()}>
            Go Back
            </button>
            <p>{props.name} </p>
        </div>

    )
}

GoBack.propTypes={
history: PropTypes.any
}