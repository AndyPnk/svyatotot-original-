var cart = {};
function loadCart(){
    //перевіряю чи є localstorage записів cart
    if(localStorage.getItem('cart')){
        // чи є - розшифровую і записую змінну cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();


    }
    else{
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart(){
    if (!isEmpty(cart)){
        $('.main-cart').html('Корзина пуста!');
    }
    else {
        $.getJSON('goods.json', function (data) {
            var goods = data;
            var out = '';
            for (var id in cart) {

                out += `<span><button data-id="${id}" class="del-goods"> x </button>`;
                out += `<img src="images\\${goods[id].img}">`;
                out += `<p>  ${goods[id].name  }  `;
                out += ` <button data-id="${id}" class="minus-goods">-</button>  `;
                out += 'Кол-во: ';
                out += `    ${cart[id]  }    `;
                out += `    <button data-id="${id}" class="plus-goods">+</button>    `;
                out += 'Цена: ';
                out += cart[id]*goods[id].cost;
                out += ' грн';
                out += '</p></span><br>';



            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
}


function delGoods(){
    //видаляэмо товар з кошика
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();

}
function plusGoods(){
    //добавляємо товар з кошика
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods(){
    //віднімаємо товар з кошика
    var id = $(this).attr('data-id');
    if (cart[id]==1){
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}



function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));//кошик в рядок
}

function isEmpty(object) {
    //перевірка кошика на порожність
    for (var key in object)
    if(object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail(){
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if(ename!='' && email!='' && ephone!=''){
        if (isEmpty(cart)){
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart

                },
                function (data){
                    if (data == 1 ){
                        alert('Заказ отправлен');
                    }
                    else {
                        alert('Повторите заказ');
                    }
                }
            );

        }
        else{
            alert('Корзина пуста!');
        }
    }
    else {
        alert('Заполните поля!')
    }
}
$(document).ready(function (){
   loadCart();
   $('.send-email').on('click', sendEmail)//надіслати лист с заказом
});