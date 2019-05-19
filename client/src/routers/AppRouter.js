import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IntakeFormPage from '../components/IntakeFormPage';
import HomePage from '../components/HomePage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/intakeform" component={IntakeFormPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
