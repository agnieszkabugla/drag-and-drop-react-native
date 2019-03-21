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



    


  end = (data, keyExtractor) => {
    console.log('data: ',data);
    console.log('key ex', keyExtractor );
  }



  renderItem = ({ item, index, move, moveEnd, isActive }) => {

    console.log('ITEM: ', item);
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

    const components = [...this.state.data1];

    // console.log(x);

    // console.log(this.state)
    return (
      <View style={{ flex: 1, borderWidth: 2, borderColor: 'red'}}>
        {components.map(component => {
          
          console.log("item", component.slides);
          // {items = component.slides}
          <DraggableFlatList
            data={component.slides}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.title}`}
            scrollPercent={5}
            onMoveEnd={() => this.end({data, keyExtractor})}
            // onMoveEnd={({ data }) => this.setState({ data })}
          />

        })}


      </View>
    )
  }
}

export default App;