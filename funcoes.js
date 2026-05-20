let personagens = [];
let indexAtual = 0;

async function carregarPersonagens() {
  const response = await fetch("https://hp-api.onrender.com/api/characters");
  personagens = await response.json();
}
function mostrarPersonagem(index) {
  const p = personagens[index];
  if (!p) return;

  document.getElementById("campo1").value = p.name;
  document.getElementById("campo2").value = p.name;
  document.getElementById("campo3").value = p.name;
  document.getElementById("campo4").value = p.name;
  document.getElementById("imgPersonagem").src = p.image;
}

document.getElementById("btnBuscar").addEventListener("click", () => {
  const busca = document.getElementById("campoBusca").value.toLowerCase();
  const encontrado = personagens.findIndex((p) =>
    p.name.toLowerCase().includes(busca),
  );

  if (encontrado !== -1) {
    indexAtual = encontrado;
    mostrarPersonagem(indexAtual);
  } else {
    alert("Persongem não encontrado!");
  }
});

document.getElementById("btnVoltar").addEventListener("click", () => {
  if (indexAtual > 0) {
    indexAtual--;
    mostrarPersonagem(indexAtual);
  }
});

document.getElementById("btnAvancar").addEventListener("click", () => {
  if (indexAtual < personagens.length - 1) {
    indexAtual++;
    mostrarPersonagem(indexAtual);
  }
});

carregarPersonagens();
