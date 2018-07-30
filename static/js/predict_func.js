$(function(){

    $("#drop1 li a").click(function(){

      $("#btn1:first-child").text($(this).text());
      $("#btn1:first-child").val($(this).text());
   });

});



$('.dropdown-menu li').click(function(){
    var c =($(this).text());
	});
	
$(document).ready(function() {
var c;
$('#drop1 li').click(function(){
    c = ($(this).text());
	});


	$("#sbmt").click(function(){
		if ((typeof c != "undefined") && (document.getElementById("hg").value >= document.getElementById("htag").value)    ) {

		  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
		   features = {team:document.getElementById("btn1").value,hg:document.getElementById("hg").value,attendance:document.getElementById("attendance").value,
			hthg:document.getElementById("hthg").value,htag:document.getElementById("htag").value};
    $.ajax({
        url: '/predict_team',
        data: features,
        type: 'POST',
        success: function (response) {
          var container= $("#result");
          var p = $("<p>");
          p.text("Predicted Result :"+response);
          container.append(p);
        },
        error: function (error) {
            console.log(error);
        }
    });
		}
		else {
		    if ((document.getElementById("hg").value < document.getElementById("htag").value)){
		        alert("half time goal <= Total Goals ")
            }
             if ((document.getElementById("hg").value < document.getElementById("hthg").value)){
		        alert("half time goal <= Total Goals ")
            }
            else {
                alert("Enter Team Names");
            }
		    }


	});
});

