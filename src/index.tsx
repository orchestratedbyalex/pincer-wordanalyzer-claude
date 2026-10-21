import React from 'react';
import ReactDOM from 'react-dom';

// local
import WordAnalyzerApp from './WordAnalyzerApp';

// Fonts: self-hosted display serif, Latin subset, only the weights in use
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';

// Styles
import './index.css';

ReactDOM.render(
  <React.StrictMode>
      <WordAnalyzerApp />
  </React.StrictMode>,
  document.getElementById('root')
);
