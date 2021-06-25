import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

import Users from './containers/Users';
import Feed from './containers/Feed';
import Post from './containers/Post';
import Receipe from './containers/Receipe';

import { createClient, Provider } from 'urql';
const client = createClient({
  url: 'http://localhost:4000',
});

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 1fr;
  padding: 1em;
  max-width: 700px;
  margin: auto;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
`;

const NavItem = styled.div<{ selected?: boolean }>`
  padding: 1em;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#0053a0' : 'inherit')};
  color: ${props => (props.selected ? 'white' : 'inherit')};

  &:hover {
    opacity: 0.8;
  }
`;

interface NavLinkProps {
  children: React.ReactElement | string;
  to: string;
  exact?: boolean;
}

const NavLink = ({ children, to, exact }: NavLinkProps): React.ReactElement => {
  const isExact = useRouteMatch({ path: to })?.isExact;
  const lengthMatches = exact ? isExact : true;
  const history = useHistory();
  const pathname = history?.location?.pathname;
  const selected = pathname.startsWith(to) && lengthMatches;

  return (
    <NavItem selected={selected} onClick={() => history.push(to)}>
      {children}
    </NavItem>
  );
};

function App(): React.ReactElement {
  return (
    <Provider value={client}>
      <Router>
        <Container>
          <NavContainer>
            <NavLink to="/" exact>
              Home
            </NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/post">Post</NavLink>
            <NavLink to="/feed">Feed</NavLink>
            <NavLink to="/receipe">Receipe</NavLink>
          </NavContainer>
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/post">
              <Post />
            </Route>
            <Route path="/feed">
              <Feed />
            </Route>
            <Route path="/receipe">
              <Receipe />
            </Route>
            <Route path="/">
              <div>Welcome Home!</div>
            </Route>
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
