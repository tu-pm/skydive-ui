import * as React from "react"
import { Paper, Typography, Button, Grid, TextField } from "@material-ui/core"
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
}

class IpPathTracing extends React.Component<Props, State> {
    state: State

    constructor(props) {
        super(props)
        this.state = {
            srcIP: "",
            destIP: "",
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
        this.props.tracePath(this.state.srcIP, this.state.destIP)
    }

    handleClear = () => {
        this.props.clearPath()
        this.setState({
            srcIP: "",
            destIP: "",
        })
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
                />
                <TextField
                    label="Destination IP"
                    name="destIP"
                    margin="dense"
                    variant="outlined"
                    value={this.state.destIP}
                    onChange={this.handleChange}
                />
                <Grid container className={classes.formButton} direction="row" justify="flex-end" spacing={2}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.handleSearch}>
                            Find
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.handleClear}>
                            Clear
                        </Button>
                    </Grid>
                </Grid>

            </Paper>
        )
    }
}

export default withStyles(styles)(IpPathTracing)