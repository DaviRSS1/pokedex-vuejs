interface Ability {
    name: string;
    url: string;
  }
  
  export interface PokemonType {
    type: {
      name: string;
      url: string;
    };
  }
  
  export default interface IDetalhesPokemon {
    name: string;
    url: string;
    abilities: Ability[];
    types: PokemonType[];
    id: number;
  }
  