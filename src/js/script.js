/* function checkOutLoader(arrayProdutos){
    let checkOut = document.getElementById("precoTotal")
    if (arrayProdutos != ""){
        checkOut.innerText = arrayProdutos.reduce((total, produto) => total + produto.preco, 0).toFixed(2)
    } else{
        checkOut.innerText = "0"
    }
} */

//FUNCTIONS DO CARRINHO
function cartChecker(){
  if (cart == ""){
        listaCarrinho.innerHTML = ""
        listaCarrinho.innerText = "O carrinho está vazio... :("
        listaCarrinho.classList.add("cart__display--empty")
        document.getElementsByClassName("cart__checkout")[0].classList.add("cart__checkout--empty")
    } else {
        listaCarrinho.classList.remove("cart__display--empty")
        document.getElementsByClassName("cart__checkout")[0].classList.remove("cart__checkout--empty")
    }
}

function checkoutUpdate(){
    let quantidadeTotal = document.getElementById("cart__checkout--qtd")
    let precoTotal = document.getElementById("cart__checkout--price")

    quantidadeTotal.innerText = cart.reduce((total, produto) => total + produto.quantidade, 0)
    precoTotal.innerText = `R$ ${cart.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0).toFixed(2)}`
}

function cartCardPriceLoader(produto, cartCardDetails){
    let cartCardSummary = document.createElement("div")
    cartCardSummary.classList.add("cart__card--price")
    cartCardDetails.appendChild(cartCardSummary)

    let precoUnitario = document.createElement("p")
    precoUnitario.innerText = `Uni.: R$ ${produto.preco.toFixed(2)}`

    let subTotal = document.createElement("p")
    subTotal.id = produto.id
    subTotal.innerText = `R$ ${(produto.quantidade * produto.preco).toFixed(2)}`
    cartCardSummary.append(precoUnitario, subTotal)
}

function countUp (produto, plusIcon, qtdDisplay){
    plusIcon.addEventListener("click", (event) => {
        produto.quantidade += 1
        cart[cart.indexOf(produto)] = produto
        qtdDisplay.innerText = produto.quantidade
        document.getElementById(produto.id).innerText= `R$ ${(produto.quantidade * produto.preco).toFixed(2)}`
        checkoutUpdate()
    })
}

function countDown (produto, minusIcon, qtdDisplay){
    minusIcon.addEventListener("click", (event) => {
        produto.quantidade -= 1
        if (produto.quantidade > 0){
            cart[cart.indexOf(produto)] = produto
            qtdDisplay.innerText = produto.quantidade
            document.getElementById(produto.id).innerText= `R$ ${(produto.quantidade * produto.preco).toFixed(2)}`
        } else {
            cart = cart.filter(prod => prod.id != produto.id) 
            let listaCarrinho = document.getElementsByClassName("cart__display")[0]
            listaCarrinho.innerHTML=""
            cartDisplayLoader(cart, listaCarrinho)
        }
        checkoutUpdate()
    })
}

function cardPainelLoader(produto, qtdPainel){
    let minusIcon = document.createElement("img")
    let qtdDisplay = document.createElement("p")
    let plusIcon = document.createElement("img")

    minusIcon.src = "./src/img/ico/minus.png"
    plusIcon.src = "./src/img/ico/plus.png"
    qtdDisplay.innerText = produto.quantidade

    minusIcon.alt = "Item counter down"
    plusIcon.alt = "Item counter up"

    qtdPainel.append(minusIcon, qtdDisplay, plusIcon)
    countDown(produto, minusIcon, qtdDisplay)
    countUp(produto, plusIcon, qtdDisplay)
}

function cartCardTagLoader(produto, cartCardDetails){
    let cartCardTagBox = document.createElement("div")
    cartCardTagBox.classList.add("cart__card--tagqtd")
    cartCardDetails.appendChild(cartCardTagBox)


    let cartCardTag = document.createElement("p")
    cartCardTag.innerText = produto.secao
    cartCardTag.classList.add("cart__card--tag")

    let qtdPainel = document.createElement("div")
    qtdPainel.classList.add("cart__card--painelqtd")

    cartCardTagBox.append(cartCardTag, qtdPainel)
    cardPainelLoader(produto, qtdPainel)
}

function cardRemove(produto, cardTrash){
    cardTrash.addEventListener("click", (event) => {
        produto.quantidade = 0
        cart = cart.filter(prod => prod.id != produto.id)
        listaCarrinho.innerHTML=""
        cartDisplayLoader(cart, listaCarrinho)
        console.log(cart)
    })
}

function cartCardTitleLoader(produto, cartCardDetails){
    let cartCardTitle = document.createElement("div")
    cartCardTitle.classList.add("cart__card--titledel")
    cartCardDetails.appendChild(cartCardTitle)

    let cardTitleText = document.createElement("p")
    cardTitleText.innerText = produto.nome

    let cardTrash = document.createElement("img")
    cardTrash.src = "./src/img/ico/trash (1).png"
    cardTrash.alt = "lixeira"

    cartCardTitle.append(cardTitleText, cardTrash) 
    cardRemove(produto, cardTrash)
}

