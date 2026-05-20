let personagens = [];
let indexAtual = 0;

// Aqui na função, vai ser listado todos os personagens listados no link
async function carregarPersonagens() {
  const response = await fetch("https://hp-api.onrender.com/api/characters");
  personagens = await response.json(); // sem "const" para salvar no array externo
}

// Aqui, as informações dos personagens vai aparecer no input (os dados) e a imagem vai aparecer no bloco
function mostrarPersonagem(index) {
  const p = personagens[index];
  if (!p) return;

  document.getElementById("campo1").value = p.name;
  document.getElementById("campo2").value = p.species;
  document.getElementById("campo3").value = p.house;
  document.getElementById("campo4").value = p.actor;
  document.getElementById("imgPersonagem").src = p.image;
}

// Adicionado a função de buscar os personagens pelo nome apenas, escrevendo no campo de busca, e o botão vai buscar o nome pela lista e carregar as informações de acordo com os campos(inputs).
document.getElementById("btnBuscar").addEventListener("click", () => {
  const busca = document.getElementById("campoBusca").value.toLowerCase();
  // caso encontre o personagem
  const encontrado = personagens.findIndex((p) =>
    p.name.toLowerCase().includes(busca),
  );

  if (encontrado !== -1) {
    indexAtual = encontrado;
    mostrarPersonagem(indexAtual);
  } else {
    alert("Personagem não encontrado!"); // caso não encontrado
  }
});

// ação do botão de voltar para o personagem anterior
document.getElementById("btnVoltar").addEventListener("click", () => {
  if (indexAtual > 0) {
    indexAtual--;
    mostrarPersonagem(indexAtual);
  }
});

// o mesmo de cima, porém ele avança para o próximo personagem
document.getElementById("btnAvancar").addEventListener("click", () => {
  if (indexAtual < personagens.length - 1) {
    indexAtual++;
    mostrarPersonagem(indexAtual);
  }
});

// Carrega os personagens
carregarPersonagens();
