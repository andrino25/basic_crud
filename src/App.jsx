import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Read from './Read';
import Update from './Update';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:userId" element={<Read />} />
        <Route path="/update/:userId" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
