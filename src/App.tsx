import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './page/bookList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
