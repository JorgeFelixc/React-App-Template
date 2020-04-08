import React from 'react';
import { useStateUser } from '../Components/Hooks/HK-user';
import { useRoutes } from 'hookrouter';
import Routes from '../Configs/Routes';
import Notificaciones from '../Components/Tools/Notificaciones/Notificaciones';

function Page(props){ 
    const [ userData, dispatch ] = useStateUser();
    const routeResult = useRoutes(Routes);
    return (
        <div>
            {  routeResult  }
            {
                userData.notifications.length > 0 &&
                <Notificaciones notifications={userData.notifications}/>
                
            }
    
        </div>
    );
}
export default Page;