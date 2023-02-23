/* global logger */
import React, { useEffect, useRef } from 'react';
import { Switch, Route, withRouter, useParams, useLocation } from 'react-router-dom';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { useObserver } from 'mobx-react';
import QueryString from 'query-string';
import UserconsoleTheme from './Theme.js';
import useStore from '../lib/useStore';
import ContentContainer from './ContentContainer';
import AmplifyConfig from '../aws-exports';
import AuthContainer from './Auth/AuthContainer';
import packageJson from '/package.json';
//==============================================================
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { Auth } from 'aws-amplify';
Auth.configure(AmplifyConfig);
//==============================================================
// logger.debug(`${process.env.NODE_ENV} logbase !`);
// logger.debug(`UserconsoleApplication::Loaded`);
//==============================================================
const UserconsoleApplication = (props) => {
  const { paramStore, uiStore, accountStore } = useStore();
  const refOutWrap = useRef();
  //==============================================================
  useEffect(() => {
    // componentWillunmount
    return () => {};
  }, []);
  //==============================================================
  const RouteBlock = () => {
    paramStore.setStoreValue('location', useLocation());
    paramStore.setStoreValue('queryParams', useParams());
    paramStore.setStoreValue('queryString', QueryString.parse(paramStore.location.search));
    uiStore.setStoreValue('topAccountMenuOpen', false);
    accountStore.getCurrentAccountInfo();
    return (
      <ContentContainer useStore={useStore} />
    );
  };
  //==============================================================
  return useObserver(() => (
    <React.Fragment>
      <MuiThemeProvider theme={UserconsoleTheme}>
        <Authenticator.Provider>
          <AuthContainer
            refOutWrap={refOutWrap}
            packageVersion={packageJson.version}
            Authenticator={Authenticator}
            useAuthenticator={useAuthenticator}
          >
            <Switch>
              <Route path='/:servicePath' component={withRouter(RouteBlock)}></Route>
              <Route path='/' component={withRouter(RouteBlock)}></Route>
            </Switch>
          </AuthContainer>
        </Authenticator.Provider>
      </MuiThemeProvider>
    </React.Fragment>
  ));
};
//==============================================================
const styles = theme => ({});
//==============================================================
export default withStyles(styles, { withTheme: true })(UserconsoleApplication);