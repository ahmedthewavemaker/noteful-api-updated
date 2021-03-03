import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import moment from 'moment';
import AppContext from './AppContext';
import PropTypes from 'prop-types';
import NoteError from './NoteError';



export default class MainPage extends React.Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
    static contextType = AppContext;

    handleDeleteNote = (noteId) => {
        
        fetch(`http://localhost:9090/notes/${noteId}`,{
            method: 'DELETE',
             
        }) 
        .then(()=>{
            this.context.getData()
        })
        .catch(error => {
            console.error(error)
        })
        
      }

      
    render(){
        let { notes=[] } = this.context;
        const { folderId } = this.props.match.params
    //console.log(noteId, 'noteId')

    if(folderId){
        notes=notes.filter(note => note.folderId === folderId)
    }
    //console.log(noteId);
    return (
       <div className='Mainpage'>
           <NoteError>
          {notes.map(note => <div><ul><li key={note.id} className='note'>
                <h2><Link to={'/note/'+note.id} >{note.name}</Link></h2>
                <p>Date modified: {moment(note.modified).format('MM YYYY')}</p>
                <button className='noteButton' onClick={e=>this.handleDeleteNote(note.id)}>Remove Note</button>
               
           </li></ul> </div>)}
           <button className='noteAddButton'><Link to='/addnote'>Add Notes</Link></button>
           </NoteError>
       </div>
       
    )}

}

MainPage.propTypes={
    match: PropTypes.any
}