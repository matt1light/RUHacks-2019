import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import IntakeFormPage from '../components/IntakeFormPage';
import HomePage from '../components/HomePage'
import MatchPage from "../components/MatchCards";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={IntakeFormPage} exact={true} />
        <Route path="/intakeform" component={IntakeFormPage} />
        <Route path="/matches" component={MatchPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
