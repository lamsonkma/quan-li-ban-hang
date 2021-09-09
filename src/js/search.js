function search(str) {
    $(".result").html('');
    $.ajax({
        type: 'POST',
        url: '/search',
        data: JSON.stringify({ str: str }),
        contentType: "application/json",
    })
    .then(function (result) {
        if (result.length === 0 ) {
            $('.result').append(`<a href=#><span>"Không tìm thấy"</span></a>`);
        }
        else {
            $.each(result, (index, value) => {
                $('.result').append(`<a href=/product?category=${value.category.name}&id=${value._id}><span>${value.name}</span></a>`);
            })
        }
        // $(".search-result").css({ "opacity": "1", "visibility": "visible" });
        $(".search-result").css({ "display": "block"});

    })
    .catch(function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus + ': ' + errorThrown);
    });
}
