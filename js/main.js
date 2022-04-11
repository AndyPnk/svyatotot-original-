var cart = {};//кошик
function init() {
    //читаю файл goods.json
    $.getJSON("goods.json", goodsOut);
}
function goodsOut(data){
    //вивід на сторінку
    console.log(data);
    var out='';
    for (key in data){
        out +='<div class="hover-effect">';
        out +='<img src="images/'+data[key].img+'" alt="">';
        out +='<p class="name">'+data[key].name+'</p>';
        out +='<section class="cost">'+data[key].cost+' грн'+'</section>';
        out +='<p></p>';
        out +=`<button class="add-to-cart" data-id="${key}">Добавить в корзину</button>`;
        out +='</div>';


    }
    $('.treh').html(out);
    $('.add-to-cart').on('click',addToCart);


}

function addToCart(){
    //добавляємо товар в корзину
    var id = $(this).attr('data-id');
    //console.log(id);
    if(cart[id]==undefined){
        cart[id] = 1;//якщо в кошику немає товара - робимо = 1
    }
    else {
        cart[id]++;//якщо такий товар є то +1
    }
    showMiniCart();
    saveCart();
}
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));//кошик в рядок
}

function showMiniCart(){
    //показую міні кошик
    var out="";
    var k=0;
    for (var key in cart){
        k++;
    }
    out = '<a href="cart.html">КОРЗИНА ('+ k +')</a>';
    $('.mini-cart').html(out);

}
function loadCart(){
    //перевіряю чи є localstorage записів cart
    if(localStorage.getItem('cart')){
        // чи є - розшифровую і записую змінну cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}


$(document).ready(function (){
   init();
   loadCart();
});