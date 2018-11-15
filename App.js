import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import Game from './components/game/Game';
import Menu from './components/Menu';

export default class App extends React.Component {

  state = {
    difficulty: null,
  }

  changeDifficulty = (diff) => {
    console.log("changing diff: ", diff)
    this.setState({difficulty: diff});
  }

  restart = () => {
    this.setState({difficulty: null})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{paddingTop:100, paddingBottom: 30, fontSize: 30}}>Welcome to demineur!</Text>
        {this.state.difficulty ? <Game diff = {this.state.difficulty} restart={this.restart}/> : <Menu changeDiff={this.changeDifficulty}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
