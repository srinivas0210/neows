import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#FF5722',
			dark: '#d50000',
			contrastText: '#fff'
		}
  }
});

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={SignUp} />
					</Switch>
				</div>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;