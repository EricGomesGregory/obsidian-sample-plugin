import { IRole, IRoleAbility } from "src/types/Npc";



function Ability(ability: IRoleAbility) {
  return (
    <div>
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
        {role.abilities.map(ability => Ability(ability))}
      </div>
    </div>
  )
}