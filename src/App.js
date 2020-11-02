import './App.css';
import SampleForm from './components/SampleForm'
import Sampler from './containers/Sampler'

function App() {
  return (
    <div>
      <div className="black white-text center card" id="app-title">
        <div className="rainbow">
        <div className="rainbow"><h1>Sampler</h1></div>
        </div>
      </div>
     <Sampler/>
     <SampleForm/>
    </div>
  );
}

export default App;
