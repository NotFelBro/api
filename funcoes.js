let personagens = [];
let indexAtual = 0;

async function carregarPersonagens() {
  const response = await fetch("https://hp-api.onrender.com/api/characters");
  personagens = await response.json();
  mostrarPersonagem(indexAtual);
}

function mostrarPersonagem(index) {
  const p = personagens[index];
  if (!p) return;

  document.getElementById("quadro1").value = p.name;
  document.getElementById("quadro2").value = p.name;
  document.getElementById("quadro3").value = p.name;
  document.getElementById("quadro4").value = p.name;
  document.getElementById("imagePersonagem").src = p.image;
}
const inputB = document.getElementById("quadroB");

document.getElementById("btnB").addEventListener("click", () => {
  const busca = document.getElementById("quadroB").value.toLowerCase();
  const encontrado = personagens.findIndex((p) =>
    p.name.toLowerCase().includes(busca),
  );

  if (encontrado !== -1) {
    inputB.placeholder = "Digite o nome do personagem.";
    inputB.style.color = "";
    indexAtual = encontrado;
    mostrarPersonagem(indexAtual);
  } else {
    inputB.value = "";
    inputB.placeholder = "Personagem inexistente.";
    inputB.color = "red";
  }
});
document.getElementById("quadroB").addEventListener("input", () => {
  inputB.placeholder = "Digite o nome do personagem";
  inputB.style.color = "";
});

document.getElementById("btnV").addEventListener("click", () => {
  if (indexAtual > 0) {
    indexAtual--;
    mostrarPersonagem(indexAtual);
  }
});

document.getElementById("btnA").addEventListener("click", () => {
  if (indexAtual < personagens.length - 1) {
    indexAtual++;
    mostrarPersonagem(indexAtual);
  }
});

carregarPersonagens();
