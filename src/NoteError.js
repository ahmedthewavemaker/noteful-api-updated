
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NoteError extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error){
        console.error(error);
        console.log(error);
    }


    render() {
        if (this.state.hasError) {
            return (
                <h2>Could not display this Note.</h2>
            );
        }
        return this.props.children;

    }
}

NoteError.propTypes={
children: PropTypes.any
}