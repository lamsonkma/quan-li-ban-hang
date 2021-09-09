// function setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }
// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }
function addToCart(id) {

    $.ajax({
        type: 'post',
        url: '/cart/addToCart',
        data: JSON.stringify({ result: id }),
        contentType: "application/json",
    })
        .done(function (result) {
            // localstorage
            // let dataCart = localStorage.getItem('cart');
            // let list = dataCart ? JSON.parse(dataCart) : [];
            // list.push(result);
            // localStorage.setItem('cart', JSON.stringify(list));
            // cookies
            // let dataCart = getCookie('cart');
            // let list = dataCart ? JSON.parse(dataCart) : [];
            // list.push(result);
            // setCookie('cart',JSON.stringify(list),1);
            // $.ajax({
            //     type: 'post',
            //     url: '/cart/addToCart',
            //     data: JSON.stringify({ result: result[0]._id }),
            //     contentType: "application/json",
            // })
            console.log(result);
            if(result.task){
                $('.cart-number-product').html(result.number).css({"display":"block"});
                $('.btn-add-cart button').css({"background-color":"rgb(0, 0, 0 , 0.5)"})
                $('.btn-add-cart button span').html(result.task).css({"color":"rgb(0, 255, 0)"});
                $('.btn-add-cart button i').css({"visibility": "visible","opacity": "1"});
                // $('.btn-add-cart button').html(result.task);
            }
            else{
                window.location.replace("signin")
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        });
}
