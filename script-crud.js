// encontrar o botão adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');

const tarefas = [];

// recebe uma tarefa como parâmetro e devolve código HTML para a página
function adicionarElementoTarefa(tarefa) {
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

    const botao = document.createElement('button');
    const imagemBotao = document.createElement('img');

    imagemBotao.setAttribute('src', '/imagens/edit.png');       // define um atributo HTML 
    botao.append(imagemBotao);                                  // aninha a tag <img> dentro da tag <botao>

    // aninha os elementos abaixo dentro da tag <li>
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');             // coloca um toggle no botão de adicionar nova tarefa (mostra/esconde formulário)
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();                                    // impede o comportamento padrão do evento (recarregar a página)
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));   // transforma o objeto em string e guarda no localStorage
})