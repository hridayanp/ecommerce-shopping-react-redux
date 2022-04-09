import { Home } from './routes/home/home';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './routes/navigation/navigation';
import { Signin } from './routes/signin/signin';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    </Routes>

  )
}

export default App;
