$(document).ready(function () {
    $('#player_table').hide();


            // player_table.append(first_row);
});

$(document).on('click',".player",function (e) {
    $target = $(e.target);
    var id = $target.attr('id');
   name_info={player_name:id};
    $.ajax({
        url: '/player_info',
        data: name_info,
        type: 'POST',
        success: function (response) {
            var table = $("#player_table")
            row = $('<tr>')
            for (var x in response) {
                var col = $("<td>");
                col.text(response[x][0])
                row.append(col);
            }
            table.append(row);
            table.show();
        },

        error: function (error) {
            console.log(error);
        }
    });
    });