function cartCardDetailsLoader(produto, cartCard){
    let cartCardDetails = document.createElement("div")
    cartCardDetails.classList.add("cart__card--detalhes")
    cartCard.appendChild(cartCardDetails)
    cartCardTitleLoader(produto, cartCardDetails)
    cartCardTagLoader(produto, cartCardDetails)
    cartCardPriceLoader(produto, cartCardDetails)
}

function cartCardImgLoader (produto, cartCard){
    let cartCardImgBox = document.createElement("div")
    cartCardImgBox.classList.add("cart__card--imagem")

    let cartCardImg = document.createElement("img")
    cartCardImg.src = produto.img
    cartCardImg.alt = produto.nome

    cartCardImgBox.appendChild(cartCardImg)
    cartCard.appendChild(cartCardImgBox)
}

function cartCardBuilder(produto, listaCarrinho){
    let cartCard = document.createElement("div")
    cartCard.classList.add("cart__card")
    cartCardImgLoader(produto, cartCard)
    cartCardDetailsLoader(produto, cartCard)
    listaCarrinho.appendChild(cartCard)
}

function cartDisplayLoader(cart, listaCarrinho){
    cartChecker()
    cart.forEach(produto => {
        cartCardBuilder(produto, listaCarrinho)
    })
    checkoutUpdate()
}

function cartBuilder (produto, cart, listaCarrinho){
    if (cart.includes(produto)){
        produto.quantidade += 1
    } else {
        produto.quantidade += 1
        cart.push(produto)
    }
    cartDisplayLoader(cart, listaCarrinho)
}

// FUNCTIONS DA VITRINE
function eventAddToCartLoader (produto, button){
    button.addEventListener("click", (event) => {
        listaCarrinho.innerHTML = ""
        cartBuilder(produto, cart, listaCarrinho)
        console.log(cart)
    })

}

function addButtonLoader(produto, cardBox){
    let cardButton = document.createElement("button")
    cardButton.classList.add("card__button--add")
    cardButton.innerText = "Comprar"
    cardBox.appendChild(cardButton)
    eventAddToCartLoader(produto, cardButton)
}

function cardPriceLoader (produto, cardBox){
    let cardPrice = document.createElement("p")
    cardPrice.innerText = `R$ ${produto.preco.toFixed(2)}`
    cardBox.appendChild(cardPrice)
}

function cardTagLoader (produto, cardDataBox1){
    let cardTag = document.createElement("span")
    cardTag.innerText = produto.secao
    cardDataBox1.appendChild(cardTag)
}

function cardTitleLoader (produto, cardDataBox1){
    let cardTitle = document.createElement("h3")
    cardTitle.innerText = produto.nome
    cardDataBox1.appendChild(cardTitle)
}

function cardPictureLoader (produto, card){
    let cardPicture = document.createElement("img")
    cardPicture.src = produto.img
    card.appendChild(cardPicture)
}

function cardBoxLoader(produto, card){
    let cardBox = document.createElement("div")
    cardBox.classList.add("card__box")
    card.appendChild(cardBox)
    cardPriceLoader(produto, cardBox)
    addButtonLoader(produto, cardBox)
}

function cardDataIcoLoader(produto, cardDataBox2){
    let cardDataIco = document.createElement("img")
    cardDataIco.classList.add("card__data--ico")
    cardDataIco.src="./src/img/ico/list.png"
    cardDataIco.alt="lista de nutrientes"
    cardDataBox2.appendChild(cardDataIco)
}

function cardDataLoader (produto, card){
    let cardData = document.createElement("div")
    cardData.classList.add("card__data--container")

    let cardDataBox1 = document.createElement("div")
    let cardDataBox2 = document.createElement("div")

    cardDataBox1.classList.add("card__data--box1")
    cardDataBox2.classList.add("card__data--box2")

    cardData.append(cardDataBox1, cardDataBox2)
    card.appendChild(cardData)

    cardTitleLoader(produto, cardDataBox1)
    cardTagLoader(produto, cardDataBox1)
    cardDataIcoLoader(produto, cardDataBox2)
}
function cardNutriListGen (componentes, cardNutri){
    componentes.forEach((comp) => {
        let item = document.createElement("li")
        item.innerText = comp
        item.classList.add("card__nutri--info")
        cardNutri.appendChild(item)
    })
}

function cardNutriLoader(produto, card){
    let cardNutri = document.createElement("ul")
    cardNutri.classList.add("card__nutri--list")
    card.appendChild(cardNutri)

    let cardNutriTitle = document.createElement("li")
    cardNutriTitle.classList.add("card__nutri--title")
    cardNutriTitle.innerText = "Nutrientes"
    cardNutri.appendChild(cardNutriTitle)

    cardNutriListGen(produto.componentes, cardNutri)
    

}

