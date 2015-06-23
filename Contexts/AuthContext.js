'use strict';

// REACT NATIVE PARTS
var React = require("react-native");
var Icons = require("react-native-vector-icons");
var Reflux = require("reflux");

// PERSONAL COMPONENTS
var LoginScene = require("../Scenes/LoginScene");
var RegisterScene = require("../Scenes/RegisterScene");
var AppContext = require("./AppContext");

// ACTIONS && HOSTS
var HostStore = require("../Stores/HostStore");
var HostActions = require("../Actions/HostActions");

var UserStore = require("../Stores/UserStore");
var UserActions = require("../Actions/UserActions");

var {
  Navigator,
	StyleSheet,
	Text,
	View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

var AuthContext = React.createClass({
	mixins: [Reflux.connect(HostStore), Reflux.ListenerMixin],
  getInitialState: function() {
    return {
      preferredScene: "login",
    };
  },

  componentWillMount: function() {
    // validate whether user is authenticated w/ Firebase
    var authData = this.state.db.getAuth();

    if (authData) {
      var route = {
        component: AppContext,
      };

      debugger;
      this.props.navigator.replace(route);

      UserActions.fillAuthenticatedUser.triggerPromise(authData.uid).catch((err) => {
        /*
        err doesn't necessarily mean user wasn't logged in.
        Look at using AsyncStorage for user
        */
      });
    }
  },

  _renderScene: function(route, navigator) {
    var Scene = route.component;

    return (
      <Scene
        navigator={navigator}
        route={route} />
    );
  },

  render: function() {
    return (
      <Navigator
        renderScene={this._renderScene}
        initialRoute={{
          component: LoginScene,
        }} />
    )
  }
});

module.exports = AuthContext;