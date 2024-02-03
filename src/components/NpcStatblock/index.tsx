import * as React from "react"
import { INpcData } from "src/types/Npc";

import { Skills } from "./Skills";
import { Stats } from "./Stats";
import { Combat } from "./Combat";
import { RoleAbility } from "./RoleAbilities";


type CSSProperties = React.CSSProperties

class NpcStatblock extends React.Component {
  data: INpcData;
  bevel: number;
  padding_h: number

  constructor(data: INpcData) {
    super({})
    this.data = data;
    this.bevel = 2;
    this.padding_h = 0.5
  }

  render(): React.ReactNode {
    const container: CSSProperties = {
      backgroundColor: "red",
      clipPath: `polygon(${this.bevel}em 0%, 100% 0, 100% calc(100% - ${this.bevel}em), calc(100% - ${this.bevel}em) 100%, 0 100%, 0% ${this.bevel}em)`,
      padding: `${this.bevel}em ${this.padding_h}em ${this.bevel}em ${this.padding_h}em`
    }

    const header: CSSProperties = {
      display:"flex",
      paddingLeft:"0.5rem",
      paddingRight:"0.5rem",
      justifyContent:"space-between",
      alignItems:"end"
    }

    const handle = this.data.handle? this.data.handle : this.data.name
    const role = { name:this.data.role.name.toUpperCase(), rank:this.data.role.rank }

    const stats = this.data.stats
    const armor = this.data.armor
    const attacks = this.data.attacks
    const skills = this.data.skills

    return (
      <div style={container}>
        <div style={header}>
          <h1 style={{margin:"0"}}> {handle.toUpperCase()} </h1>
          <h3 style={{margin:"0"}}> {role.name}: {role.rank} </h3>
        </div>
        {Stats(stats)}
        {Combat(armor, attacks)}
        {Skills(stats, skills)}
        {RoleAbility(this.data.role)}
      </div>
    )
  }
}

export default NpcStatblock;