function cardDisplayNutri(card){
    card.addEventListener("click", (event) => {
        let ico = card.getElementsByClassName("card__data--ico")[0]
        if (card.classList.contains("card__data--icoOn")){
            Array.from(document.getElementsByClassName("card__data--icoOn")).forEach(element => {
                element.getElementsByClassName("card__data--ico")[0].src="./src/img/ico/list.png"
                element.classList.toggle("card__data--icoOn")
            })
            let lista = card.getElementsByClassName("card__nutri--list")[0]
            lista.removeAttribute("id")
            ico.src = "./src/img/ico/list.png"
            } else if (event.target == ico){
                console.log(ico)
                try{
                    document.getElementById("card__nutri--listOn").removeAttribute("id")
                }
                finally{
                    Array.from(document.getElementsByClassName("card__data--icoOn")).forEach(element => {
                        element.getElementsByClassName("card__data--ico")[0].src="./src/img/ico/list.png"
                        element.classList.toggle("card__data--icoOn")
                    })
                    let lista = card.getElementsByClassName("card__nutri--list")[0]
                    lista.id = "card__nutri--listOn"
                    card.classList.toggle("card__data--icoOn")
                    ico.src = "./src/img/ico/listOn.png"
                }
            }
            
    })
}

function cardBuilder (produto){
    let productList = document.querySelector("ul")
    let card = document.createElement("li")
    productList.appendChild(card)

    cardPictureLoader(produto, card)
    cardDataLoader(produto, card)
    cardNutriLoader(produto, card)
    cardBoxLoader(produto, card)

    cardDisplayNutri(card)

}

function shopLoader (database){
    //Essa function constroi a vitrine com base no database
    document.querySelector("ul").innerHTML = ""
    document.getElementsByClassName("campoBuscaPorNome")[0].value = ""
    database.forEach(cardBuilder)
    /* checkOutLoader(database) */
}



//FUNCTIONS DO HEADER
function addFilter(tag){
    tag.addEventListener("click", (event) => {
        Array.from(document.getElementsByClassName("estiloGeralBotoes")).forEach(button => {
            button.classList.remove("botaoSelecionado")
        })
        tag.classList.toggle("botaoSelecionado")
        filteredShop = produtos.filter(produto => produto.secao == tag.innerText)
        shopLoader(filteredShop)
    }) 
}

function tagBuilder (categoria){
    let tagButton = document.createElement("button")
    tagButton.classList.add("estiloGeralBotoes")
    tagButton.id = categoria
    tagButton.innerText = categoria
    document.getElementById("filters").appendChild(tagButton)
    addFilter(tagButton)
}


function headerLoader (database){
    let categorias = new Set()
    database.forEach(produto => categorias.add(produto.secao))
    categorias.forEach(tagBuilder)
}



document.getElementById("todos").addEventListener("click", (event) => {
    Array.from(document.getElementsByClassName("estiloGeralBotoes")).forEach(button => {
        button.classList.remove("botaoSelecionado")
    })
    document.getElementById("todos").classList.toggle("botaoSelecionado")
    filteredShop = ""
    shopLoader(produtos)
})

document.getElementById("search").addEventListener("click", (event) => {
    let campoBusca = document.getElementsByClassName("campoBuscaPorNome")[0]
    filteredShop = []
    let filter = new Set()
    filteredShop.push(...(produtos.filter(produto => produto.nome.toLowerCase().match(campoBusca.value.toLowerCase()))))
    filteredShop.push(...(produtos.filter(produto => produto.secao.toLowerCase().match(campoBusca.value.toLowerCase()))))
    filteredShop.push(...(produtos.filter(produto => produto.categoria.toLowerCase().match(campoBusca.value.toLowerCase()))))
    filteredShop.forEach(prod => filter.add(prod))
    shopLoader(filter) 
})

document.getElementsByClassName("campoBuscaPorNome")[0].addEventListener("keydown", (event) => {
    if (event.key == "Enter"){
        let campoBusca = document.getElementsByClassName("campoBuscaPorNome")[0]
        filteredShop = []
        let filter = new Set()
        filteredShop.push(...(produtos.filter(produto => produto.nome.toLowerCase().match(campoBusca.value.toLowerCase()))))
        filteredShop.push(...(produtos.filter(produto => produto.secao.toLowerCase().match(campoBusca.value.toLowerCase()))))
        filteredShop.push(...(produtos.filter(produto => produto.categoria.toLowerCase().match(campoBusca.value.toLowerCase()))))
        filteredShop.forEach(prod => filter.add(prod))
        shopLoader(filter) 
    }
})



//GLOBAL ACTIONS
produtos.sort(() => Math.random() - 0.5)
let filteredShop = [], cart = []
let listaCarrinho = document.getElementsByClassName("cart__display")[0]
cartChecker()
headerLoader(produtos)
shopLoader(produtos)