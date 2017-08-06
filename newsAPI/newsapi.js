$(document).ready(function(){
    var url = "https://newsapi.org/v1/sources";
    var data = {language:"en", country:"us"};
    $.ajax({
        url: url,
        data: data,
        type: "GET",
        success: function(response){
            //console.log(response);
            //console.log(response.sources[2]);
            var sources = response.sources;
            //console.log(sources[2]);
            var html = "<select class='form-control' id='sourceOption'>";
            $.each(sources, function(index,source){
                //console.log(source);
               // html = html + "<option>" + source.name + "</option>";
                html += "<option value='"+ source.id + "'>" + source.name + "</option>";
                
            })
            html +="</select>";
            //console.log(html);
            $(".form-group").html(html);
        }
        
    })
    $("#source").submit(function(event) {
        //to prevent the page from reloading on submission, which it usually does, native javascript api method
        event.preventDefault();
        var id = $('#sourceOption').val();
        var url = "https://newsapi.org/v1/articles";
        var data = {apiKey:"MYAPIKEY", source:id};
        $.ajax({
            url: url,
            data: data,
            type: "GET",
            //you only name a function if you are calling it more than once, otherwise you will be wasting memory
            //it will refresh the articles because the content of the html variable will change depending on the new 
            //response it gets from the api when the form is re-submitted
            success: function(response){
                //console.log('CLICKED',response);
                var articles = response.articles;
                var html="<ul class='list-group'>";
                //if we only put article, then article will be the index number, the first parameter will always be the index
                //regardless of what you name it
                $.each(articles, function(index, article){
                    html+="<li class='list-group-item'>"+article.title+"</li>"
                })
                html+="</ul>";
                $("#articles").html(html);
            }
            
        })
    })
    
 
});