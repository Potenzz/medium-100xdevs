import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Dummy } from './pages/Dummy';

function App() {
  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/blogs/" element={<Blogs/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/dummy" element={<Dummy/>}/>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
