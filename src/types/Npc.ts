
export interface IRole {
  name: string,
  rank: number,
  abilities: IRoleAbility[]
}

export interface IRoleAbility {
  name: string,
  description: string
}

export interface IStats {
  int: number,
  ref: number,
  dex: number,
  tech: number,
  cool: number,
  will: number,
  body: number,
  emp: number,
  move: number,
  luck: number
}

export interface IArmor {
  name: string,
  head: number,
  body: number
}

export interface IAttack {
  name: string,
  damage: string
}

export type IStatName = "int" | "ref" | "dex" | "tech" | "cool" | "will" | "body" | "emp"

export interface ISkill {
  name: string,
  stat: IStatName
  level: number
}

export interface INpcData {
  name: string,
  handle?: string,
  role: IRole,
  stats: IStats,
  armor?: IArmor,
  attacks?: IAttack[],
  skills?: ISkill[]
}

export function createNpcData(): INpcData {
  return {
    name:"NAME",
    role: {
      name:"ROLE_NAME",
      rank: 0,
      abilities:[]
    },
    stats: {
      int: 0,   ref: 0,
      dex: 0,   tech: 0,
      cool: 0,  will: 0,
      body: 0,  emp: 0,
      move: 0,  luck: 0
    },
    armor: {
      name: "",
      head: 0,
      body: 0
    },
    attacks:[
      { name: "WEAPON_NAME", damage: "0d6" }
    ],
    skills:[
      { name: "SKILL_NAME", stat:"int", level:0 }
    ]
  }
}