import { Route, Switch } from "react-router-dom";
import Login from "./RegisterLogin/index";
import Register from "./RegisterLogin/register";
import HomePage from "./homepage/homepage";
import MovieDetail from "./MovieDetail/MovieDetail";

function App() {
  return (
    <div>
      <Switch>
        <Route path ="/login" component = {Login} />
        <Route path ="/register" component = {Register} />
        <Route path = "/movie/:movieID" component = {MovieDetail} />
        <Route path = "/" component = {HomePage} />
      </Switch>
    </div>
  );
}

export default App;
