import { IRole, IRoleAbility } from "src/types/Npc";



function Ability(ability: IRoleAbility, index: number) {
  return (
    <div key={`ability-${index}`}>
      <b> {ability.name} </b>
      <div>
        {ability.description}
      </div>
    </div>
  )
}

export function RoleAbility(role: IRole) {

  return (
    <div>
      <b> ROLE ABILITIES </b>
      <div>
        {role.abilities.map((ability, i) => Ability(ability, i))}
      </div>
    </div>
  )
}