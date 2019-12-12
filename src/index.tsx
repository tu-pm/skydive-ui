/*
 * Copyright (C) 2019 Sylvain Afchain
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import { SnackbarProvider } from 'notistack'
import '@fortawesome/fontawesome-free/css/all.css'
import { Provider, connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import { AppState, store } from './Store'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import App from './App'
import Tools from './Tools'
import AdminPage from './AdminPage'

// expose some tools
declare global {
  interface Window { Tools: any }
}
window.Tools = Tools

const history = createBrowserHistory()

export const mapStateToProps = (state: AppState) => ({
  session: state.session
})

export const mapDispatchToProps = ({
})

const TopoRoute = connect(mapStateToProps, mapDispatchToProps)(({ component, session, ...props }: any) => {
  const routeComponent = (props: any) => {
    return session.token
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  }
  return <Route {...props} render={routeComponent} />
})

const AdminRoute = connect(mapStateToProps, mapDispatchToProps)(({ component, session, ...props }: any) => {
  const routeComponent = (props: any) => {
    return session.token
      ? (session.permissions.includes("admin")
        ? React.createElement(component, props)
        : <Redirect to={{ pathname: '/' }} />)
      : <Redirect to={{ pathname: '/login' }} />
  }
  return <Route {...props} render={routeComponent} />
})

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
      <Router history={history}>
        <Switch>
          <TopoRoute path="/" component={App} exact />
          <AdminRoute path="/admin" component={AdminPage} />
          <Route path="/login" component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>,
    </SnackbarProvider>
  </Provider>,
  document.getElementById('index')
)