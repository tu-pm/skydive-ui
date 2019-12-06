import * as React from "react"
import { Paper, Typography, Input, Button } from "@material-ui/core"
import { styles } from './IpPathTracingStyles'
import { withStyles } from '@material-ui/core/styles'

interface Props {
    tracePath: (srcIP: string, destIP: string) => void
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

    handleSubmit = (e) => {
        this.props.tracePath(this.state.srcIP, this.state.destIP)
    }

    render() {
        const { classes } = this.props

        return (
            <Paper className={classes.ipPathTracingPaper}>
                <Typography component="h6" color="primary" gutterBottom>
                    Lookup Path
                  </Typography>
                <Input
                    required
                    name="srcIP"
                    placeholder="Source IP"
                    // margin="dense"
                    value={this.state.srcIP}
                    onChange={this.handleChange}
                />
                <Input
                    required
                    name="destIP"
                    placeholder="Dest IP"
                    // margin="dense"
                    value={this.state.destIP}
                    onChange={this.handleChange}
                />
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                    Find
                </Button>
            </Paper>
        )
    }
}

export default withStyles(styles)(IpPathTracing)