let gifsNumber = 10;
let gifsSkipped = 0;
let search="trending";


///// request data AJAX function for GIPHY appi
function takeData(){
    $.ajax({
        dataType: "json",
        url: "https://api.giphy.com/v1/gifs/search?q="+ search +"&api_key=JdUCIIQEArt8y2Y3lKtclHwSKv54YItg&limit="+ gifsNumber,
        data: "GET"/* ,
        success: function(data){
            let grabdata = data.data
            loadGifs(grabdata);
        },
        error: function(jqXHR, textStauts, error){
            console.log(error, xhr);
        } */
    })
    .done(function(data) {
        let grabdata = data.data
        loadGifs(grabdata);
    })
    .fail(function(xhr) {
        console.log('error', xhr);
    });
}
  
takeData();

////// make DOM from received data
function loadGifs(data){
    if (gifsNumber == 10) {
        for(let i=0; i< data.length; i++){
            let url = data[i].images.fixed_height.url;
            $(".gridgifs").append('<img class="gif" src = "'+ url + '">'); 
        }
    /// if somoene clicked more btn, previous loaded gifs are skipped, and only new gifs are loaded
    } else {
        for(let i=gifsSkipped; i< data.length; i++){
            let url = data[i].images.fixed_height.url;
            $(".gridgifs").append('<img class="gif" src = "'+ url + '">'); 
        }
    }

}
//// load more gifs
$('#more').on("click", function(){
    gifsNumber += 10;
    gifsSkipped += 10;
    takeData();
})

//// search specific gifs
$('#search').on("click", function(){
    $(".gridgifs").html("");
    gifsNumber = 10;
    gifsSkipped = 0;
    words = $('input')[0].value;
    search = words.replace(/ /g, "+");
    if(search == ""){
        search = "trending";
    }
    takeData();
});
  
///// random resize on click
$(window).on("click", function(e){
    if($(e.target).hasClass('active')){
        $(e.target).css({"transform":"scale(1)","z-index":"unset"});
        $(e.target).removeClass("active");
    } else if($(e.target).hasClass('gif')){
        $(e.target).addClass("active");
        $(e.target).css({"transform":"scale(2.2)", "z-index":"1"});
    } 
})

