import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={<div>Welcome to WinWin</div>} exact={true} />
        <Route path="/studentform" component={<div>student form</div>} />
        <Route path="/matches/:id" component={<div>Matches</div>} />
        <Route component={} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
