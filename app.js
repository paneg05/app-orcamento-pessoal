

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
        headerTitle.innerHTML='sucesso na insrção dos dados !!'
        let modalBody = document.getElementById('modal-body')
        modalBody.className="modal-body"
        modalBody.innerHTML='Dados inseridos com sucesso !!!'
        let button= document.getElementById('button')
        button.className='btn btn-success'
        button.innerHTML='Voltar'

        $('#registraDespesa').modal('show') // exibindo modal de maneira programatica por meio da biblioteca jquerry

        
        
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




