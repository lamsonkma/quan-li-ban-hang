// document.querySelectorAll(".product-img-item").forEach(element=>{
//     element.addEventListener('click',()=>{
//         let img = element.querySelector('img').getAttribute('src');
//         console.log(img);
//         document.querySelector('#product-img > img').setAttribute('src',img);
//     })
// })
$(document).ready(()=>{
    $(".product-img-item").click(event => $('#product-img img').attr('src',event.target.src));
    let navText=["<i class='bx bx-chevron-left'></i>","<i class='bx bx-chevron-right'></i>"];
    $('.list-product').owlCarousel({
        nav:true,
        navText:navText,
        loop:true,
        items:5,
        center: true,
        dots:false,
    })
})