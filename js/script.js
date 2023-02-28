let moviebtn = $("#movie-btn");
function getData(){
    let movieInput = $("#movie-input");
    let movieList = $("#movie-list");
    movieList.html('');
    
    $.ajax({
        url : 'http://www.omdbapi.com/',
        method : 'GET',
        data : {
            apikey : 'efb94e0f',
            s : movieInput.val()
        },
        success : function(e){
            console.log(movieInput.val());
            console.log(e);
            if(e.Response == 'True'){
                let movies = e.Search;
                
                $.each(movies, function(i,movie){
                    movieList.append(`
                    <div class="col-md-4">
                        <div class="card mb-3" style="width: 18rem;">
                            <img src="`+movie.Poster+`" class="card-img-top" title="`+movie.Title+`">
                            <div class="card-body">
                                <h5 class="card-title">`+movie.Title+`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+movie.Year+`</h6>
                                <a href="#" class="btn btn-dark container-fluid detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+movie.imdbID+`">Detail</a>
                            </div>
                        </div>
                    </div>
                    `)
                })
            }else{
                movieList.html(`<h3>`
                +e.Error+`</h3>`)
            }
        },
        error : function(){
            movieList.html(`<h3>Server error</h3>`)
        }
    });
}

moviebtn.on('click',function(){
    getData();
})

$("#movie-input").on('keydown',function(e){
    if(e.key == "Enter"){
        getData();
    }
})

$("#movie-list").on('click','.detail',function(){
    $('.modal-body').html(`Mengambil data...`);
    console.log($(this).data('id'));

    $.ajax({
        url : 'http://www.omdbapi.com/',
        dataType : 'json',
        method : 'GET',
        data : {
            apikey : 'efb94e0f',
            i : $(this).data('id'),
        },
        success : function(e){
            if(e.Response == "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row justify-content-center">
                            <div class="col-md-4">
                                <img src="`+e.Poster+`" title="`+e.Title+`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <h3>`+e.Title+`</h3>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Release : `+e.Released+`</p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Genre : `+e.Genre+`</p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Director : `+e.Director+`</p>
                                    </li>
                                    <li class="list-group-item">
                                        <p>Actor : `+e.Actors+`</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
            else{
                $('.modal-body').text(e.Error);
            }
        }
    })
})