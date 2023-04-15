import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Report from "./pages/Report";


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Report/>}/>
          </Routes>
      </Router>
  );
}

export default App;
