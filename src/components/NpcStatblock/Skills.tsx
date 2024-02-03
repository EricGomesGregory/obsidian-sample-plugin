import { CSSProperties } from "react";
import { ISkill, IStatName, IStats } from "src/types/Npc";




export function Skills(stats: IStats, skills?: ISkill[]) {
  const header: CSSProperties = {
    width:"fit-content",
    textAlign: "center",
    backgroundColor: "white",
    color: "black",
    padding:"0px 1rem",
    border: "5px solid red"
  }

  const content: CSSProperties = {
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    gap:"0.25rem",
    backgroundColor: "white",
    color: "black",
    border: "5px solid red"
  }

  const item: CSSProperties = {
    padding:"0",
    margin:"0"
  }

  function base(stat: IStatName): number {
    switch (stat) {
      case "int": return stats.int
      case "ref": return stats.ref
      case "dex": return stats.dex
      case "tech": return stats.tech
      case "cool": return stats.cool
      case "will": return stats.will
      case "body": return stats.body
      case "emp": return stats.emp
    }
  }

  function modifier(skill: ISkill): string {
    const mod = base(skill.stat) + skill.level
    return mod > 0 ? `+${mod}` : `${mod}`
  }

  if (skills == undefined || skills.length == 0) return

  return (
    <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>
      <b style={header}> SKILLS </b>
      <div style={content}>
        {skills.map((skill, i) => {
          const mod = modifier(skill)
          return <p key={`skill-${i}`} style={item}> {`•${skill.name} (${mod})`} </p>
        })}
      </div>
    </div>
  )
}