import { CSSProperties } from "react";
import { IArmor, IAttack } from "src/types/Npc";




export function Combat(armor?: IArmor, attacks?: IAttack[]) {
  const container: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  }

  const cell: CSSProperties = {
    textAlign: "center",
    backgroundColor: "white",
    color: "black",
    border: "5px solid red"
  }

  function Armor(armor: IArmor) {
    return (
      <table>
        <caption style={cell}>
          {armor.name}
        </caption>
        <tbody>
          <tr>
            <th style={cell}> HEAD </th>
            <td style={cell}> {armor.head} </td>
          </tr>
          <tr>
            <th style={cell}> BODY </th>
            <td style={cell}> {armor.body} </td>
          </tr>
        </tbody>
      </table>
    )
  }

  function Combat(attacks: IAttack[]) {
    return (
      <table style={{ width: "100%" }}>
        <caption>
          <br />
        </caption>
        <tbody>
          {attacks.map((attack, i) => {
            return (
              <tr key={`atk-${i}`}>
                <td style={cell}> {attack.name} </td>
                <td style={cell}> {attack.damage} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div style={container}>
      {armor ? Armor(armor) : <div/> }
      {attacks ? Combat(attacks) : <div/> }
    </div>
  )
}