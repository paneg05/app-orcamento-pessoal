

class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validadarDados(){
        for( let i in this){
            if(this[i] == undefined||this[i] == ''||this[i] == null){
                return false
            }
        }
        return true
    }
}


class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if (id=== null){
            localStorage.setItem('id',0)
        }
    }
    
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        
        return parseInt(proximoId)+1
        
    }
    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id,JSON.stringify(d)) //converte o objeto em documento json, em seguida armazena em localStorage
        localStorage.setItem('id',id)
        
    
    }

    recuperarTodosRegistros(){
        // array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recupera todas despesas cadastradas em localstorage
        for(let i = 1;i<=id;i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            //existe possibilidade de haver indices que foram removidos
            if(despesa==null){
                continue
            }
            despesas.push(despesa)
        }
        return despesas
    }

}

let bd = new Bd()




function cadastrarDespesa(){

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    

    let despesa =new Despesa(

        ano.value, 
        mes.value,
        dia.value,
        tipo.value,
        descricao.value, 
        valor.value

    )
    if(despesa.validadarDados()){
        bd.gravar(despesa)

        let headerTitle = document.getElementById('exampleModalLongTitle')
        headerTitle.className="modal-title text-success"
        headerTitle.innerHTML='sucesso na inserção dos dados !!'
        let modalBody = document.getElementById('modal-body')
        modalBody.className="modal-body"
        modalBody.innerHTML='Dados inseridos com sucesso !!!'
        let button= document.getElementById('button')
        button.className='btn btn-success'
        button.innerHTML='Voltar'

        $('#registraDespesa').modal('show') // exibindo modal de maneira programatica por meio da biblioteca jquerry

        // limpando formulario

        ano.value=''
        mes.value=''
        dia.value=''
        tipo.value=''
        descricao.value='' 
        valor.value=''
        
        
    }else{

        let headerTitle = document.getElementById('exampleModalLongTitle')
        headerTitle.className="modal-title text-danger"
        headerTitle.innerHTML='Erro na gravação dos dados'
        let modalBody = document.getElementById('modal-body')
        modalBody.className="modal-body"
        modalBody.innerHTML='Existem campos obrigatórios que não foram preenchidos !!!'
        let button= document.getElementById('button')
        button.className='btn btn-danger'
        button.innerHTML='Voltar e corrigir'


        $('#registraDespesa').modal('show') // exibindo modal de maneira programatica por meio da biblioteca jquerry
        
    }
    
    
}


function carregaListaDespesas() {

    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()

    let listaDespesas = document.getElementById('listaDespesas')

    //percorrer o array despesas, listando cada despesa de forma dinâmica

    despesas.forEach(function(d){

        // criando a linha (tr)
        let linha = listaDespesas.insertRow()
        //criar a colunas
        linha.insertCell(0).innerHTML=`${d.dia}/${d.mes}/${d.ano}`

        switch(d.tipo){
            case '1':
                d.tipo ='Alimentação'
                break
            case '2':
                d.tipo = 'Educação'
                break
            case '3':
                d.tipo = 'Lazer'
                break
            case '4':
                d.tipo = 'Saúde'
                break
            case '5':
                d.tipo = 'Transporte'
                break
            

        }
        
        linha.insertCell(1).innerHTML=`${d.tipo}`
        linha.insertCell(2).innerHTML=`${d.descricao}`
        linha.insertCell(3).innerHTML=`${d.valor}`
    })



}




