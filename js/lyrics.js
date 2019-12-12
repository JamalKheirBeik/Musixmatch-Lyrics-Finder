function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}
let song_id = getUrlVars()["song_id"];
let song_name = decodeURI(getUrlVars()["song_name"].replace(/%20/g, " "));
let album = getUrlVars()["album_id"];
document.title = song_name + " Lyrics";
const proxy = "https://cors-anywhere.herokuapp.com/";
const url = `${proxy}https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${apikey}&track_id=${song_id}`;
fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let lyricsData = data.message.body.lyrics;
    let lyrics = lyricsData.lyrics_body;
    let last_updated = lyricsData.updated_time;
    let sponsor = lyricsData.lyrics_copyright;
    let url_2 = `${proxy}https://api.musixmatch.com/ws/1.1/album.get?apikey=${apikey}&album_id=${album}`;
    fetch(url_2)
      .then(function(response_2) {
        return response_2.json();
      })
      .then(function(albumData) {
        let album_img = albumData.message.body.album.album_coverart_100x100;
        $("#result2").html(`
            <div class="col-md-3">
                ${
                  album_img
                    ? `<img
                    src="${album_img}"
                    alt=""
                    style="width: 100%;max-height: 300px; object-fit: cover;"
                    />`
                    : `<img
                    src="https://via.placeholder.com/250x500"
                    alt=""
                    style="width: 100%;max-height: 300px; object-fit: cover;"
                    />`
                }
            </div>
            <div class="col-md-9">
                <h1 id="name">${song_name} lyrics</h1>
                <h4>${lyrics}</h4>
                <p>Last updated: ${last_updated}</p>
                <p>${sponsor}</p>
            </div>
        `);
      });
  });
