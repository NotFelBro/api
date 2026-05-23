let personagens = [];
let indexAtual = 0;

async function carregarPersonagens() {
  try {
    const response = await fetch("https://hp-api.onrender.com/api/characters");
    if (!response.ok) {
      throw new Error(
        `Erro ${response.status} - Falha ao carregar personagens.`,
      );
    }
    personagens = await response.json();
    mostrarPersonagem(indexAtual);
  } catch (error) {
    console.error("Erro na API:", error.message);
    imagePersonagem.src = imagemErro;
  }
}

function mostrarPersonagem(index) {
  const p = personagens[index];
  if (!p) return;

  document.getElementById("quadro1").value = p.name;
  document.getElementById("quadro2").value = p.name;
  document.getElementById("quadro3").value = p.name;
  document.getElementById("quadro4").value = p.name;

  if (!p.image) {
    console.warn(`Peronsagem "${p.name}" não possui imagem.`);
  }

  document.getElementById("imagePersonagem").src = p.image || imagemErro;
}

const inputB = document.getElementById("quadroB");
const imagePersonagem = document.getElementById("imagePersonagem");
const imagemErro = "./erro.avif";

document.getElementById("btnB").addEventListener("click", () => {
  const busca = inputB.value.toLowerCase();

  if (busca === "") {
    inputB.placeholder = "Digite algo antes de buscar.";
    inputB.classList.add("erro");
    imagePersonagem.src = imagemErro;
    return;
  }

  try {
    const encontrado = personagens.findIndex((p) =>
      p.name.toLowerCase().includes(busca),
    );

    if (encontrado === -1) {
      throw new Error(`Personagem "${busca}" não encontrado.`);
    }

    inputB.placeholder = "Digite o nome do personagem.";
    inputB.classList.remove("erro");
    indexAtual = encontrado;
    mostrarPersonagem(indexAtual);
  } catch (error) {
    console.error("Erro na busca:", error.message);
    inputB.value = "";
    inputB.placeholder = "Personagem inexistente.";
    inputB.classList.add("erro");
    imagePersonagem.src = imagemErro;
  }
});

document.getElementById("quadroB").addEventListener("input", () => {
  inputB.placeholder = "Digite o nome do personagem";
  inputB.classList.remove("erro");
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
