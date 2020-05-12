import * as React from "react"
import { Paper, Typography, Button, Grid, TextField, CircularProgress, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from "@material-ui/core"
import { styles } from './IpPathTracingStyles'
import { withStyles } from '@material-ui/core/styles'

interface Props {
    tracePath: (srcIP: string, destIP: string) => Promise<boolean>
    clearPath: () => void
    classes: any
}

interface State {
    srcIP: string
    destIP: string
    dialogOpen: boolean
    loading: boolean
}

class IpPathTracing extends React.Component<Props, State> {
    state: State

    constructor(props) {
        super(props)
        this.state = {
            srcIP: "",
            destIP: "",
            dialogOpen: false,
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
        this.props.tracePath(this.state.srcIP, this.state.destIP)
            .then(success => {
                this.setState({ loading: false })
                if (!success) {
                    this.setState({dialogOpen: true})
                }
            })
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

    closeDialog = () => {
        this.setState({dialogOpen: false})
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
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
                    <Dialog
                    open={this.state.dialogOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    >
                    <DialogTitle>Alert</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        No path found.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.closeDialog} color="primary">
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            
        )
    }
}

export default withStyles(styles)(IpPathTracing)