import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useRef } from 'react';
import ReactDOM from 'react-dom/client';

import CodeCell from './components/code-cell';

//Simple Code Display Example for learning ESBUILDwasm in browser
const App = () => {
  const serviceRef = useRef();
  return (
    <div>
      <CodeCell serviceRef={serviceRef} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
