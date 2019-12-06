import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
    ipPathTracingPaper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100px',
        padding: theme.spacing(2),
        border: '1px solid #ddd'
    },
})