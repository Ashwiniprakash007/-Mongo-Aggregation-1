import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Register } from './components/Login/Register';
import { Login } from './components/Login/Login';
import Posts from './components/Posts/Posts';
import SeePost from './components/Posts/SeePost';
import UpdatePostPage from './components/Posts/UpdatePostPage ';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-posts" element={<Posts />} />
        <Route path="/posts/:id" element={<SeePost />} />
        <Route path="/posts/update/:postId" element={<UpdatePostPage />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;

