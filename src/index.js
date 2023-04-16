import ErrorPage from "./pages/error";
import Button from "./components/button";
import Input from "./components/input";
import Field from "./components/field";
import Login from "./pages/login"
import SignUp from "./pages/signup"
import Home from "./pages/home";

/* -------------------------------- TESTS -------------------------------- */
/* const error404 = ErrorPage({
  code: 404,
  message: "Не туда попали",
});
const error500 = ErrorPage({
  code: 500,
  message: "Мы уже фиксим",
});
const input = Input({
  id: 'login-input',
  type: "password",
  id: "login-input",
  placeholder: "Введите свой логин",
});
const button = Button({
  type: "primary",
  text: "Назад к чатам",
});
const field = Field({
  id: 'login',
  type: 'password',
  label: 'login',
  placeholder: 'Введите логин',
  customClasses: 'padding: 20px',
})
const login = Login();
const signUp = SignUp();
const page = SignUp();
*/

const home = Home();
document.getElementById("root").innerHTML = home;
