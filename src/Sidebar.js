import React from 'react';
import { NavLink ,Link} from 'react-router-dom';
import AppContext from './AppContext';
import './Sidebar.css';
import FolderError from './FolderError';





export default function Sidebar() {
   return <AppContext.Consumer>{
        value => (
            <div>
                <FolderError>
                <ul>

                    {value.folders.map(folder => <div className='navSidebar' key={folder.id} ><ul><li >
                        <NavLink to={'/folder/' + folder.id} className='highlightFolder' >{folder.name}</NavLink>
                    </li></ul>
                    </div>

                    )}
                    <button className='addFolderButton'><Link to='/addfolder'>
                        + Add Folder
                    </Link></button>
                </ul>
                </FolderError>
            </div>

        )}
    </AppContext.Consumer>



}