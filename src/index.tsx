import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './state';
import CellList from './components/cell-list';

//Simple Code Display Example for learning ESBUILDwasm in browser
const App = () => {
  const serviceRef = useRef();
  return (
    <Provider store={store}>
      <div>
        <CellList serviceRef={serviceRef} />
      </div>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

//Test App for NoteBook
/*
import ReactDOM from 'react-dom/client';
import React from 'react'

import 'bulma/css/bulma.css'

const App = () => {
  return (
    <div>
      <h1>Hello world!</h1>
      <li>List Item #1</li>
      <li>List Item #2</li>
      <li>List Item #3</li>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
*/
