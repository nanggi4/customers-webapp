/* global CryptoJS, logger, clsx  */
import { withStyles } from '@material-ui/core/styles';
import AuthComponents from './AuthComponents';
import './styles-amplify-default.css';
import './styles.css';
//==============================================================
const AuthContainer = (props) => {
  //==============================================================
  return (
    <div ref={props.refOutWrap}>
      <props.Authenticator
        className={clsx(props.classes.authComponents)}
        components={AuthComponents}
        loginMechanisms={['email']}
        signUpAttributes={['name']}
      >
        {({ signOut, user }) => (
          <React.Fragment>
            {props.children}
          </React.Fragment>
        )}
      </props.Authenticator>
    </div>
  );
};
//==============================================================
const styles = theme => ({
  disabled: {},
  selected: {},
  authComponents: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: '#fff',
    marginTop: -65
  },
  mainContainer: {
    width: 'auto',
    display: 'block',
    margin: 0,
    padding: theme.spacing(1),
    marginTop: theme.spacing(parseInt(process.env.THEME_HEIGHT_TOPBAR,10)),
    position: 'relative',
  },
  mainVersion: {
    position: 'absolute',
    top: 8,
    right: 10,
    fontSize: '0.8rem'
  },
});
//==============================================================
export default withStyles(styles,{withTheme:true})(AuthContainer);
