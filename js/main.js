$(document).ready(function() {
  $("#search").on("click", function() {
    document.getElementById("result").innerHTML = "";
    query = document.getElementById("query").value;
    query_copy = query;
    if (query_copy.replace(/\s/g, "").length) {
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const url = `${proxy}https://api.musixmatch.com/ws/1.1/track.search?apikey=${apikey}&q=${query}&f_has_lyrics=1&page_size=10&s_track_rating=desc`;
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          let info = data.message.body.track_list;
          info.forEach(function(item, index) {
            let url_2 = `${proxy}https://api.musixmatch.com/ws/1.1/album.get?apikey=${apikey}&album_id=${item.track.album_id}`;
            fetch(url_2)
              .then(function(response_2) {
                return response_2.json();
              })
              .then(function(albumData) {
                let albumInfo = albumData.message.body.album;
                $("#result").append(`
                <div class="col-md-4">
                  <div class="card">
                      ${
                        albumInfo.album_coverart_100x100
                          ? `<img src="${albumInfo.album_coverart_100x100}" alt="Album Cover" class="card-img-top">`
                          : `<img src="https://via.placeholder.com/150" alt="Album Cover" class="card-img-top">`
                      }
                      <div class="card-body">
                        <h5 class="card-title">${item.track.track_name}</h5>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Album name: ${
                          item.track.album_name
                        }</li>
                        <li class="list-group-item">Artist name: ${
                          item.track.artist_name
                        }</li>
                        ${
                          albumInfo.album_release_date
                            ? `<li class="list-group-item">Album Release Date: ${albumInfo.album_release_date}</li>`
                            : `<li class="list-group-item">Album Release Date: Unknown</li>`
                        }  
                        ${
                          item.track.primary_genres.music_genre_list[0]
                            ? `<li class="list-group-item">Music genre: ${item.track.primary_genres.music_genre_list[0].music_genre.music_genre_name}</li>`
                            : `<li class="list-group-item">Music genre: Unknown</li>`
                        }
  
                      </ul>
                      <a class="btn btn-success" href="lyrics.html?album_id=${
                        item.track.album_id
                      }&song_id=${item.track.track_id}&song_name=${item.track.track_name}">View Lyrics</a>
                  </div>
                </div>
              `);
              });
          });
        });
    }
  });
});
