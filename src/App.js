import './App.css';
import SampleForm from './components/SampleForm'
import Sampler from './containers/Sampler'

function App() {
  return (
    <div>
      <div>
        <div className="black rainbow white-text center card" id="app-title">
            <h1>Sampler</h1>
        </div>
      </div>
        <div>
          <Sampler/>
        </div>
        <div style={{display: "float", marginLeft:"0", padding:"0"}}>
          <SampleForm/>
        </div>
    </div>
  );
}

export default App;
