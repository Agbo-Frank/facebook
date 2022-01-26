import { Routes, Route } from 'react-router-dom'
import Login from './components/pages/Login/Login'
import Home from './components/pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />}  />
      </Routes>
    </div>
  );
}

export default App;
