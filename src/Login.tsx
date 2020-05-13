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

import * as React from "react"
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { withRouter } from 'react-router-dom'

import { AppState, openSession, session } from './Store'
import { styles } from './LoginStyles'
import { Configuration } from './api/configuration'
import { LoginApi } from './api'
import image from '../assets/bg7.jpg'
import { Grid, Paper } from "@material-ui/core"
import { stringify } from "query-string"

import Logo from '../assets/Logo-large.png'
import { fetchProxy } from "./Tools"

interface Props {
    classes: any
    openSession: typeof openSession
    history: any
    location: any
    session: session
}

interface State {
    endpoint: string
    username: string
    password: string
    submitted: boolean
    failure: boolean
    persistent: boolean
}

class Login extends React.Component<Props, State> {

    state: State

    constructor(props) {
        super(props)

        this.state = {
            endpoint: "",
            username: "",
            password: "",
            submitted: false,
            failure: false,
            persistent: false
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
            case "username":
                this.setState({ username: value })
                break
            case "password":
                this.setState({ password: value })
                break
            case "persistent":
                this.setState({ persistent: Boolean(value) })
                break
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true })

        if (!this.state.username || !this.state.password) {
            return
        }

        var qs = stringify({
            username: this.state.username,
            password: this.state.password
        })
        fetchProxy(`/login?${qs}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                this.setState({ failure: false })

                // Open a new session
                this.props.openSession(
                    this.props.session.endpoint,
                    this.state.username,
                    "",
                    "",
                    this.state.persistent
                )

                // Redirect to previous route
                var from = "/"
                if (this.props.location.state && this.props.location.state.from !== "/login") {
                    from = this.props.location.state.from
                }
                this.props.history.push(from)
            } else {
                throw new Error(response.statusText)
            }
        })
        .catch(err => {
            console.log(err)
            this.setState({ failure: true })
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <Grid container justify="center">
                        <Grid item xs={10} sm={8} md={4}>
                            <Paper className={classes.paper}>
                                <img src={Logo} alt="logo" className={classes.logoImg} />
                                <Typography className={classes.logoTitle} variant="h4" align="center">
                                    Skydive Webui
                                </Typography>
                                {this.state.failure &&
                                    <React.Fragment>
                                        <div className={classes.failure}>Login failed: username or password is incorrect.</div>
                                    </React.Fragment>
                                }
                                <form noValidate onSubmit={this.handleSubmit.bind(this)}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                        value={this.state.username}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    {this.state.submitted && !this.state.username &&
                                        <div className={classes.error}>Username is required</div>
                                    }
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={this.state.password}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    {this.state.submitted && !this.state.password &&
                                        <div className={classes.error}>Password is required</div>
                                    }
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                        name="persistent"
                                        value={true}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >Sign In</Button>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div >
        )
    }
}

export const mapStateToProps = (state: AppState) => ({
    session: state.session
})

export const mapDispatchToProps = ({
    openSession
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Login)))
