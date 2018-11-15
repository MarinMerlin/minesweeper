import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'

export default class Square extends Component {

    state = {
        visible: false,
        bomb: null,
    }

    constructor(props){
        super(props)
        this.state.styles = StyleSheet.create({
            square:{
                backgroundColor: '#498dfc',
                margin: 4,
                width: 240/this.props.size, 
                height: 240/this.props.size,
            },
            square2:{
                backgroundColor: '#a9a9aa',
                margin: 4,
                width: 240/this.props.size, 
                height: 240/this.props.size,
            },
            square3:{
                backgroundColor: '#7c7d7f',
                margin: 4,
                width: 240/this.props.size, 
                height: 240/this.props.size,
            },
            square4:{
                backgroundColor: '#f71c00',
                margin: 4,
                width: 240/this.props.size, 
                height: 240/this.props.size,
            },
            text: {
                fontSize: (240/3)/this.props.size,
                textAlign: 'center',
                marginTop: ((240-10)/3)/this.props.size,
            },
        })

    }

  render() {

    return (
        <View>
            {this.props.visible === 1 && <TouchableOpacity style={this.state.styles.square2}>
                <Text style={this.state.styles.text}>{this.props.bombNb}</Text>
            </TouchableOpacity>}
            {this.props.visible === 0 && <TouchableOpacity onPress={this.props.reveal(this.props.x,this.props.y)} onLongPress={this.props.mark(this.props.x,this.props.y)} style={this.state.styles.square}>
                <Text style={this.state.styles.text}></Text>
            </TouchableOpacity>}
            {this.props.visible === 2 && <TouchableOpacity style={this.state.styles.square3} onPress={this.props.unMark(this.props.x,this.props.y)}>
                <Text style={this.state.styles.text}>M</Text>
            </TouchableOpacity>}
            {this.props.visible === 3 && <TouchableOpacity style={this.state.styles.square4}>
                <Text style={this.state.styles.text}>X</Text>
            </TouchableOpacity>}
        </View>
    )
  }
}


