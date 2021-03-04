import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import MainPage from './MainPage';
import GoBack from './GoBack';
import NoteDetail from './NoteDetail';
import './App.css';
import AppContext from './AppContext';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import config from './config';




class App extends Component {
  state = {
    
    notes: [],
    folders:[]

  }
  componentDidMount(){
    this.getData()
  }


getData =()=> {
  Promise.all([
  fetch(`${config.API_ENDPOINT}/folders`),
  fetch(`${config.API_ENDPOINT}/notes`)
  ])
  

    .then(([folderRes, notesRes ]) => {
      if(!folderRes.ok) 
        return folderRes.json().then(e => Promise.reject(e));

        if(!notesRes.ok) 
          return notesRes.json().then(e => Promise.reject(e));

        return Promise.all([folderRes.json(), notesRes.json()]);
      })

    .then(([folders, notes]) => {
      this.setState({folders, notes});
       
      })
      .catch(error=> {
        console.error(error);
      })
    
    }

    handleDeleteNote = noteId =>{
        this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
        })
    }

  render() {
    const contextValue= {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      getData: this.getData
    }


    return (
      <AppContext.Provider  value = {contextValue} >
       
      <div className='App'>
        <div className='App-header'>

          <header>
            <h1><Link to='/'>Noteful</Link></h1>
          </header>
        </div>

        <div className='Sidebar'>
          <Route
            exact path='/'
            component={Sidebar} />

          <Route
            path='/folder/:folderId'
            component={Sidebar}
         />

          <Route
            path='/note/:noteId'
            component={GoBack}
            />

            <Route 
              path='/addfolder'
              component={AddFolder} />


            <Route
            path='/addnote'
            component={GoBack}
            />

              

        </div>

        <div className='MainPage'>
          <main>

            <Route
              exact path='/'
              component={MainPage}
              />
              
            <Route
              path='/folder/:folderId'
              component={MainPage}
              />

              

            <Route
              path='/note/:noteId'
              component={NoteDetail}
              />
            
            <Route
              path='/addnote'
              component={AddNote}
              />
              
          </main>
        </div>
      </div>
      </AppContext.Provider>

    )
  }

}
export default App;
