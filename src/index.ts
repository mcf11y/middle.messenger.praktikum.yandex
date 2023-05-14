import Router from "router";
import { ROUTES } from "utils/pageRoutes";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ErrorPage from "./pages/error";
import ProfilePage from "./pages/profile";
import EditProfilePage from "./pages/editProfile";
import EditPasswordPage from "./pages/editPassword";
import HomePage from "./pages/home";

const error404 = ErrorPage({
  code: 404,
  message: "Не туда попали",
});
const error500 = ErrorPage({
  code: 500,
  message: "Мы уже фиксим",
});
const loginPage = Login();
const signUpPage = SignUp();
const profilePage = ProfilePage();
const editProfilePage = EditProfilePage();
const editPasswordPage = EditPasswordPage();
const homePage = HomePage();

const routesPath = [
  {
    path: ROUTES.INDEX,
    page: homePage,
  },
  {
    path: ROUTES.LOGIN,
    page: loginPage,
  },
  {
    path: ROUTES.SIGN_UP,
    page: signUpPage,
  },
  {
    path: ROUTES.PROFILE,
    page: profilePage,
  },
  {
    path: ROUTES.EDIT_PASSWORD,
    page: editPasswordPage,
  },
  {
    path: ROUTES.EDIT_PROFILE,
    page: editProfilePage,
  },
  {
    path: ROUTES.NOT_FOUND,
    page: error404,
  },
  {
    path: ROUTES.SERVER_ERROR,
    page: error500,
  },
];

window.addEventListener("DOMContentLoaded", () => {
  routesPath.forEach(({ path, page }) => {
    Router.use(path, page);
  });

  Router.start();
  // Router.go(ROUTES.INDEX);
});

// const root = document.getElementById("root");

(window as any).router = ({ event, path }: { event: any; path: string }) => {
  event.preventDefault();
  Router.go(path);
};
