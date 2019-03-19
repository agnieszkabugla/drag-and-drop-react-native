import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import data from './data.json'

class App extends Component {

  state = {
    // data: [...Array(20)].map((d, index) => ({
    //   key: `item-${index}`,
    //   label: index,
    //   backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
    // }))
    data: data.components[0].slides,
    data1: data.components
  }


  end = (data) => {
    console.log('data: ',data);
  }



  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{ 
          height: 100, 
          backgroundColor: isActive ? 'blue' : 'teal',
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        onLongPress={move}
        onPressOut={moveEnd}
      >
        <Text style={{ 
          fontWeight: 'bold', 
          color: 'white',
          fontSize: 32,
        }}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    console.log(this.state)
    return (
      <View style={{ flex: 1, borderWidth: 2, borderColor: 'red'}}>

            <DraggableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.title}`}
            scrollPercent={5}
            // onMoveEnd={() => this.end({data})}
            onMoveEnd={({ data }) => this.setState({ data })}
            />

      </View>
    )
  }
}

export default App;