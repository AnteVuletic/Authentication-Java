import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

const AppLayoutScene = ({ children, screenOnly }) => {
  const currentRoute = window.location.href;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);
  
  return (
    <div>
      {!screenOnly && children}
    </div>
  )
};

const AppLayout = () => {
  return (
    <Switch>
      <Route exact path="/">
        <AppLayoutScene>
          <span> Test</span>
        </AppLayoutScene>
      </Route>
    </Switch>
  )
};

export default AppLayout;