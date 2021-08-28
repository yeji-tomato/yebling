import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register';
import Shop from './routes/Shop';
import About from './routes/About';
import FindId from './routes/FindId';
import FindPwd from './routes/FindPwd';
import { Auth } from './hoc/auth';
import Mypage from './routes/Mypage';
import Cart from './routes/Cart';
import Upload from './routes/Upload';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/register" component={Auth(Register, false, null)} />
        <Route path="/login" component={Auth(Login, false, null)} />
        <Route path="/mypage" component={Auth(Mypage, true)}/>
        <Route path="/cart" component={Cart} />
        <Route path="/upload" component={Auth(Upload, true, true)} />
        <Route path="/shop" component={Shop} />
        <Route path="/about" component={About} />
        <Route path="/id" component={FindId} />
        <Route path="/pw" component={FindPwd} />
        <Route path="/" exact component={Auth(Home, null, null)} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
