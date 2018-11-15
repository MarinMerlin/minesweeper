import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default class Menu extends Component {

    constructor(props){
        super(props)
    }

    pickDifficulty = (diff) => () => {
        console.log("changing diff")
        this.props.changeDiff(diff);
        /* switch(diff){
            case 1:
            Alert.alert("Difficulty set to medium ") 
                break
            case 2:
                Alert.alert("Difficulty set to medium ") 
                break 
            case 3:
                Alert.alert("Difficulty set to hard ") 
                break  
            default:
                Alert.alert("error")  
        } */
    }
  render() {
    return (
      <View>
         <TouchableOpacity onPress={this.pickDifficulty(1)} style={styles.button}>
            <Text style={styles.text}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pickDifficulty(2)} style={styles.button}>
            <Text style={styles.text}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pickDifficulty(3)} style={styles.button}>
            <Text style={styles.text}>Hard</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#498dfc',
      padding: 30,
      margin: 20
    },
  })
