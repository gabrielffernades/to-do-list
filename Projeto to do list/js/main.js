
const Main = { 
    
    tasks: [],

    init: function() {  //função que inicializa a aplicacao
        this.cacheSelectors() 
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
    },
    
    cacheSelectors: function() { //armazena referencias do html
      this.$checkButtons = document.querySelectorAll('.check')
      this.$inputTask = document.querySelector('#input_task')
      this.$list = document.querySelector('#list')
      this.$removeButtons = document.querySelectorAll('.remove')
    },
    //**************************************** */
    bindEvents: function() { // associa eventos aos elementos da pagina
        const self = this //preserva o contexto correto do this

        this.$checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button_remove){
            button_remove.onclick = self.Events.removeButton_click.bind(self)
        })
    },

    getStoraged : function() {
        const tasks = localStorage.getItem('tasks')

        if (tasks) {
            this.tasks = JSON.parse(tasks)
        } else {
            localStorage.setItem('tasks', JSON.stringify([]))
        }
      
    },

    getTaskHtml: function(task) {
        return`
            <li>
                <div class="check"></div>
                <label class="task">
                    ${task}
                </label>
                <button class="remove" data-task = '${task}'></button>
            </li>
        `;
    },

    buildTasks: function() {
        let html = ''
        this.tasks.forEach(item => {
            html += this.getTaskHtml(item.task)
        })

        this.$list.innerHTML = html

        this.cacheSelectors()
        this.bindEvents()
    },
     //*********************EVENTS***********************************************/
    Events : { //eventos
        checkButton_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if(!isDone) {  // return serve para que caso isDone = true a execução para por ai
               return li.classList.add('done')
            } 
                li.classList.remove('done')
        },

        inputTask_keypress: function(e) {
            const key = e.key //armazena a tecla que foi pressionada
            const value = e.target.value //armazena o texto do input no qual o usuario digitou 

            if(key === 'Enter') {
               this.$list.innerHTML += this.getTaskHtml(value)

                e.target.value = ''

                this.cacheSelectors() //executa o cacheSelectors novamente pois o inner HTML substitui toda a ul
                this.bindEvents() //executa o bindEvents novamente pois o inner HTML substitui toda a ul

                const savedTasks = localStorage.getItem("tasks")
                const savedTasksObj = JSON.parse(savedTasks)

                const obj = [
                    {task: value},
                    ...savedTasksObj, 
                ]


                localStorage.setItem('tasks', JSON.stringify(obj))
            }
        },

        removeButton_click: function(e) {
            const li = e.target.parentElement
            const value = e.target.dataset['task']

            const newTasksState = this.tasks.filter(item => item.task !== value)  

            localStorage.setItem('tasks', JSON.stringify(newTasksState))

            li.classList.add('removed')

            setTimeout(function() {
                li.classList.add('hidden')
            }, 300)
        }
    }
}

Main.init()

//const = Main - objeto principal da aplicação  por isso está em letra maiuscula

// dentro desse objeto principal pode ser passado uma função que para aplicar ela = Main.init()

//this indica que o init procure o cacheSelectors na tag pai do this que nesse caso é a const Main

// init é o inicio 

// cacheSelectors é uma variavel que vai ser responsavel por  selecionar e armazenar os elementos que vem do html

// bindEvents = conectar os eventos. é uma variavel que vai ser responsavel por adicionar os eventos nos elemementos html que o cacheSelectors armazenou

// Events = responsavel por armazenar as funções responsaveis pelos eventos

// boa pratica sempre dar um console.log no this para ver quem é ele naquele contexto

// o $ antes das variaveis vindas do html é uma boa prática

