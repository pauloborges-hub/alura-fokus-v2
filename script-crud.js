// encontrar o botão adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');

const tarefas = [];

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