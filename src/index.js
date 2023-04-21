import Login from "./pages/login";
import SignUp from "./pages/signup";
import ErrorPage from "./pages/error";
import ProfilePage from "./pages/profile";
import EditProfilePage from "./pages/editProfile";
import EditPasswordPage from "./pages/editPassword";
import HomePage from "./pages/home";

// --> Test Pages <-- //
const errorPage = ErrorPage({
  code: 404,
  message: "OOPS...",
});
const loginPage = Login();
const signUpPage = SignUp();
const profilePage = ProfilePage();
const editProfilePage = EditProfilePage();
const editPasswordPage = EditPasswordPage();
const homePage = HomePage();

document.getElementById("root").innerHTML = homePage;
