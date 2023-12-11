import './App.css';
import {WebBuilder} from './WebBuilder/WebBuilder';
import {PositionerProvider} from './app/positioner';
import {OutlineProvider} from './app/outline';

function App() {
  return (
    <PositionerProvider>
      <OutlineProvider>
        <WebBuilder />
      </OutlineProvider>
    </PositionerProvider>
  );
}

export default App;
