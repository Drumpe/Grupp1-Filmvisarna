// Only import your sass in App (not every component)
import "./sass/main.scss";

// Import some Bootstrap components
import StartView from './views/StartView';
import ConfirmedView from './views/ConfirmedView';
import MovieView from './views/MovieView'
import AboutView from './views/AboutView';
import { Routes, Route} from "react-router-dom";
import ViewHolder from "./ViewHolder";
import AccountView  from "./views/AccountView";
import TheaterView from "./views/TheaterView";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ViewHolder />} >
        <Route index element={<StartView />} />
        <Route path="/ConfirmedView" element={<ConfirmedView />} />
        <Route path="/AboutView" element={<AboutView />} />
        <Route path="/MovieView" element={<MovieView />} />
        <Route path="/AccountView" element={<AccountView />} />
        <Route path="/TheaterView" element={<TheaterView />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<StartView />} />
      </Route>
    </Routes>
  );
}