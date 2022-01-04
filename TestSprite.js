import SpriteSheet from 'rn-sprite-sheet';
import React, {PureComponent, Component, useState, useEffect} from "react";
import {} from 'react-native'


class TestSprite extends PureComponent {

    constructer(props){
        this.sprite = null
        this.timeoutID = null
        this.playAnimation = this.playAnimation.bind(this)
        this.idle = [543]
        this.walk = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    }

    componentDidMount(){
        console.log("Component did mount")

        this.playAnimation({
            type: "idle", // (required) name of the animation (name is specified as a key in the animation prop)
            fps: 24, // frames per second
            loop: false, // if true, replays animation after it finishes
            resetAfterFinish: false, // if true, the animation will reset back to the first frame when finished; else will remain on the last frame when finished
          })


    }


    componentWillUnmount(){
        console.log("Component will unmount")

    }

  
    playAnimation = (config) => {
      this.sprite.play(config);
    }

    walkAnimation = () =>{
        this.playAnimation({
            type: "walk", // (required) name of the animation (name is specified as a key in the animation prop)
            fps: 24, // frames per second
            loop: false, // if true, replays animation after it finishes
            resetAfterFinish: false, // if true, the animation will reset back to the first frame when finished; else will remain on the last frame when finished
          })
        
    }

    changeColors = () =>{
      this.playAnimation({
          type: "changeColors", // (required) name of the animation (name is specified as a key in the animation prop)
          fps: 12, // frames per second
          loop: false, // if true, replays animation after it finishes
          resetAfterFinish: false, // if true, the animation will reset back to the first frame when finished; else will remain on the last frame when finished
        })
      
  }

  
  render(){
      let x = this.props.position[0]
      let y = this.props.position[1]



    return(
        <SpriteSheet
          ref={ref => (this.sprite = ref)}
          source={require('./assets/rltiles-2d.png')}
          columns={30}
          rows={55}
          // height={200} // set either, none, but not both
          // width={200}
          // frameHeight={50} // manually set size of your sprite
          // frameWidth={50} // overrides auto calculation of frame size based on height, width, columns, and rows.
          // offsetX={0}
          // offsetY={0}
          viewStyle ={{left: x, top: y, position: 'absolute'}}
          imageStyle={{ marginTop: -1 }}
          animations={{
            idle: [this.props.index],
            walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            changeColors: [541, 542, 543, 544, 543],
            appear: Array.from({ length: 15 }, (v, i) => i + 18),
            die: Array.from({ length: 21 }, (v, i) => i + 33),
          }}
        />
              
        )  

  }

  }


  export {TestSprite}