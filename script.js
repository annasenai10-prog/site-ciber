const perguntasIniciais = [
    {
        pergunta: "O que é phishing?",
        alternativas: [
            "Um golpe que tenta roubar informações por meio de mensagens falsas.",
            "Um programa que melhora a velocidade da internet.",
            "Uma ferramenta para proteger arquivos.",
            "Um sistema de atualização automática.",
            "Um tipo de conexão sem fio."
        ],
        correta: 0,
        explicacao: "O phishing utiliza mensagens ou páginas falsas para enganar pessoas e obter dados, como senhas e informações bancárias."
    },
    {
        pergunta: "Qual é a principal característica de um ransomware?",
        alternativas: [
            "Aumentar a velocidade do computador.",
            "Bloquear ou criptografar arquivos e exigir pagamento.",
            "Organizar os arquivos do usuário.",
            "Atualizar o sistema operacional.",
            "Remover anúncios de páginas."
        ],
        correta: 1,
        explicacao: "O ransomware bloqueia o acesso aos arquivos ou os criptografa e exige um pagamento para tentar liberá-los."
    },
    {
        pergunta: "Como a inteligência artificial pode ser usada em golpes digitais?",
        alternativas: [
            "Somente para criar jogos.",
            "Apenas para consertar computadores.",
            "Para impedir automaticamente todos os ataques.",
            "Para produzir mensagens falsas mais convincentes e imitar vozes.",
            "Para substituir a conexão com a internet."
        ],
        correta: 3,
        explicacao: "Criminosos podem utilizar IA para criar mensagens fraudulentas, imitar vozes e produzir conteúdos falsos."
    },
    {
        pergunta: "Qual atitude ajuda a proteger uma conta online?",
        alternativas: [
            "Compartilhar a senha com amigos.",
            "Usar a mesma senha em todos os sites.",
            "Desativar todas as atualizações.",
            "Clicar em qualquer link recebido.",
            "Ativar a autenticação em duas etapas."
        ],
        correta: 4,
        explicacao: "A autenticação em duas etapas adiciona uma camada extra de proteção além da senha."
    },
    {
        pergunta: "O que é um malware?",
        alternativas: [
            "Um programa malicioso que pode prejudicar dispositivos ou roubar dados.",
            "Um aplicativo oficial de mensagens.",
            "Um equipamento de rede.",
            "Um sistema de armazenamento em nuvem.",
            "Um método de carregamento de bateria."
        ],
        correta: 0,
        explicacao: "Malware é o nome geral dado a softwares maliciosos, como vírus, spyware e ransomware."
    },
    {
        pergunta: "Qual é a função de um firewall?",
        alternativas: [
            "Criar cópias de fotos.",
            "Aumentar o espaço do disco.",
            "Monitorar e controlar o tráfego de rede conforme regras de segurança.",
            "Criar senhas automaticamente para todas as contas.",
            "Eliminar a necessidade de antivírus."
        ],
        correta: 2,
        explicacao: "O firewall monitora e controla conexões de rede com base em regras de segurança."
    },
    {
        pergunta: "Por que é importante manter os programas atualizados?",
        alternativas: [
            "Para deixar as senhas visíveis.",
            "Para corrigir falhas e vulnerabilidades de segurança.",
            "Para permitir qualquer acesso ao dispositivo.",
            "Para desativar as proteções.",
            "Para compartilhar dados automaticamente."
        ],
        correta: 1,
        explicacao: "Atualizações frequentemente corrigem falhas que poderiam ser exploradas por criminosos."
    },
    {
        pergunta: "O que é engenharia social?",
        alternativas: [
            "Uma técnica de montagem de computadores.",
            "Um tipo de antivírus.",
            "Um sistema de criptografia.",
            "Uma técnica de manipulação de pessoas para obter informações ou acesso.",
            "Um método de aumentar a velocidade da rede."
        ],
        correta: 3,
        explicacao: "A engenharia social explora a confiança, o medo ou a distração das pessoas para conseguir informações ou acesso."
    },
    {
        pergunta: "Qual é um exemplo de autenticação em duas etapas?",
        alternativas: [
            "Usar somente o nome de usuário.",
            "Repetir a mesma senha duas vezes.",
            "Desligar o antivírus.",
            "Salvar a senha em uma mensagem pública.",
            "Informar a senha e confirmar o acesso com um código adicional."
        ],
        correta: 4,
        explicacao: "Além da senha, a conta solicita uma segunda confirmação, como um código ou aprovação no celular."
    },
    {
        pergunta: "O que uma cópia de segurança (backup) permite fazer?",
        alternativas: [
            "Recuperar dados caso os arquivos originais sejam perdidos ou danificados.",
            "Impedir qualquer golpe na internet.",
            "Aumentar a velocidade de todos os aplicativos.",
            "Eliminar a necessidade de senhas.",
            "Bloquear todas as mensagens recebidas."
        ],
        correta: 0,
        explicacao: "O backup mantém uma cópia dos dados que pode ajudar na recuperação após perdas, danos ou ataques."
    }
];

