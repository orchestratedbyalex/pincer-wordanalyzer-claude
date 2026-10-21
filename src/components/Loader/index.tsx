import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      minHeight: 'min(320px, 60vh)',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'var(--color-ink)',
    },
  }),
);

export default function AppLoader() {
  const classes = useStyles();

  return (
    <div className={classes.root} role="status" aria-label="Loading WordAnalyzer">
      <CircularProgress color="inherit" size={32} thickness={2} />
    </div>
  );
}
