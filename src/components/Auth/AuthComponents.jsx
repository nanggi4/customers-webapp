import { Header } from "./Header";
import { Footer } from "./Footer";
import { SignInHeader } from "./SignInHeader";
import { SignUpFooter } from "./SignUpFooter";
//==============================================================
const AuthComponents = {
  Header,
  SignIn: {
    Header: SignInHeader,
  },
  SignUp: {
    Footer: SignUpFooter,
  },
  Footer
};
//==============================================================
export default AuthComponents;