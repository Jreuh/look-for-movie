import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameList from "./screens/GameList";
import GameDetails from "./screens/GameDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/games/:id" element={<GameDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
