import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import SearchById from './SearchById';
import MyAccount from './MyAccount';

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
						<Route path="/account" component={MyAccount} />
						<Route exact path="/asteroidById" component={SearchById} />
					</Switch>
				</div>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;