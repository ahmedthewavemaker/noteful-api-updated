import React, { useContext } from 'react';
import './App.css';
import AppContext from './AppContext';
import PropTypes from 'prop-types';



export default function AddNote(props) {


    const context = useContext(AppContext)
    const onAddNote = (event) => {
        event.preventDefault();
        const name = event.target.name.value
        const content=event.target.content.value
        const folderId=event.target.folderId.value
        const note = { name, content, folderId }

        // const folderz = context.folders.map(folder => <ul ><li >{folder.name}</li></ul>)


        fetch(`http://localhost:8000/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then(response => {
                context.getData()
                props.history.push('/')
            })
            .catch(error => {
                console.error(error)
            })
            
    }

console.log(context.folders)

    return (
        <form onSubmit={onAddNote}>
            <h2 className='headerNoteAdd'>Add Notes</h2>
            <div className='AddNote'>* Required Field</div>
            <div className='noteName'>
                <label  for='name'>Name* :    </label>
                <input name='name' placeholder='Note name' type='text' id='name' required/>
            </div>
            <div className='contentArea'>
                <label  for='content' >Content :  </label>
                <textarea name='content' placeholder='Insert content here'  id='content' />
            </div>
            <div className='folderNameSelect'>

                <p>Folder : <select name='folderId'>
                    {context.folders.map(folder => {
                        return(
                        <option value={folder.id}>{folder.name}</option>
                    )})}
                    

                </select></p>
            </div>





            <button className='submitForm' type='submit' name='addnote'>Add Notes</button>



        </form>
    )
}

AddNote.propTypes={
    name: PropTypes.string.isRequired,
    note: PropTypes.any.isRequired,
    match: PropTypes.any,
    history: PropTypes.any
}