const CHAVE_QUIZ = "cyberguard_perguntas";

function carregarPerguntas() {
    try {
        const salvas = JSON.parse(localStorage.getItem(CHAVE_QUIZ));
        return Array.isArray(salvas) && salvas.length
            ? salvas
            : perguntasIniciais;
    } catch {
        return perguntasIniciais;
    }
}

let perguntas = carregarPerguntas();
let indice = 0;
let pontos = 0;
let respondida = false;

const elementoPergunta = document.getElementById("question");

if (elementoPergunta) {
    const respostas = document.getElementById("answers");
    const numero = document.getElementById("question-number");
    const pontuacao = document.getElementById("score");
    const feedback = document.getElementById("feedback");
    const progresso = document.getElementById("progress-bar");
    const proximo = document.getElementById("next-button");
    const resultado = document.getElementById("result");
    const finalScore = document.getElementById("final-score");
    const finalMessage = document.getElementById("final-message");
    const reiniciar = document.getElementById("restart-button");

    function mostrarPergunta() {
        if (indice >= perguntas.length) {
            finalizarQuiz();
            return;
        }

        respondida = false;

        const atual = perguntas[indice];

        elementoPergunta.textContent = atual.pergunta;
        numero.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
        pontuacao.textContent = `Pontos: ${pontos}`;
        feedback.textContent = "";
        proximo.hidden = true;

        respostas.innerHTML = "";

        progresso.style.width =
            `${(indice / perguntas.length) * 100}%`;

        atual.alternativas.forEach((alternativa, i) => {
            const botao = document.createElement("button");

            botao.className = "answer";
            botao.textContent = `${String.fromCharCode(65 + i)}. ${alternativa}`;

            botao.addEventListener("click", () => verificarResposta(i));

            respostas.appendChild(botao);
        });
    }

    function verificarResposta(escolha) {
        if (respondida) return;

        respondida = true;

        const atual = perguntas[indice];
        const botoes = respostas.querySelectorAll("button");

        botoes.forEach((botao, i) => {
            botao.disabled = true;

            if (i === atual.correta) {
                botao.classList.add("correct");
            }

            if (i === escolha && escolha !== atual.correta) {
                botao.classList.add("wrong");
            }
        });

        if (escolha === atual.correta) {
            pontos++;
            feedback.textContent = "Você acertou! " + atual.explicacao;
        } else {
            feedback.textContent =
                "Não foi dessa vez. " + atual.explicacao;
        }

        pontuacao.textContent = `Pontos: ${pontos}`;
        proximo.hidden = false;
        proximo.textContent =
            indice === perguntas.length - 1
                ? "Ver resultado"
                : "Próxima pergunta";
    }

    function finalizarQuiz() {
        elementoPergunta.hidden = true;
        respostas.hidden = true;
        feedback.hidden = true;
        proximo.hidden = true;
        resultado.hidden = false;

        progresso.style.width = "100%";

        finalScore.textContent =
            `Você acertou ${pontos} de ${perguntas.length} perguntas!`;

        const porcentagem = (pontos / perguntas.length) * 100;

        if (porcentagem === 100) {
            finalMessage.textContent = "Excelente! Você domina o assunto!";
        } else if (porcentagem >= 70) {
            finalMessage.textContent = "Muito bem! Você conhece bastante sobre segurança digital.";
        } else if (porcentagem >= 40) {
            finalMessage.textContent = "Bom começo! Continue estudando para aprender ainda mais.";
        } else {
            finalMessage.textContent = "Continue aprendendo! Conhecimento é uma forma de proteção.";
        }
    }

    function iniciarNovamente() {
        perguntas = carregarPerguntas();
        indice = 0;
        pontos = 0;

        elementoPergunta.hidden = false;
        respostas.hidden = false;
        feedback.hidden = false;
        resultado.hidden = true;

        mostrarPergunta();
    }

    proximo.addEventListener("click", () => {
        indice++;
        mostrarPergunta();
    });

    reiniciar.addEventListener("click", iniciarNovamente);

    mostrarPergunta();
}