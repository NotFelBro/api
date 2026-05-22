let personagens = [];
let indexAtual = 0;

async function carregarPersonagens() {
  try {
    const response = await fetch("https://hp-api.onrender.com/api/characters");

    if (response.status === 404) {
      throw new Error("404 - Personagem não encontrado.");
    }
    if (response.status === 500) {
      throw new Error("500 - Falha no servidor.");
    }

    personagens = await response.json();
    mostrarPersonagem(indexAtual);
  } catch (error) {
    const divErro = document.createElement("div");
    divErro.textContent = error.message;
    divErro.style.color = "red";
    divErro.style.fontWeight = "bold";
    document.body.appendChild(divErro);
  }
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

  const erroExistente = document.getElementById("divErro");
  if (erroExistente) erroExistente.remove();

  if (encontrado !== -1) {
    indexAtual = encontrado;
    mostrarPersonagem(indexAtual);
  } else {
    const erro = new Error("404 - Personagem não econtrado.");
    console.log(erro.message);

    const divErro = document.createElement("div");
    divErro.id = "DivErro";
    divErro = textContent = erro.message;
    divErro.style.color = "red";
    divErro.style.fontWeight = "bold";
    document.body.appendChild(divErro);
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
