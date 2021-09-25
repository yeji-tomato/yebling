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
import Upload from './routes/UploadPage';
import ProductDetail from './routes/ProductDetail';
import UpdatePwd from './routes/UpdatePwd';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Auth(Register, false, null)} />
        <Route exact path="/login" component={Auth(Login, false, null)} />
        <Route exact path="/mypage" component={Auth(Mypage, true, null)}/>
        <Route exact path="/cart" component={Auth(Cart, true, null)} />
        <Route exact path="/upload" component={Auth(Upload, true, true)} />
        <Route exact path="/shop" component={Auth(Shop, null, null)} />
        <Route exact path="/product/:productId" component={Auth(ProductDetail, null, null)} />
        <Route exact path="/about" component={Auth(About, null, null)} />
        <Route exact path="/id" component={Auth(FindId, null, null)} />
        <Route exact path="/pw/:Id" component={Auth(UpdatePwd, null, null)} />
        <Route exact path="/pw" component={Auth(FindPwd, null, null)} />
        <Route exact path="/" component={Auth(Home, null, null)} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
