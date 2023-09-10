import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Summary from './pages/Summary';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/:error?" element={<Home />} />
          <Route path="/game/:mode?" element={<Game />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
