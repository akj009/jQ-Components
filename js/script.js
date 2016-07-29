var filteredData = $('.displayTable tbody tr');
$(function(){
    
    updatePagination();
    
    $('.displayTable tbody tr').each(function(i) {
        $(this).find('td:first').text(function(j, val) {
           return (i + 1) + " - " + val;
        }); 
    });
    $('input[name="search"]').keyup(function(){
        $('.displayTable tbody tr').hide();
        console.log('SEARCH: ' + $(this).val());
        filteredData = $('.displayTable tbody tr').filter($(':contains(' + $(this).val() + ')'));
        updatePagination();
    });
    
    $('select[name="noRows"]').on('change',function(){
        console.log('changed');
        updatePagination();
    });
});

function updatePagination(){
    var totalRows = filteredData.length;
    var toShow = $('select[name="noRows"]').val();
    $('input[name="pagination"]').attr('placeholder','1 to ' + toShow + ' of ' + totalRows);
    
    updateTable(toShow);
}

var first = $('.first');
var prev = $('.prev');
var next = $('.next');
var last = $('.last');

function updateTable(maxRows){
    console.log('updating table');
    var rowList = filteredData;
    var rowListSize = rowList.size();
    maxRows = Number(maxRows);
    if(rowListSize < maxRows) {
        return;
    }    
    
    var cFirstVisible = Number(rowList.index(rowList.filter(':visible')));
    console.log('FIRST: ' + cFirstVisible);
    console.log('MAX: ' + maxRows);
    
    rowList.hide();
    if(cFirstVisible>0)
        rowList.filter(':lt(' + (cFirstVisible + maxRows) + '):gt(' + (cFirstVisible - 1) + ')').show();
    else
        rowList.filter(':lt(' + (cFirstVisible + maxRows) + ')').show();
    
    prev.addClass('disabled');
}

prev.click(function() {
    var rowList = filteredData;
    var rowListSize = rowList.size();
    var maxRows = Number($('select[name="noRows"]').val());
    if(rowListSize < maxRows) {
        return;
    }
    
    var cFirstVisible = rowList.index(rowList.filter(':visible'));
    console.log('Prev: ' + cFirstVisible);
    if (prev.hasClass('disabled')) {
        return false;
    }

    rowList.hide();
    if (cFirstVisible - maxRows - 1 > 0) {
        rowList.filter(':lt(' + cFirstVisible + '):gt(' + (cFirstVisible - maxRows - 1) + ')').show();
    } else {
        rowList.filter(':lt(' + cFirstVisible + ')').show();
    }

    if (cFirstVisible - maxRows <= 0) {
        prev.addClass('disabled');
    }

    next.removeClass('disabled');

    return false;
});

next.click(function() {
    var rowList = filteredData;
    var rowListSize = rowList.size();
    var maxRows = Number($('select[name="noRows"]').val());
    console.log('MAX ROWS: ' + maxRows);
    if(rowListSize < maxRows) {
        return;
    }
    
    var cFirstVisible = rowList.index(rowList.filter(':visible'));
    console.log('Next: ' + cFirstVisible);
    if (rowList.hasClass('disabled')) {
        return false;
    }

    rowList.hide();
    rowList.filter(':lt(' + (cFirstVisible +2 * maxRows) + '):gt(' + (cFirstVisible + maxRows - 1) + ')').show();

    if (cFirstVisible + 2 * maxRows >= rowList.size()) {
        next.addClass('disabled');
    }

    prev.removeClass('disabled');

    return false;
});