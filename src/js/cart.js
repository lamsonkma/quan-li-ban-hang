$(document).ready(() => {
    // $('.cart-container .row').html('');
    // let list = JSON.parse(localStorage.getItem('cart')) || [];
    // for (let i = 0; i < list.length; i++) {
    //     for (let j = 0; j < list[i].length; j++) {
    //         $('.cart-container .row').append(
    //             `                <div class="col-6">
    //             <div class="cart-left">
    //                 <div class="col-1 checkbox"><input type="checkbox"></div>
    //                 <div class="col-11">
    //                     <div class="cart-img">
    //                         <img src=${list[i][j].image[0]}
    //                             alt="">
    //                     </div>
    //                     <span class="cart-name">${list[i][j].name}</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="col-6">
    //             <div class="cart-right">
    //                 <div class="cart-detail">
    //                     <div class="col-3 cart-price-one">${list[i][j].price}</div>
    //                     <div class="col-3 product-quantity-wrapper">
    //                         <span class="product-quantity-btn">
    //                             <i class='bx bx-minus-circle'></i>
    //                         </span>
    //                         <span class="product-quantity">0</span>
    //                         <span class="product-quantity-btn">
    //                             <i class='bx bx-plus-circle'></i>
    //                         </span>
    //                     </div>
    //                     <div class="col-3 cart-price-all"></div>
    //                     <div class="col-3 cart-delete"><button data=${list[i][j]._id}>Xóa</button></div>
    //                 </div>
    //             </div>
    //         </div>`
    //         )
    //     }
    // }
    $('.cart-delete button').on('click',function(){
        // let list = JSON.parse(localStorage.getItem('cart')) || [];
        // for(let i = 0 ; i < list.length ; i++){
        //     for(let j = 0 ; j < list[i].length ; j++){
        //         if( list[i][j]._id === $(this).attr('data') ){
        //             listProduct = list.filter(item => item[j]._id !== $(this).attr('data'))
        //             localStorage.setItem('cart',JSON.stringify(listProduct));
        //             location.reload();
        //         }
        //     }
        // }
        let id =$(this).attr('data');
        $.ajax({
            type: 'DELETE',
            url:`/cart/delete/${id}`,
        })
        .then(result=>{
            if(result){
                location.reload();
            }
        })
        
    })
    $('.product-quantity-btn').on('click', function () {
        let val = parseInt($(this).closest('.product-quantity-wrapper').find('.product-quantity').html());
        let totalPrice = parseInt($(this).closest('.cart-detail').find('.cart-price-one').html());
        if($(this).find('i').hasClass('bx-plus-circle')){
            $(this).closest('.product-quantity-wrapper').find('.product-quantity').html(val+1);
            val++;
            $(this).closest('.cart-detail').find('.cart-price-all').html(val*totalPrice);       
            $(this).closest('.cart-detail').find('.cart-price-all').html()
        }
        else if($(this).find('i').hasClass('bx-minus-circle')){
            if(val === 0 ){}
            else{
                $(this).closest('.product-quantity-wrapper').find('.product-quantity').html(val-1);
                val--;
                $(this).closest('.cart-detail').find('.cart-price-all').html(val*totalPrice);
                $(this).closest('.cart-detail').find('.cart-price-all').html();
            }
        }
    })
})