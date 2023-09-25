// Only import your sass in App (not every component)
import "./sass/main.scss";

// Import some Bootstrap components
import OmView from './views/OmView';
import StartView from './views/StartView';
import TestView from './views/TestView';
import { Routes, Route} from "react-router-dom";
import ViewHolder from "./ViewHolder";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ViewHolder />} >
        <Route index element={<StartView />} />
        <Route path="/om" element={<OmView />} />
        <Route path="/test" element={<TestView />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<StartView />} />
      </Route>
    </Routes>
  );
}