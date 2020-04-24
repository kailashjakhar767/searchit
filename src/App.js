import React,{Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader  from './components/Loader';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
function App() {
  return (
    <ErrorBoundary>
      <Switch>
        <Suspense fallback={<Loader/>}>
          <Route path="/" component={Home} />
        </Suspense>
        </Switch>
    </ErrorBoundary>
  );
}

export default App;
