import logo from './logo.svg';
import './Styles/App.css';
import Home from './components/screens/Home';

import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
  	<Router>
	    <div className="app">
	  		<Home />
	    </div>
    </Router>
  );
}

export default App;
