import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';
const typesUrl = 'https://pokeapi.co/api/v2/type';

export async function pegarListaPokemon() {
  const res = await axios.get(`${BASE_URL}/pokemon?limit=100000&offset=0`);
  return res.data.results;
}

export async function pegarDetalhesPokemon(pokemonName: string) {
  const res = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
  return res.data;
}

export async function pegarTodosTiposPokemon() {
  const res = await axios.get(typesUrl);
  return res.data.results;
}

export async function pegarEspeciePokemon(url: string) {
  const res = await axios.get(`${url}/`);
  return res.data;
}

export async function pegarHabilidadesPokemon(url: string) {
  const res = await axios.get(`${url}/`);
  return res.data;
}

export async function pegarDetalhesStats(url: string) {
  const res = await axios.get(`${url}/`);
  return res.data;
}

export async function pegarDetalhesTipo(url: string) {
  const res = await axios.get(`${url}/`);
  return res.data;
}

export async function pegarArvoreEvolucao(url: string) {
  const res = await axios.get(`${url}/`);
  return res.data;
}

export async function pegarDetalhesMove(url: string) {
  const res = await axios.get(`${url}/`);
  return res.data;
}