import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IntakeFormPage from '../components/IntakeFormPage';
import HomePage from '../components/HomePage'
import MatchCard from "../components/MatchCards";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/intakeform" component={IntakeFormPage} />
          <Route path="/matches" component={MatchCard} />

      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
