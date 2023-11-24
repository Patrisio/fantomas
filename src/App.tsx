import './App.css';
import {WebBuilder} from './WebBuilder/WebBuilder';
import {GridProvider} from './app/grid';
import {PositionerProvider} from './app/positioner';
import {OutlineProvider} from './app/outline';
import {ElementProvider} from './app/element';

function App() {
  return (
    <PositionerProvider>
      <GridProvider>
        <ElementProvider>
          <OutlineProvider>
            <WebBuilder />
          </OutlineProvider>
        </ElementProvider>
      </GridProvider>
    </PositionerProvider>
  );
}

export default App;
