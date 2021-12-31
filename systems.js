import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";



const MoveCharacter = (entities, PassedWidth, PassedHeight) => {
const width = PassedWidth/32
const height = PassedHeight/32

  //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  //-- That said, it's probably worth considering performance implications in either case.

//   touches.filter(t => t.type === "move").forEach(t => {
//     let finger = entities[t.id];
//     if (finger && finger.position) {
//       finger.position = [
//         finger.position[0] + t.delta.pageX,
//         finger.position[1] + t.delta.pageY
//       ];
//     }
//   });

let player = entities.player
let enemy = entities.enemy
player.position[0] += 1/3
player.position[1] += 1
enemy.position[0] -= 1/2
enemy.position[1] -= 1

if(player.position[0] >= width){
  player.position[0] = 0
}

if(enemy.position[0] < 0){
  enemy.position[0] = width - 1
}

if(player.position[1] > height){
  player.position[1] = 0
}

if(enemy.position[1] < 0){
  enemy.position[1] = height - 1
}


return {...entities};

};

export {MoveCharacter}
