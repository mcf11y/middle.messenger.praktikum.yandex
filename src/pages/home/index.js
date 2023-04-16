import Login from '../login';
import SignUp from '../signup';

const Home = () => {
  const isLogin = false;

  if (!isLogin) {
    return SignUp();
  }

  return null;
}

export default Home;
