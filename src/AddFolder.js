import React,{useContext} from 'react';
import AppContext from './AppContext';
import PropTypes from 'prop-types';



export default function AddFolder(props) {
    const context=useContext(AppContext)
    const onAddFolder=(event) => {
        event.preventDefault();
    const name=event.target.name.value
    const folder={name}
    
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(folder)
        })
        .then(response => {
           context.getData()
           props.history.push('/')
        })
        .catch(error => {
            console.error(error)
        })
        
    }

    return (
        <form onSubmit={onAddFolder}>
            <label for='name'>

            </label>
            <input name='name' placeholder='Folder Name' required/>
            <button>Add Folder</button>
        </form>
    )
}

AddFolder.propTypes={
    name: PropTypes.string.isRequired,
    match: PropTypes.any,
    history: PropTypes.any
}
