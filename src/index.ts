import Router from "router";
import PAGE_URL from "constants/pageUrls";
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
    path: PAGE_URL.INDEX,
    page: homePage,
  },
  {
    path: PAGE_URL.LOGIN,
    page: loginPage,
  },
  {
    path: PAGE_URL.SIGN_UP,
    page: signUpPage,
  },
  {
    path: PAGE_URL.PROFILE,
    page: profilePage,
  },
  {
    path: PAGE_URL.EDIT_PASSWORD,
    page: editPasswordPage,
  },
  {
    path: PAGE_URL.EDIT_PROFILE,
    page: editProfilePage,
  },
  {
    path: PAGE_URL.NOT_FOUND,
    page: error404,
  },
  {
    path: PAGE_URL.SERVER_ERROR,
    page: error500,
  },
];

window.addEventListener("DOMContentLoaded", () => {
  routesPath.forEach(({ path, page }) => {
    Router.use(path, page);
  });

  Router.start();
  // Router.go(PAGE_URL.INDEX);
});

// const root = document.getElementById("root");

(window as any).router = ({ event, path }: { event: any; path: string }) => {
  event.preventDefault();
  Router.go(path);
};
