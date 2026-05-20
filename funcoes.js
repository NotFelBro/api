let personagens = [];
let indexAtual = 0;

async function carregarPersonagens() {
  const response = await fetch("https://hp-api.onrender.com/api/characters");
  personagens = await response.json();
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

document.getElementById("btnB").addEventListener("click", () => {
  const busca = document.getElementById("quadroB").value.toLowerCase();
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
