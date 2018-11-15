import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert, FlatList } from 'react-native'


import Square from './Square';

export default class Game extends Component {

    state = {
        winCondition: 0,
        size: this.initialState()[0],
        gridList: this.initialState()[1],
        uncovered: []
    };

    constructor(props){
        super(props);

    }

    initialState(){
        let size;
        let gridList = [];
        
        switch(this.props.diff){
            case 1:
                size = 5;
                break
            case 2:
                size = 8;
                break
            case 3:
                size = 10;
                break
            default:
                console.log("error on difficulty in Game.js")
        }
        for(let i=0;i<size;i++){
            gridList.push([]);
            for(let j=0;j<size;j++){
                gridList[i].push({
                    x: i,
                    y: j,
                    bomb: false,
                    bombNb: 0,
                    visible: 0,
                })
            }
        }
        let bombs = Math.trunc((size**2)/5)
        while (bombs > 0){
            let randomX = Math.floor(Math.random() * (size));
            let randomY = Math.floor(Math.random() * (size));
            gridList[randomX][randomY].bomb = true;
            bombs--;
        }
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                let bombNb = 0;
                let neighbours = this.getNeighbours(i,j, gridList, size)
                neighbours.map( neighbour => {
                    if (neighbour.bomb){
                        bombNb++;
                    }
                });
                gridList[i][j].bombNb = bombNb;
            }
        }
        return [size,gridList]
    }

    getNeighbours(x, y, data, size) {
        const neighbours = [];
        if (x > 0) {
            neighbours.push(data[x - 1][y]);
        } 
        if (x < size - 1) {
            neighbours.push(data[x + 1][y]);
        }
        if (y > 0) {
            neighbours.push(data[x][y - 1]);
        }
        if (y < size - 1) {
            neighbours.push(data[x][y + 1]);
        }
        if (x > 0 && y > 0) {
            neighbours.push(data[x - 1][y - 1]);
        }
        if (x > 0 && y < size - 1) {
            neighbours.push(data[x - 1][y + 1]);
        }
        if (x < size - 1 && y < size - 1) {
            neighbours.push(data[x + 1][y + 1]);
        }
        if (x < size - 1 && y > 0) {
            neighbours.push(data[x + 1][y - 1]);
        }
        return neighbours;
      }

    revealZeros(x,y, newList){
        let neighbours = this.getNeighbours(x,y,newList,this.state.size);
        neighbours.map( neighbour => {
            if(neighbour.visible === 0){
                newList[neighbour.x][neighbour.y].visible = 1;
                const win = this.state.winCondition + 1;
                this.setState(state => {
                    const list = state.uncovered.concat(newList[neighbour.x][neighbour.y]);
                    return {uncovered: list}});
                if (neighbour.bombNb === 0){
                    this.revealZeros(neighbour.x,neighbour.y,newList);
                }
            }
        });
        return newList
    }
    
    reveal = (x,y) => () => {
        let newList = this.state.gridList.splice(0);
        if (newList[x][y].bomb === true){
            Alert.alert("You died", "", [{text: 'OK', onPress:this.props.restart}]);
            newList[x][y].visible = 3;
        } else {
            newList[x][y].visible = 1;
            this.setState(state => {
                const list = state.uncovered.concat(newList[x][y]);
                return {uncovered: list}}, () => {
                if(this.state.uncovered.length === this.state.size**2){
                    Alert.alert("You won", "", [{text: 'OK', onPress:this.props.restart}]);
                }
            });
            if(newList[x][y].bombNb === 0){
                newList = this.revealZeros(x,y, newList);
            }
        }
        this.setState({gridList: newList});
    }

    mark = (x,y) => () => {
        const newList = this.state.gridList.splice(0);
        newList[x][y].visible = 2;
        if(newList[x][y].bomb){
            this.setState(state => {
                const list = state.uncovered.concat(newList[x][y]);
                return {uncovered: list}}, () => {
                if(this.state.uncovered.length === this.state.size**2){
                    Alert.alert("You won", "", [{text: 'OK', onPress:this.props.restart}]);
                }
            });
        }
        this.setState({gridList: newList});
    }

    unMark = (x,y) => () => {
        const newList = this.state.gridList.splice(0);
        newList[x][y].visible = 0;
        this.setState({gridList: newList});
    }

  render() {
    
    return (
        <View>
            <Text style={styles.rule}>Press to reveal, hold to mark</Text>
            <TouchableOpacity onPress={this.props.restart} style={styles.button}>
                <Text style={styles.text}>Restart</Text>
            </TouchableOpacity>
            <FlatList
                data={this.state.gridList}
                keyExtractor={gridRow => `${gridRow[0].x}`}
                extraData={this.state.gridList}
                renderItem={(gridRow) => {
                return <FlatList
                    numColumns={this.state.size}
                    data={gridRow.item}
                    extraData={this.state.gridList}
                    keyExtractor={item => `${(item.y,item.x)}`}
                    renderItem={(item) => {
                        return <Square 
                            bomb={item.item.bomb} 
                            bombNb={item.item.bombNb} 
                            visible={item.item.visible} 
                            reveal={this.reveal} 
                            mark={this.mark} 
                            unMark={this.unMark}
                            x={item.item.x} 
                            y={item.item.y} 
                            size={this.state.size}
                        />
                    }}
            /> }}
            />

        </View>
    )
  }
}

const styles = StyleSheet.create({
    rule: {
        textAlign: 'center',
      },
    text:{
        fontSize: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#498dfc',
        padding: 10,
        margin: 20,

      },
      column: {
        flex: 1,
        flexDirection: 'column'
      }
})
