$(document).ready(()=>{
    $.ajax({
        type: 'get',
        url: '/cart/number',
    })
    .done(result=>{
        if(result.number === 0){}
        else{
            $('.cart-number-product').html(result.number).css({"display":"block"});
        }
        
    })
})