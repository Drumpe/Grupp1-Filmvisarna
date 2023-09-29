// Only import your sass in App (not every component)
import "./sass/main.scss";

// Import some Bootstrap components
import StartView from './views/StartView';
import AboutView from './views/AboutView';
import AccountView  from "./views/AccountView";
import CancelView from "./views/CancelView";
import ConfirmedView from './views/ConfirmedView';
import LoginView from "./views/LoginView"
import MovieView from './views/MovieView'
import RegisterView from "./views/RegisterView";
import TheaterView from "./views/TheaterView";
import ViewHolder from "./ViewHolder";
import { Routes, Route} from "react-router-dom";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ViewHolder />} >
        <Route index element={<StartView />} />

        <Route path="/AboutView" element={<AboutView />} />
        <Route path="/AccountView" element={<AccountView />} />
        <Route path="/CancelView" element={<CancelView />} />
        <Route path="/ConfirmedView" element={<ConfirmedView />} />  
        <Route path="/LoginView" element={<LoginView />} />
        <Route path="/MovieView" element={<MovieView />} />
        <Route path="/RegisterView" element={<RegisterView />} />
        <Route path="/TheaterView" element={<TheaterView />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<StartView />} />
      </Route>
    </Routes>
  );
}