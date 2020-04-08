import React from 'react';

import './Index.css';
import { ChangeTheme, BlackTheme, WhiteTheme } from '../../../Utils/Util';
import { useStateUser } from '../../Hooks/HK-user';

function Index(props){
    const [userData, dispatch] = useStateUser();

    function CallNotification(){
        let NotificationSchema = {
            titulo: "This is a title",
            descripcion: "This is a descripcion of the notification"
        }

        dispatch({
            type:"NOTIFICATION",
            newNotifications: NotificationSchema
        })
    }

    return (
        <div className="index-wrapper">
            <h1>This is a template</h1>
            <div className="row-text">
                <button onClick={() => ChangeTheme(BlackTheme)}>Black Theme</button>
                <button onClick={() => ChangeTheme(WhiteTheme)}>White Theme</button>

            </div>
            <br/>
            <p>This button Trigger a notification</p>
            <button onClick={CallNotification} >Notificación</button>

            <h3>How it work?</h3>
            <p>
                You first need use the globalState useStateUser 
                and you will comunicate with dispatch, like REDUX
            </p>
            <blockquote>
                dispatch({ 
                    `
                    {  
                        type:"Here name of Action,
                        action:"Here parameters of Action"
                    }
                    `
                })
            </blockquote>

            <p>
                Notifications have stored in global storage to make comunication
                and it is used liek this:
                
            </p>
            <blockquote>
                    dispatch({
                        `
                        {
                            type:"NOTIFICATION",
                            newNotifications: {
                                titulo: "This is a title",
                                descripcion: "This is a descripcion of the notification"
                            }
                        }
                        `
                    })
            </blockquote>
        </div>
    )
}

export default Index;