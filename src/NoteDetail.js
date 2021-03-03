import React,{useContext} from 'react';
import './NoteDetail.css';
import moment from 'moment';
import AppContext from './AppContext';
import PropTypes from 'prop-types';


export default function NoteDetail(props) {
    const context=useContext(AppContext)
    const note = context.notes.find(note => note.id === props.match.params.noteId)
    return (


        <div className='NoteDetail'>

            <h2>{note.name}</h2>
            <p>Date modified: {moment(note.modified).format('MM YYYY')}</p>
            <p>{note.content}</p>

        </div>


    )
}

NoteDetail.propTypes={
    match: PropTypes.any
}