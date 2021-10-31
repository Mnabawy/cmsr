import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <Router>
      <div className="App">
        <main role="main" className="container">
          <NavBar />
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies"  component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Movies} />
            <Redirect to="/not-found" />
            
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
