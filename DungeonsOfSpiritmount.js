import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { MoveCharacter } from './systems.js'
import { TestSprite } from './TestSprite.js';
import { Map } from 'immutable'
import { TouchableOpacity } from 'react-native';

export default function DungeonsOfSpiritmount(props) {


    const [state, setState] = useState({ player: { position: [0, 0] }, enemy: { position: [(props.width / 32 - 1), (props.height / 32 - 1)] }, commands: {}, layout: [0, 1, 2, 3] })
    const spriteSize = 32

    var layout = props.layout.map((layout, index) => {

        return (
            <TestSprite key={index} />
        )
    })

    function getStateLog() {
        console.log(state)
        let newEntities = step(state)

        setState({ ...newEntities })
    }

    useEffect(() => {
        let newEntities = step(state)

        let mapped = Map({ ...newEntities })
        console.log(mapped)

        setState({ ...newEntities });



    }, [])


    const step = (prevState) => {
        let characterPosition = MoveCharacter(prevState, props.width, props.height)
        let enemyPosition = MoveCharacter(prevState, props.width, props.height)
        let newState = {
            ...characterPosition,
            ...enemyPosition
        }

        return (newState)


    }


    return (
        <View style={styles.container}>
            <View style={{ width: props.width, height: props.height - 65, backgroundColor: 'blue' }}>
                {state.layout.map((layout, index) => {

                    return (
                        <TestSprite key={index} index={Math.round(Math.random() * 550)} position={[(state.player.position[0] + index) * spriteSize, (state.player.position[1] + index) * spriteSize]} />
                    )
                })}
                <TestSprite index={543} position={[state.player.position[0] * spriteSize, state.player.position[1] * spriteSize]} />
                <TestSprite index={181} position={[state.enemy.position[0] * spriteSize, state.enemy.position[1] * spriteSize]} />
                <TestSprite index={245} position={[(state.enemy.position[0] + 1) * spriteSize, (state.enemy.position[1] + 1) * spriteSize]} />
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={getStateLog}>
                        <Text style={{ fontSize: 15, fontStyle: 'normal', color: 'white' }}>
                            Next Step
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <StatusBar hidden={true} />

        </View>
    );
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

