import PAGE_URL from "constants/page-urls";
import { MessengerPage } from "pages/Messenger";
import AuthController from "services/controllers/auth-controller";
import Router from "services/router";

import { EditPasswordPage } from "./pages/EditPassword";
import { EditProfilePage } from "./pages/EditProfile";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
// import { MessengerPage } from "./pages/Messenger";
import { ProfilePage } from "./pages/Profile";
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
// const profilePage = new ProfilePage();
// const editProfilePage = new EditProfilePage();
// const editPasswordPage = new EditPasswordPage();
// const messengerPage = new MessengerPage();

const routePaths = [
  {
    path: PAGE_URL.INDEX,
    page: MessengerPage,
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
    page: ProfilePage,
  },
  {
    path: PAGE_URL.EDIT_PASSWORD,
    page: EditPasswordPage,
  },
  {
    path: PAGE_URL.EDIT_PROFILE,
    page: EditProfilePage,
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

window.addEventListener("DOMContentLoaded", async () => {
  routePaths.forEach(({ path, page }) => {
    Router.use(path, page);
  });

  if (!routePaths.some(({ path }) => path === window.location.pathname)) {
    Router.go(PAGE_URL.NOT_FOUND);
  }

  let isProtectedRoute = true;
  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case PAGE_URL.LOGIN:
    case PAGE_URL.SIGN_UP:
      isProtectedRoute = false;
      break;
  }

  Router.start();

  try {
    await AuthController.fetchUser();

    if (!isProtectedRoute) {
      Router.go(PAGE_URL.INDEX);
    }

  } catch (e) {
    if (isProtectedRoute) {
      Router.go(PAGE_URL.LOGIN);
    }
  }
});

(window as any).router = ({ event, path }: { event: any; path: string }) => {
  event?.preventDefault();
  Router.go(path);
};

(window as any).Router = Router;
