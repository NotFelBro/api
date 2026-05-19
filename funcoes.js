// Aqui, eu iniciei buscando os dados da lista de persongens do hp-api
async function buscarPersonagem() {
  const response = await fetch("https://hp-api.onrender.com/api/characters");
  const personagens = await response.json();
  console.log(personagens);
}

// Aqui, iniciei uma função em que todos os personagens da lista aparecerem no quadro da página e as suas descrição.
buscarPersonagem();

let personagens = [];
let indexAtual = 0;

//listei todos os persomagems
async function carregarPersonagens() {
  const response = await fetch("https://hp-api.onrender.com/api/characters");
  const personagens = await response.json();
}

// as imagens e descrições aparecem na página
function mostrarPersonagem(index) {
  const p = personagens[index];
  if (!p) return;

  // Elementos que aparecem nas caixinhas dos inputs
  document.getElementById("campo1").value = p.name;
  document.getElementById("campo2").value = p.species;
  document.getElementById("campo3").value = p.house;
  document.getElementById("campo4").value = p.actor;
  document.getElementById("imgPersonagem").src = p.image;
}
