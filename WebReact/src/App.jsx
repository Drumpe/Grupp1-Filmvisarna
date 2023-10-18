import { Outlet } from 'react-router-dom';
// imports common components here
import MainMenu from './components/MainMenu';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import { get } from './utilsAndHooks/rest';

export default function App() {
  // global state
  const [globals, setGlobals] = useState({
    movies: [],
    user: []
  });

  /// this is where we will fetch all globals
  /// our rest utility (./utilsAndHooks/rest) is providing the fetch functions  
  /// '/api' in rest utility will translate into our api through proxy in vite.config.js
  useEffect(() => {
    (async () => {
      setGlobals({
        ...globals,
        movies: await get('movies/detailed'),
        user: await get('sessions/getuserrole')
      });
    })();
  }, []);

  async function setUser() {
    await setGlobals({
      ...globals,
      movies: globals.movies,
      user: await get('sessions/getuserrole')
    });
  }


  // this is: ViewHolder translated into new return
  return <>
    <header>
      <MainMenu  {...{ user: globals.user, setUser}} />
    </header>
    <main className="container mt-1">
      <Outlet context={[globals, setUser]} />
    </main>
    <footer className="container-fluid">
      <Footer />
    </footer>
  </>;
}