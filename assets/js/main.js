const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

function criaTarefa(texto) {
    const li = document.createElement("li");
    li.innerText = texto;
    tarefas.appendChild(li);
    limpaInput();
    criaBtnApagar(li);
    salvarTarefas();
    return li;
}

inputTarefa.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput() {
    inputTarefa.value = "";
    inputTarefa.focus();
}

function criaBtnApagar(li) {

    const botaoApagar = document.createElement("button");
    botaoApagar.setAttribute("class", "apagar");
    
    const iconeLixeira = document.createElement("i");
    iconeLixeira.setAttribute("class", "fa-solid fa-trash");
    
    botaoApagar.appendChild(iconeLixeira);
    li.appendChild(botaoApagar);
}

btnTarefa.addEventListener("click", function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value); 
});

document.addEventListener("click", function(e) {
    const el = e.target;
    if (el.classList.contains("apagar") || el.parentElement.classList.contains("apagar")) {
        const li = el.closest("li");
        if(li) li.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll("li");
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.firstChild.nodeValue.trim();
        listaDeTarefas.push(tarefaTexto);
    }
    
    localStorage.setItem("tarefas", JSON.stringify(listaDeTarefas));
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem("tarefas");
    const listaDeTarefas = JSON.parse(tarefas) || [];

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

addTarefasSalvas();
