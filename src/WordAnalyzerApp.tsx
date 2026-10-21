// local
import Form from './components/Form';
import theme from './theme';
import { MotionProvider } from './motion/MotionContext';

// redux
import { Provider } from 'react-redux';
import configureStore from './redux/store';

// ui
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

// Styles
import './WordAnalyzerApp.css';

function WordAnalyzerApp() {
  return (
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <MotionProvider>
          <CssBaseline />
          <div className='AppWrapper'>
            <Form />
          </div>
        </MotionProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default WordAnalyzerApp;
