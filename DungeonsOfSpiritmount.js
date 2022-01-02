import { StatusBar } from 'expo-status-bar';
import SpriteSheet from 'rn-sprite-sheet';
import React, { useState, useEffect, PureComponent } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { MoveCharacter } from './systems.js'
import { TestSprite, MapSprite } from './TestSprite.js';
import { Map } from 'immutable'
import { TouchableOpacity } from 'react-native';

export default function DungeonsOfSpiritmount(props) {



    const [state, setState] = useState({ player: { position: [0, 0] }, enemy: { position: [(props.width / 32 - 1), (props.height / 32 - 1)] }, commands: {}, layout: [0, 1, 2, 3] })
    const [ref, setRef] = useState(null)
    const [count, setCount] = useState(0)
    const [map, setMap] = useState([])
    var refArray = []
    const spriteSize = 32
    var nonstatemap = []

    var layout = props.layout.map((layout, index) => {

        return (
            <TestSprite key={index} />
        )
    })

    function getStateLog() {
        console.log(state)
        setCount(count + 1)
        let newEntities = step(state)

        setState({ ...newEntities })
        if(count > 20){
            ref.changeColors()
            setCount(0)
        }
    }


    function loadMap(){

        let rows = Math.ceil(props.height/spriteSize)
        let columns = Math.ceil(props.height/spriteSize)
        var tempmap = []
        for(let i = 0; i <rows; i++){
            for(let j = 0; j < columns; j++){
                let mapIdx = (i * columns) + j;
                tempmap.push({key: mapIdx, index: 1358, position: [j * spriteSize, i * spriteSize]})

            }
        }

        setMap(map=> tempmap)
        // nonstatemap = tempmap

            
    }
    useEffect(() => {
        console.log("dungeon useEffect")
        console.log(props.width/spriteSize)
        console.log(props.height/spriteSize)
        let newEntities = step(state)

        let mapped = Map({ ...newEntities })
        console.log(mapped)
        setState({ ...newEntities });

        return()=>{
        }



    }, [])


    const step = (prevState) => {
        let characterPosition = MoveCharacter(prevState, props.width, props.height)
        let newState = {
            ...characterPosition,
        }

        return (newState)


    }


    return (
        <View style={styles.container}>
            <View style={{ width: props.width, height: props.height, backgroundColor: 'blue' }}>
            <MapView map = {map}/>
                {state.layout.map((layout, index) => {

                    //Testing various sprites on screen, when they have to be re-rendered, etc

                    return (
                        <TestSprite key={index} index={Math.round(Math.random() * 637)} position={[(state.player.position[0] + index) * spriteSize, (state.player.position[1] + index) * spriteSize]} />
                    )
                })}
                <TestSprite ref={(ref)=> setRef(ref)} index={543} position={[state.player.position[0] * spriteSize, state.player.position[1] * spriteSize]} />
                <TestSprite index={181} position={[state.enemy.position[0] * spriteSize, state.enemy.position[1] * spriteSize]} />
                <TestSprite index={245} position={[(state.enemy.position[0] + 1) * spriteSize, (state.enemy.position[1] + 1) * spriteSize]} />
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={getStateLog}>
                        <Text style={{ fontSize: 15, fontStyle: 'normal', color: 'white' }}>
                            Next Step
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={loadMap}>
                        <Text style={{ fontSize: 15, fontStyle: 'normal', color: 'white' }}>
                            Load Map
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <StatusBar hidden={true} />

        </View>
    );
}

class MapView extends PureComponent {

    constructor(props){
        super(props)
        this.map = props.map
    }


    render(){
    let myMap = this.props.map.map((square, index)=>{
        console.log(square.position[0])
            return(
                <TestSprite key = {square.key} index ={square.index} position={square.position}/>
                )  
        
    })

    return(
        <View>
        {myMap}
        </View>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

