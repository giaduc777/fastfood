import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import MenuBackground from './components/MenuBackground/MenuBackground';
import './main.scss';

const store = createStore(reducer)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <MenuBackground />
       </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
