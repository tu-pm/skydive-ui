import * as React from "react"
import { Paper, Typography, Button, Grid, TextField, CircularProgress } from "@material-ui/core"
import { styles } from './IpPathTracingStyles'
import { withStyles } from '@material-ui/core/styles'

interface Props {
    tracePath: (srcIP: string, destIP: string) => void
    clearPath: () => void
    classes: any
}

interface State {
    srcIP: string
    destIP: string
    loading: boolean
}

class IpPathTracing extends React.Component<Props, State> {
    state: State

    constructor(props) {
        super(props)
        this.state = {
            srcIP: "",
            destIP: "",
            loading: false,
        }
    }

    handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    handleSearch = () => {
        this.setState({ loading: true })
        var wait = async () => {
            await this.props.tracePath(this.state.srcIP, this.state.destIP)
            this.setState({ loading: false })
        }
        wait()
    }

    handleClear = () => {
        this.props.clearPath()
        this.setState({
            srcIP: "",
            destIP: "",
        })
    }

    submit = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch()
            e.preventDefault()
        }
    }

    render() {
        const { classes } = this.props

        return (
            <Paper className={classes.ipPathTracingPaper}>
                <Typography component="h6" gutterBottom>
                    Lookup Path
                  </Typography>
                <TextField
                    label="Source IP"
                    name="srcIP"
                    margin="dense"
                    variant="outlined"
                    value={this.state.srcIP}
                    onChange={this.handleChange}
                    onKeyPress={this.submit}
                />
                <TextField
                    label="Destination IP"
                    name="destIP"
                    margin="dense"
                    variant="outlined"
                    value={this.state.destIP}
                    onChange={this.handleChange}
                    onKeyPress={this.submit}
                />
                <Grid container className={classes.formButton} direction="row" justify="flex-end" spacing={2}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.handleSearch} disabled={this.state.loading}>
                            Find
                        </Button>
                        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.handleClear} disabled={this.state.loading}>
                            Clear
                        </Button>
                    </Grid>
                </Grid>

            </Paper>
        )
    }
}

export default withStyles(styles)(IpPathTracing)