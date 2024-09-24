
const Main = { 
   
    init: function() { 
        this.cacheSelectors() 
        this.bindEvents()
    },

    cacheSelectors: function() {
      this.$checkButtons = document.querySelectorAll('.check')
      this.$inputTask = document.querySelector('#input_task')
      this.$list = document.querySelector('#list')
      this.$removeButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function() {
        const self = this

        this.$checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button_remove){
            button_remove.onclick = self.Events.removeButton_click
        })
    },

    Events : {
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
               this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                            ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
               `
                e.target.value = ''

                this.cacheSelectors() //executa o cacheSelectors novamente pois o inner HTML substitui toda a ul
                this.bindEvents() //executa o bindEvents novamente pois o inner HTML substitui toda a ul
            }
        },

        removeButton_click: function(e) {
            let li = e.target.parentElement

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

