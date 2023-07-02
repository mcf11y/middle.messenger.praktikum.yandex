import PAGE_URL from "constants/page-urls";
import Router from "services/router";

import EditPasswordPage from "./pages/EditPassword";
import EditProfilePage from "./pages/EditProfile";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import MessengerPage from "./pages/Messenger";
import ProfilePage from "./pages/Profile";
import SignUp from "./pages/Signup";

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
const messengerPage = MessengerPage();

const routesPath = [
  {
    path: PAGE_URL.INDEX,
    page: messengerPage,
  },
  {
    path: PAGE_URL.CHATS,
    page: messengerPage,
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
});

(window as any).router = ({ event, path }: { event: any; path: string }) => {
  event?.preventDefault();
  Router.go(path);
};

(window as any).Router = Router;
