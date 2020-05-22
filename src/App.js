import React from 'react';
import './App.css';
import LinkList from './components/LinkList'
import Page from './components/Page'
import { Switch, Route, Link } from 'react-router-dom'
import { useQuery } from 'urql'
import gql from 'graphql-tag'

const STATIC_PAGES_QUERY = gql`
{
  allStaticPages {
    _id
    path {
      current
    }
    title
  }
}
`

function App() {
  const [result] = useQuery({ query: STATIC_PAGES_QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <div>Fetching</div>
  if (error) return <div>Error</div>

  const pages = data.allStaticPages;

  return (
    <div className="App">
      <header className="App-header">
        <p data-testid="header">
          <Link to="/">Test jest-puppeteer-nock with urql</Link>
        </p>
      </header>
      <section className="App-body">
        <Switch>
          <Route exact path="/" ><LinkList pages={pages} /></Route>
          <Route path="/page/:staticPage" ><Page pages={pages} /></Route>
        </Switch>
      </section>
    </div>
  );
}

export default App;
