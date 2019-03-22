import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import data from './data.json'



const A1 = require('./assets/SANBE19008_A1.jpg');
const A2 = require('./assets/SANBE19008_A2.jpg');
const A3 = require('./assets/SANBE19008_A3.jpg');
const B1 = require('./assets/SANBE19008_B1.jpg');
const B2 = require('./assets/SANBE19008_B2.jpg');
const B3 = require('./assets/SANBE19008_B3.jpg');


const colors  = {
  primary: '#003760',
  secondary: '#ff6432',
  active: '#27ad57',  // green
  inactive: '#f4424e', // red
  lightGrey: '#ddd',
  darkerGrey: '#3D3A38',
  white: '#fff',
  move: '#ffd11a'
}



export default class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      components: data.components,
    };
  }

  updateStateAfterDrag = (data, component) => {
    if(data === undefined || component === undefined) {
      return;
    }

    // console.log('NEW DATA: ', data);
    // console.log('COM from props', component);
    this.setState((state) => {
      let newState = JSON.parse(JSON.stringify(state));
      newState.components.forEach((comp) => {
        if(comp.url === component.url) {          
          comp.slides = data.data
        }
      });
  
      return newState
    });

  }

  updateState = (title) => {
    if (title === undefined) {
      console.log("NO TITLE");
      return;
    }

    // console.log("UPDATING STATE");
  
    this.setState((state) => {
      let newState = JSON.parse(JSON.stringify(state));
      newState.components.forEach((comp) => {
        comp.slides.forEach((slide) => {
          if (slide.title === title) {
            slide.show = !slide.show
          }
        });
      });
  
      return newState
    });


  }



  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    // console.log('item', item);

    // console.log('ITEM: ', item);
    return (
      <TouchableWithoutFeedback
        style={{ 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
        onPress={() => this.updateState(item.title) }
        onLongPress={move}
        onPressOut={moveEnd}

      >
        {
          item.show 
          ?
            <Image 
              style={isActive ? [styles.img, styles.imgG, styles.move] : [styles.img, styles.imgG]} 
              source={eval(item.title)} 
            />
          :
            <Image 
              style={isActive ? [styles.img, styles.imgR, styles.move] : [styles.img, styles.imgR]} 
              source={eval(item.title)} 
            />
        }
     
      </TouchableWithoutFeedback>
    )
  }

  render() {
    // console.log('STATE: ', this.state);
    

    return (
      <View style={{flexDirection: 'row', borderWidth: 2, borderColor: 'red'}}>
        {this.state.components.map((component, index) => 
          <DraggableFlatList
            key={index}
            data={component.slides}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.title}`}
            scrollPercent={5}
            onMoveEnd={({data}) => this.updateStateAfterDrag({data}, component)}
          />
        )}
      </View>
    )
  }
}



const styles =  StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonG: {
    backgroundColor: colors.active,
  },
  buttonR: {
    backgroundColor: colors.inactive,
  },
  start: {
    color: colors.white,
    backgroundColor: colors.secondary,
    borderRadius: 0,
    fontSize: 55,
  },
  img: {
    width: 300,
    height: 300,
    borderWidth: 5,
    borderRadius: 30
  },
  imgR: {
    borderColor: colors.inactive,
  },
  imgG: {
    borderColor: colors.active,
  },
  move: {
    borderColor: colors.move,
  }
});