import { CSSProperties } from "react";
import { IStats } from "src/types/Npc";


const table: CSSProperties = {
  width: "100%",
  padding: "0px",
  margin: "0px"
}

const cell: CSSProperties = {
  textAlign: "center",
  backgroundColor: "white",
  color: "black",
  border: "5px solid red"
}

export function Stats(stats: IStats) {
  const hitPoints = 10 + Math.ceil(stats.body / 2 + stats.will / 2) * 10
  const wounded = Math.ceil(hitPoints / 2)
  
  function getTopStats() {
    const headers = ["INT", "REF", "DEX", "TECH", "COOL", "WILL", "BODY", "EMP"]
    const scores = [stats.int, stats.ref, stats.dex, stats.tech, stats.cool, stats.will, stats.body, stats.emp]
    
    return (
      <table style={table}>
        <thead>
          <tr>
            { headers.map( name => 
                <th style={cell}> {name} </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            { scores.map( score =>
                <td style={cell}> {score} </td>
              )
            }
          </tr>
        </tbody>
      </table>
      )
    }
    
    function getBottomStats() {
      const headers = ["LUCK", "MOVE", "HIT POINTS", "WOUNDED", "DEATH SAVE"]
      const scores = [stats.luck, stats.move, hitPoints, wounded, stats.body]

    return (
      <table style={table}>
        <thead>
          <tr>
            { headers.map( name => 
                <th style={cell}> {name} </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            { scores.map( score =>
                <td style={cell}> {score} </td>
              )
            }
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <>
      {getTopStats()}
      {getBottomStats()}
    </>
  )
}