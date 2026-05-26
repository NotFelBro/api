let personagens = []; //armazenar meus personagens

let indexAtual = -1; //indice para não mostrar o harry de inicio

async function carregarPersonagens() {
  //essa função é pra buscar os personagens

  try {
    //essa estrutura pra tratar erros é para identificar possíveis erros

    const response = await fetch("https://hp-api.onrender.com/api/characters"); // fiz uma requisição para chamar TODOS da lista array

    if (!response.ok) {
      //se der 200 tipo, "sucesso"

      throw new Error(
        `Erro ${response.status} - Falha ao carregar personagens.`,
      ); // se aconecer alguma coisa, ele manda o erro no console
    }

    personagens = await response.json(); // ele faz conversão da array e salva
  } catch (error) {
    // pega qualquer erro

    console.error("Erro na API:", error.message); // mostra o erro no terminal

    imagePersonagem.src = imagemErro; // mostra a imagem de erro
  }
}

function mostrarPersonagem(index) {
  // função de mostra o personagem na página

  const p = personagens[index]; // pega as informações dos personagens

  if (!p) return; // retorna caso não houver informações

  document.getElementById("quadro1").value = p.name || "Desconhecido"; // nome
  document.getElementById("quadro2").value = p.species || "Desconhecido"; //espécie
  document.getElementById("quadro3").value = p.house || "Sem casa"; //casa
  document.getElementById("quadro4").value = p.actor || "Desconhecido"; //ator

  if (!p.image) {
    //informação de imagem
    console.warn(`Peronsagem "${p.name}" não possui imagem.`); //um alarme vai aparecer no console, caso o personagem não tenha imagem
  }

  document.getElementById("imagePersonagem").src = p.image || imagemErro; // um elemento que mostra a imagem do personagem e se o personagem não tiver imagem, aparece aimagem de erro no lugar
}

const inputB = document.getElementById("quadroB"); // fiz uma const que o input tenha ações dentro do campo "quadroB" o campo de pesquisa

const imagePersonagem = document.getElementById("imagePersonagem"); // coloquei um elemento da imagem de erro

const imagemErro = "./img/erro.avif"; // coloquei a imagem de erro

document.getElementById("btnB").addEventListener("click", () => {
  const busca = inputB.value.toLowerCase(); // fiz uma ação pro botão de busca em relação ao inputB(quadroB)

  if (busca === "") {
    // se o campo do quadroB estiver vazio

    inputB.placeholder = "Digite algo antes de buscar."; // mostra uma mensagem de aviso

    inputB.classList.add("erro"); // uma classe do input (estilizei no css) para adicionar um metodo de erro

    imagePersonagem.src = imagemErro; // lança a imagem de erro

    return; // retorna a imagem se o usuário tentar clicar no botão sem digitar
  }

  try {
    // aqui também tem uma estrutura de erro

    const encontrado = personagens.findIndex(
      (
        p, // uma ação para mostrar as descrições dos personagens puxadas do arry
      ) => p.name.toLowerCase().includes(busca),
    );

    if (encontrado === -1) {
      throw new Error(`Personagem "${busca}" não encontrado.`); // se o usuário escrever qualquer bobeira, vai avisar no console
    }

    inputB.placeholder = "Digite o nome do personagem."; // um aviso no inputB(quadroB)

    inputB.classList.remove("erro"); // adiciona o metodo para remoção do erro quando o usuário digitar certo

    indexAtual = encontrado;
    mostrarPersonagem(indexAtual); // mostra na página quando encontrado
  } catch (error) {
    // capturar qualquer erro que aparecer
    console.error("Erro na busca:", error.message); // manda uma mensagem de erro no console

    inputB.value = ""; // valor no campo vazio

    inputB.placeholder = "Personagem inexistente."; // dentro do inputB(quadroB) aparece a mensagem de aviso

    inputB.classList.add("erro"); // adiciona o metodo de erro

    imagePersonagem.src = imagemErro; // aparece a imagem de erro no lugar
  }
});

document.getElementById("quadroB").addEventListener("input", () => {
  // elemento do quadroB sem o inputB

  inputB.placeholder = "Digite o nome do personagem"; // um aviso dentro do campo do quadroB

  inputB.classList.remove("erro"); // remoção do método até o usuário escrever coisa nada haver
});

document.getElementById("btnV").addEventListener("click", () => {
  // elemento btnV(botão de voltar), foi adicionado um evento para ele voltar para a imagem anterior

  if (indexAtual > 0) {
    // o usuário só retorna até o personagem 0 "harry potter"

    indexAtual--; // retomada

    mostrarPersonagem(indexAtual); //mostra o personagem
  }
});

document.getElementById("btnA").addEventListener("click", () => {
  // elemento btnA(botão de avançar), foi adicionado um evento para ele avançar para a próxima imagem

  if (indexAtual < personagens.length - 1) {
    // seleciona o próximo da lista da array

    indexAtual++; // avança

    mostrarPersonagem(indexAtual); // mostra o personagem
  }
});

carregarPersonagens(); // carrega o personagem no quadro da imagem
