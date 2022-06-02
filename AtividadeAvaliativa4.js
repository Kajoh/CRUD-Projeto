//cria vetor dos objetos de produtos
let produtosVetor = []

//cria objeto de produtos
let produtoObjeto = {}

//cria variável para deletar elementos do array
let Deletados = []

//cria variável de lista para listar os produtos
let lista = ""

//cria uma varíavel que armazena o índice do vetor para comparação
let indice = 0

let Registro = 0

//cria variáveis que recebem valores do  HTML
let produtoHTML = document.getElementById("produto")
let valorHTML = document.getElementById("valor")
let MarcaHTML = document.getElementById("Marca")
let produtoAlterarHTML = document.getElementById("produtoAlterar")
let produtoAlterarMarcaHTML = document.getElementById("produtoAlterarMarca")
let produtoAlteradoHTML = document.getElementById("produtoAlterado")
let valorAlteradoHTML = document.getElementById("valorAlterado")
let marcaAlteradaHTML = document.getElementById("marcaAlterada")
let produtoDeletarHTML = document.getElementById("produtoDeletar")
let produtoDeletarMarcaHTML = document.getElementById("produtoDeletarMarca")

let produtoAlterar
let produtoAlterarMarca
let produtoAlterado
let valorAlterado
let marcaAlterada
let produtoDeletar
let produtoDeletarMarca

//cria função para listar os produtos
function listarProduto(){

    //retira do localStorage e transforma novamente em variável o vetor de produtos
    produtosVetor = JSON.parse(localStorage.getItem("produtosLoja"))

    if(produtosVetor == null){

        produtosVetor = []
    }
    //cria um código de repetição que dura pelo tamanho do vetor de produtos
    for(i=0; i<produtosVetor.length; i++ ){

        //variável de lista recebe os nomes dos produtos para cada posição do vetor e um elemento HTML para quebrar a linha fazendo com que a lista fique horizontal no HTML
        lista += `Produto ${[i+1]}: ${produtosVetor[i].Produto} <br>`
    }

    //div feita para a lista dentro do HTML recebe os elementos listados pela variável lista
    document.getElementById("alterarDiv").innerHTML = lista

    //devolve o vetor ao localStorage com os valores atualizados
    localStorage.setItem("produtosLoja", JSON.stringify(produtosVetor))

    
}

//transforma a div dentro do HTML em inputs para receber as variaveis
function alterarHTML(){

    document.getElementById("alterarDiv").innerHTML = `<br><br>\n
    <label> Qual Produto à ser alterado?</label> <br>\n    
    <input class="inputs" id="produtoAlterar" placeholder="Produto"></input> <br>\n
    <input class="inputs" id="produtoAlterarMarca" placeholder="Marca"></input> <br>\n
    <button class="buttons" onclick="alteracao()">Alterar</button>`

    produtoAlterarHTML = document.getElementById("produtoAlterar")
    produtoAlterarMarcaHTML = document.getElementById("produtoAlterarMarca")

}

//cria função para alterar um produto
function alteracao(){

    produtoAlterar = produtoAlterarHTML.value
    produtoAlterarMarca = produtoAlterarMarcaHTML.value

    //retira do localStorage e transforma novamente em variável o vetor de produtos
    produtosVetor = JSON.parse(localStorage.getItem("produtosLoja"))

    if(produtosVetor == null){

        produtosVetor = []
    }
    
    //pelo tamanho do vetor, indentifica qual objeto tem o produto desejado
    for(i=0; i<produtosVetor.length; i++){

        if(produtosVetor[i].Produto == produtoAlterar){
  
            //identifica se esse produto é da Marca registrada ou não
            if(produtosVetor[i].Marca == produtoAlterarMarca){

            //variável de índice recebe o valor do índice do produto em questão, se o produto for o desejado
            indice = i
            Registro = 1

            }
        }
    }

    if(Registro == 1){
       
        document.getElementById("alterarDiv").innerHTML =  `<label> Alteração:</label> <br>\n    
        <input class="inputs" id="produtoAlterado" placeholder="Produto"></input> <br>\n
        <input class="inputs" id="valorAlterado" placeholder="valor"></input> <br>\n
        <input class="inputs" id="marcaAlterada" placeholder="Marca"></input><br>\n
        <button class="buttons" onclick="alterarProduto()">Alterar</button>`

    }
    //caso não seja encontrado o produto, alerta que o produto não está cadastrado
    else{

        alert("Produto não cadastrado!")
        //ao fim do processo, limpa a div
        document.getElementById("alterarDiv").innerHTML = null
    }

    //devolve o vetor ao localStorage com os valores atualizados
    localStorage.setItem("produtosLoja" , JSON.stringify(produtosVetor))


    location.reload()
}

