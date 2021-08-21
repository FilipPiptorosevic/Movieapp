import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../authentication/auth";
import Login from "./RegisterLogin/index";
import Register from "./RegisterLogin/register";
import HomePage from "./homepage/homepage";
import MovieDetail from "./MovieDetail/MovieDetail";
import FavoritePage from "./FavoritePage/FavoritePage";
import NavBar from "./Navbar/navbar";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
    <div>
      <Switch>
        <Route exact path = "/" component = {Auth(HomePage, null)} />
        <Route exact path ="/login" component = {Auth(Login, false)} />
        <Route exact path ="/register" component = {Auth(Register, false)} />
        <Route exact path = "/movie/:movieID" component = {Auth(MovieDetail, null)} />
        <Route exact path = "/favorite" component = {Auth(FavoritePage, null)} />
      </Switch>
    </div>
    </Suspense>
  );
}

export default App;
