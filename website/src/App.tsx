import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Club from './pages/club/Club';
import Team from './pages/team/Team';
import Members from './pages/members/Members';
import Payments from './pages/payments/Payments';
import model from './dummydata';
import { mostRecentTerm } from './model/Model';
import Container from 'react-bootstrap/Container';
import { getTerms, getModel } from './server';
import { useQuery } from 'react-query';
import SignIn from './pages/SignIn';
import firebase from './firebase';
import { PrivateRoute, ProvideAuth, useAuth } from './auth';

export default function App() {
  const [termId, setTermId] = useState(mostRecentTerm(model).id);
  const auth = useAuth();

  return (
    <ProvideAuth>
      <Router>
        <div>
          <Navbar />

          <Container>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <PrivateRoute path="/club">
                <Club model={model} />
              </PrivateRoute>
              <PrivateRoute path="/team">
                <Team termId={termId} model={model} />
              </PrivateRoute>
              <PrivateRoute path="/members">
                <Members termId={termId} model={model} />
              </PrivateRoute>
              <PrivateRoute path="/payments">
                <Payments termId={termId} model={model} />
              </PrivateRoute>
              <PrivateRoute path="/events">
                <NotYet />
              </PrivateRoute>
              <PrivateRoute path="/dashboards">
                <NotYet />
              </PrivateRoute>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </ProvideAuth>
  );
}

function NotYet() {
  return (
    <div>
      <p>
        Unfortunately, that part of the check-in system is not available yet.
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <p>??? not found lol</p>
    </div>
  );
}

getModel().then(m => {
  console.log(m);
});

function Home() {
  return (
    <div>
      <h2>
        Welcome to the University of Minnesota Ballroom Dance Club Check-In
        System
      </h2>
      <p className="lead">
        Please enjoy your stay and try <em>really hard</em> not to break
        anything.
      </p>
    </div>
  );
}
