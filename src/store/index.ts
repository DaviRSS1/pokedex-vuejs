import { pegarArvoreEvolucao, pegarDetalhesMove, pegarDetalhesPokemon, pegarDetalhesStats, pegarDetalhesTipo, pegarEspeciePokemon, pegarHabilidadesPokemon, pegarListaPokemon, pegarTodosTiposPokemon } from '@/http';
import { createStore } from 'vuex'

export default createStore({
  state: {
    listaPokemon: [],
    detalhesPokemon: {},
    tiposPokemon: [],
    especiePokemon: {},
    habilidadesPokemon: {},
    detalhesAtributo: {},
    idioma: 'en',
    stats: {},
    tipo: [{}],
    arvoreEvolucao: {},
    tipoDetalhesCarregados: false,
    detalhesMove: []
  },
  mutations: {
    SET_LISTA_POKEMON(state, lista) {
      state.listaPokemon = lista;
    },
    SET_DETALHES_POKEMON(state, detalhes) {
      state.detalhesPokemon = detalhes;
    },
    SET_TIPOS_POKEMON(state, tipos) {
      state.tiposPokemon = tipos;
    },
    SET_ESPECIE_POKEMON(state, especie) {
      state.especiePokemon = especie;
    },
    SET_HABILIDADE_POKEMON(state, habilidade) {
      state.habilidadesPokemon = habilidade
    },
    SET_IDIOMA(state, idioma) {
      state.idioma = idioma
    },
    SET_STATS_DETALHES(state, stats) {
      state.stats = stats
    },
    SET_DETALHES_TIPO(state, tipo) {
      state.tipo.push(tipo)
      state.tipoDetalhesCarregados = true;
    },
    SET_ARVORE_EVOLUCAO(state, arvore) {
      state.arvoreEvolucao = arvore
    },
    SET_DETALHE_MOVE(state, move) {
      state.detalhesMove = (move)
    },
  },
  actions: {
    async carregarListaPokemon({ commit }) {
      const lista = await pegarListaPokemon();
      commit('SET_LISTA_POKEMON', lista);
    },
    async carregarDetalhesPokemon({ commit }, pokemonName) {
      try {
        const detalhes = await pegarDetalhesPokemon(pokemonName);
        commit('SET_DETALHES_POKEMON', detalhes);
        return detalhes;
      }
      catch (error) {
        console.log(error)
        return {}
      }
    },
    async carregarTiposPokemon({ commit }) {
      const tipos = await pegarTodosTiposPokemon();
      commit('SET_TIPOS_POKEMON', tipos);
    },

    async carregarEspeciePokemon({ commit }, url) {
      try {
        const especie = await pegarEspeciePokemon(url);
        commit('SET_ESPECIE_POKEMON', especie);
        return especie;
      }
      catch (error) {
        console.log(error)
        return {}
      }
    },

    async carregarHabilidadesPokemon({ commit }, url) {
      try {
        const habilidade = await pegarHabilidadesPokemon(url);
        commit('SET_HABILIDADE_POKEMON', habilidade);
        return habilidade;
      }
      catch (error) {
        console.log(error)
        return {}
      }
    },

    async pegarIdioma({ commit }, idioma) {
      commit('SET_IDIOMA', idioma)
    },

    async carregarDetalhesStats({ commit }, url) {
      try {
        const stats = await pegarDetalhesStats(url);
        commit('SET_STATS_DETALHES', stats);
        return stats;
      }
      catch (error) {
        console.log(error)
        return {}
      }
    },

    async carregarDetalhesTipo({ state, commit }, url) {
      if (!state.tipoDetalhesCarregados) {
        try {
          const tipos = await pegarDetalhesTipo(url);
          commit('SET_DETALHES_TIPO', tipos);
          return tipos;
        } catch (error) {
          console.log(error);
          return {};
        }
      }
    },

    async carregarArvoreEvolucao({ commit }, url) {
      try {
        const arvore = await pegarArvoreEvolucao(url);
        commit('SET_ARVORE_EVOLUCAO', arvore);
        return arvore;
      } catch (error) {
        console.log(error);
        return {};
      }
    },

    async carregarDetalhesMove({ commit }, url) {
      try {
        const move = await pegarDetalhesMove(url);
        commit('SET_DETALHE_MOVE', move);
        return move;
      } catch (error) {
        console.log(error);
        return {};
      }
    },
  }
})