function alterarProduto(){

    produtosVetor = JSON.parse(localStorage.getItem("produtosLoja"))

    produtoAlteradoHTML = document.getElementById("produtoAlterado")
    valorAlteradoHTML = document.getElementById("valorAlterado")
    marcaAlteradaHTML = document.getElementById("marcaAlterada")

    produtoAlterado = produtoAlteradoHTML.value
    valorAlterado = valorAlteradoHTML.value
    marcaAlterada = marcaAlteradaHTML.value
    
    if(produtoAlterado == "" || valorAlterado == "" || marcaAlterada == ""){
            
        alert("Campos Obrigaórios não Preenchidos!")
    }
    
    else{
        //Atualiza no objeto desse Produto suas informações
        produtosVetor[indice] = {
        Produto: produtoAlterado,
        Valor: valorAlterado,
        Marca: marcaAlterada
        }

        alert("Produto Alterado!")

        document.getElementById("alterarDiv").innerHTML = null

        localStorage.setItem("produtosLoja", JSON.stringify(produtosVetor))
    }

}

//transforma a div dentro do HTML em inputs para receber as variaveis
function deletarHTML(){

    document.getElementById("alterarDiv").innerHTML = `<br><br>\n
    <label> Remoção:</label> <br>\n    
    <input class="inputs" id="produtoDeletar" placeholder="Produto"></input> <br>\n
    <input class="inputs" id="produtoDeletarMarca" placeholder="Marca"></input> <br>\n
    <button class="buttons" onclick="deletarProduto()">Remover</button>`

    produtoDeletarHTML = document.getElementById("produtoDeletar")
    produtoDeletarMarcaHTML = document.getElementById("produtoDeletarMarca")
}

//cria função para deletar um produto
function deletarProduto(){

    produtoDeletar = produtoDeletarHTML.value
    produtoDeletarMarca = produtoDeletarMarcaHTML.value

    //retira do localStorage e transforma novamente em variável o vetor de produtos
    produtosVetor = JSON.parse(localStorage.getItem("produtosLoja"))

    if(produtosVetor == null){

        produtosVetor = []
    }


    if(produtoDeletar == "" || produtoDeletarMarca == ""){
            
        alert("Campos Obrigaórios não Preenchidos!")
    }

    else{
        //pelo tamanho do vetor, indentifica qual objeto tem o produto desejado
        for(i=0; i<produtosVetor.length; i++){

            if(produtosVetor[i].Produto == produtoDeletar){
  
                //identifica se esse produto é da Marca registrada ou não
                if(produtosVetor[i].Marca == produtoDeletarMarca){

                    //variável de índice recebe o valor do índice do produto em questão, se o produto for o desejado
                    indice = i
                    Registro = 1
                }            
            }
        }
    
        if(Registro == 1){

    
            //remove o Produto desejado para a variável de produtos deletados
            Deletados = produtosVetor.splice(indice, 1)

            //Esvazia a variável de produtos deletados para poupar memória
            Deletados = []

            //Mostra mensagem na tela avisando que o produto foi deletado
            alert("Produto deletado")
    
        }

        else{

            alert("Produto não Resgistrado!")
        }
    }
    //devolve o vetor ao localStorage com os valores atualizados
    localStorage.setItem("produtosLoja" , JSON.stringify(produtosVetor))
 
    //ao fim do processo, limpa a div
    document.getElementById("alterarDiv").innerHTML = null


    location.reload()
}

//cria função para cadastrar um produto
function cadastrarProduto(){


    produto = produtoHTML.value
    valor = valorHTML.value
    Marca = MarcaHTML.value

    if(produto == "" || valor == "" || Marca == ""){
            
        alert("Campos Obrigaórios não Preenchidos!")
    }

    else{

        produtoObjeto = {
        Produto: produto,
        Valor: valor,
        Marca: Marca
        }
        
        
        produtosVetor = JSON.parse(localStorage.getItem("produtosLoja"))
    
        if(produtosVetor == null){
    
            produtosVetor = []
        }
    
        
        
        //pelo tamanho do vetor, indentifica qual objeto tem o produto desejado
        for(i=0; i<produtosVetor.length; i++){
    
            if(produtosVetor[i].Produto == produto){
    
                //identifica se esse produto é da Marca registrada ou não
                if(produtosVetor[i].Marca == Marca){
    
                    Registro = 1
    
                }   
            }
        }
    
        if(Registro == 1){
    
            alert("Produto já cadastrado!")
        }
    
        else{
    
        //vetor de produtos recebe o objeto do produto cadastrado
        produtosVetor.push(produtoObjeto)
    
        //mostra mensagem na tela de produto cadastrado
        alert("Produto Cadastrado")
    
        }
    
    }

    //armazena no localStorage o vetor de produtos
    localStorage.setItem("produtosLoja", JSON.stringify(produtosVetor))

    location.reload()
}
