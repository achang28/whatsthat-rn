'use strict';

// REACT PARTS
var React = require("react-native");
var Reflux = require("reflux");

// SCENES
var ProfileContext = require("./ProfileContext");
var SummaryContext = require("./SummaryContext");

// ACTIONS && STORES
var HostActions = require("../Actions/HostActions");
var HostStore = require("../Stores/HostStore");

// Utilities
var _ = require("lodash");

var {
	Navigator,
 	NavigatorIOS,
	StyleSheet,
	TabBarIOS,
	View,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EFEFFB",
	},
	navBar: {
		backgroundColor: "#A4A4A4"
	},
	text: {
		color: "#FFFFFF"
	}
});

var AppContext = React.createClass({
	getInitialState: function() {
		return {
			chosenTab: "main",
			badges: {
				"main": {
					newCnt: 0,
				},
				"add": {
					newCnt: 0,
				}
			},
		}
	},

	componentWillMount: function() {

	},

	_updateBadgeCount: function(tab, cnt) {
		this.setState((prevState, currentProps) => {
			var badges = _.transform(prevState.badges, (result, badge, key) => {
				result[tab] = {"newCnt": (tab == key) ? cnt : prevState.badges[key].newCnt};
			});
			
			return badges;
		});
	},

	_renderContext: function(route, navigator) {
		var Context = route.component;
		var navBar = null;

		return (
	   	<View style={styles.container}>
		  	<Context
		   		navigator={navigator}
		   		route={route} />
		  </View>
		);
	},

	_routeContext: function(navigator) {
		var context = null;

		switch(this.state.chosenTab) {
			case "main":
				context = SummaryContext;
				break;
			
			case "add":
				context = SummaryContext;
				break;

			case "profile":
				context = ProfileContext;
				break;

			case "settings":
				context = SummaryContext;
				break;

			default:
				context = SummaryContext;
				break;
		}

		return (
			<Navigator
				renderScene={this._renderContext}
				initialRoute={{
				  component: context,
				}} />
		);
	},

	render: function() {
		return (
			<TabBarIOS
        tintColor="#A4A4A4"
        barTintColor="#3abeff">
        
        <TabBarIOS.Item
	        icon={require("image!items")}
					onPress={() => {
					  this.setState({
					    chosenTab: 'items',
					  });
					}}
					selected={this.state.chosenTab === 'main'}
					title="Items">
						{this.state.chosenTab == "main" ? this._routeContext("main") : ""}
        </TabBarIOS.Item>
        
        <TabBarIOS.Item
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          icon={require("image!add")}
          onPress={() => {
            this.setState({
              chosenTab: 'add',
              notifCount: this.state.notifCount + 1,
            });
          }}
          selected={this.state.chosenTab === "add"}
          title="Add">
          	{this.state.chosenTab == "add" ? this._routeContext("add") : ""}
        </TabBarIOS.Item>
        
        <TabBarIOS.Item
        	icon={require("image!profile")}
          onPress={() => {
            this.setState({
              chosenTab: 'profile',
              presses: this.state.presses + 1
            });
          }}
          selected={this.state.chosenTab === 'profile'}
          title="Profile">
          	{this.state.chosenTab == "profile" ? this._routeContext("profile") : ""}
        </TabBarIOS.Item>

        <TabBarIOS.Item
        	icon={require("image!settings")}
          onPress={() => {
            this.setState({
              chosenTab: 'settings',
              presses: this.state.presses + 1
            });
          }}
          selected={this.state.chosenTab === 'settings'}
          title="Settings">
          	{this.state.chosenTab == "settings" ? this._routeContext("settings") : ""}
        </TabBarIOS.Item>
      </TabBarIOS>
		);
	}
});

module.exports = AppContext;