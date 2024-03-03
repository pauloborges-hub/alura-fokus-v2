// encontrar o botão adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description'); // pega classe que joga o elemento da lista de tarefas no campo #em andamento

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas'); //referência para o botão "remover tarefas concluídas"

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function limpaFormulario() {
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
}

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// recebe uma tarefa como parâmetro e devolve código HTML para a página
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');                    // cria um list item HTML
    li.classList.add('app__section-task-list-item');            // adiciona 'app__section-task-list-item' a lista de classes de li

    const svg = document.createElement('svg');                  // cria um scalable vector graphics HTML
    svg.innerHTML = `                                           
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `

    const paragrafo = document.createElement('p');              // cria um parágrafo HTML
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        // debugger -> debug do prompt de atualizar tarefa
        const novaDescricao = prompt('Qual o novo nome da tarefa?');
        if(novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');       // define um atributo HTML 
    botao.append(imagemBotao);                                  // aninha a tag <img> dentro da tag <botao>

    // aninha os elementos abaixo dentro da tag <li>
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if(tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    } else {
        // evento onclick, sempre que um elemento da lista de tarefas é clicado entra no evento
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach((elemento) => {
                    elemento.classList.remove('app__section-task-list-item-active');
                })
    
            if(tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return; // early return
            }
            
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;    // Coloca o conteúdo de texto da tarefa clicada dentro do campo #em andamento
            li.classList.add('app__section-task-list-item-active');     // Usa a classe CSS que pinta a borda do botão quando a tarefa está ativa
        }
    }
    return li;
}

// cancela a adição de uma tarefa nova e esconde o formulário
btnCancelar.addEventListener('click', () => {
    limpaFormulario();
})

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');             // coloca um toggle no botão de adicionar nova tarefa (mostra/esconde formulário)
});

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();                                    // impede o comportamento padrão do evento (recarregar a página)
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();                                         // transforma o objeto em string e guarda no localStorage
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

tarefas.forEach((tarefa) => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    }
});

// quando ocorrer evento de clique no botão "remover tarefas concluídas", entra na função
btnRemoverConcluidas.onclick = () => {
    const seletor = ".app__section-task-list-item-complete"; // seletor CSS de tarefas concluídas
    // remove cada elemento por completo da NodeList de tarefas concluídas
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
    tarefas = tarefas.filter(tarefa => !tarefa.completa); // joga para dentro da variável "tarefas" apenas as tarefas que ainda não foram concluídas
    atualizarTarefas(); 
}