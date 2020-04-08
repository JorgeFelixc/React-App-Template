import React from 'react';
import './App.css';


import { UserProvider } from './Components/Hooks/HK-user';
import Page from './Page-Structure/Page';

function App() {
    const UserInitialState = {
        user: {
            name: 'no-user',
            theme: 'default',
            tipoUsuario: '0',
        },
        notifications: [

        ],

    };

    const userReducer = (state, action) => {
        console.log("Stado", state);
        console.log("Action:", action);
        switch (action.type) {
            case 'LOGIN':
                return {
                    ...state,
                    theme: action.newTheme,
                    name: action.newName,
                    tipoUsuario: action.newTipoUsuario,
                };
            case 'NOTIFICATION':
                let bufferNotf = state.notifications;
                bufferNotf.push(action.newNotifications);
                return{
                    ...state,
                    notifications: bufferNotf,
                };
            case 'CLEAR-NOTIFICATION':
                return{
                    ...state,
                    notifications: []
                }
            default:
                return state;
        }
    };


    return (
        <UserProvider initialState={UserInitialState} reducer={userReducer} >
            <main>
                <Page />
            </main>
        </UserProvider>
    );

}


export default App;
