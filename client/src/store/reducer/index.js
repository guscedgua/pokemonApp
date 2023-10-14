const initialState = {
  pokemons: [],
  allPokemons: [],
  details: [],
  types: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_DETAILED_POKEMON":
      return {
        ...state,
        details: action.payload,
      };
    case "GET_POKEMONS_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "FILTER_BY_TYPES":
      const allPokemons = state.allPokemons;
      const typeFiltered =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((elem) => elem.types.includes(action.payload));
      console.log(typeFiltered);
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case "FILTER_CREATED":
      const createdPokemons =
        action.payload === "created"
          ? state.allPokemons.filter((elem) => elem.createdInDb)
          : state.allPokemons.filter((elem) => !elem.createdInDb);
      return {
        ...state,
        pokemons:
          action.payload === "all" ? state.allPokemons : createdPokemons,
      };
    case "ORDER_BY_ATTACK":
      let sortedPokemons =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedPokemons,
      };
    case "ORDER_BY_NAME":
      let sortedArray =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArray,
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
