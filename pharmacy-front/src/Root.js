import React from 'react';
import { MemoryRouter, BrowserRouter, HashRouter } from 'react-router-dom'
import './Root.css'

import Navigation from './client/components/navigation/Navigation';
import Route from './client/components/navigation/Route'
import Footer from './client/components/unitComp/footer/Footer'


// REDUX
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import RootReducer from './client/components/reducers/RootReducer'
import {fetchUser} from './client/components/action/AuthActions'


const store =createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk)))

if(sessionStorage.number){
  store.dispatch(fetchUser({phoneNumber:sessionStorage.number}))
}



export default () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
              <div className="root">
                
                <Navigation />
                <div className="content">
                <Route />
                </div>
                <Footer />
              </div>
        </BrowserRouter>
    </Provider>
  );
}

