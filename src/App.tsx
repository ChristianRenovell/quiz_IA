import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Summary from './pages/Summary';
import SnackbarComponent from './components/snackbar/Snackbar';

function App() {
  return (
    <BrowserRouter>
      <SnackbarComponent />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
