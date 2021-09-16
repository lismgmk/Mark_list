import React from 'react';
import {Switch, Route} from "react-router-dom";
import Main from "./v1-Main/Main";


function App() {
    return (
        <>

            <Switch>
                <Route exact path={"/"} render={() => <Main/>}/>
                <Route exact path={"/main"} render={() => <Main/>}/>
                <Route path={"*"} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
            </Switch>
        </>
    )
}

export default App

export const PATH = {
    PET: '/',
    PET_MAIN: '/My-pet-progect/main',
    PET_LOGIN: '/My-pet-progect/login',
    PET_REISTRATION: '/My-pet-progect/registration',
    PET_PROFILE: '/My-pet-progect/profile',
    PET_PAGE404: '/My-pet-progect/page404',
    PET_REBILD_PASSWORD: '/My-pet-progect/rebild-password',
    PET_NEW_PASSWORD: '/My-pet-progect/new-password',
    PET_NULL: '/'
}
