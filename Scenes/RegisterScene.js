'use strict';

var React = require("react-native");
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");

// ACTIONS && HOSTS
var HostStore = require("../Stores/HostStore");

var {
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View,
} = React;

var styles = StyleSheet.create({
	buttonText: {
		fontSize: 18,
		color: 'yellow',
		alignSelf: 'center'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000',
		paddingRight: 25,
		paddingLeft: 25,
	},
	input: {
		height: 40,
		borderColor: "blue",
		color: "white",
		borderWidth: 1
	}
});

var RegisterComp = React.createClass({
	mixins: [Reflux.connect(HostStore)],
	
	componentWillMount: function() {
		this.setState({
			creds: {
				email: "",
				password: "",
			}
		})
	},

	_processLogin: function(event) {
		this.state.db.authWithPassword(this.state.creds, (err, authData) => {
			if (authData) {
				console.log("authenticated");
				var route = {
					component: SummaryScene,
					passProps: {
						user: authData
					}
				}


				debugger;



				
				this.setState({
					isLoggedIn: true
				});

				

				this.props.navigator.replace(route);
			} else {
				debugger;
				console.log("Error logging in...");
			}
		});
	},

	_updateEmail: function(e) {
		this.setState({
			creds: {
				email: e.nativeEvent.text,
				password: this.state.creds.password
			}
		});
	},

	_updatepassword: function(e) {
		this.setState({
			creds: {
				email: this.state.creds.email,
				password: e.nativeEvent.text,
			}
		});
	},

	render: function() {
		return (
			<View style={styles.container}>
				<Text>This is the Registration Component</Text>
			</View>
		);
	}
})

module.exports = RegisterComp;