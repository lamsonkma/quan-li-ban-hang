$('.pagination').pagination({
    dataSource: `/pagination?page=1`,
    locator: 'data',
    totalNumberLocator: function(response) {
        return response.totalPage;
    },
    pageSize:2,
    showPrevious: false,
    showNext: false,
    afterPageOnClick: function(event,pageNumber) {
        pagination(pageNumber);
    }
})
function pagination(page) {
    $.ajax({
        type: 'GET',
        url: `/pagination?page=${page}`,
    })
    .done(function (result) {
        console.log(result);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus + ': ' + errorThrown);
    });
}