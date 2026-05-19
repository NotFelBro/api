// Aqui, eu iniciei buscando os dados da lista de persongens do hp-api
async function buscarPersonagem() {
  const response = await fetch("https://hp-api.onrender.com/api/characters");
  const personagens = await response.json();
  console.log(personagens);
}
