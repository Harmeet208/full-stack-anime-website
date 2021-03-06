import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Details from './Components/Details';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home/:username" component={Home} />
          <Route exact path="/details/:id/:username" component={Details} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
