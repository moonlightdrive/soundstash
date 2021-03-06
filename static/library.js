"use strict";

var SORT_TITLE_ASC = 1;
var SORT_TITLE_DEC = 2;
var SORT_ARTIST_ASC = 3;
var SORT_ARTIST_DEC = 4;

var sortmode = 0;

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
//var csrftoken = getCookie('csrftoken');

function submit_song() {
	var urlfield = document.getElementById("Song URL");
	var titlefield = document.getElementById("Song Title");
	var artistfield = document.getElementById("Artist");

	if (urlfield.value != "" &&
		titlefield.value != "" &&
		artistfield.value != "") {

		post_newsong(titlefield.value, artistfield.value, urlfield.value, loadSongs);
		$("#submit_modal").modal("hide");
    urlfield.value = "";
		titlefield.value = "";
		artistfield.value = "";
	} else {
		console.log("Some fields are empty");
		return;
	}
}

// lulz too similar to delete_list 
function delete_list_by_slug(slug) {
    var csrftoken = getCookie('csrftoken');
    if (!csrftoken) {
	console.log("Something went wrong getting the csrf token");
	return;
    }
    
    var req = new XMLHttpRequest();
    req.open("DELETE", "/library/"+slug, true);
    
    /*req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      req.setRequestHeader("Content-length", params.length);*/
    req.setRequestHeader("X-CSRFToken", csrftoken);
    req.setRequestHeader("Connection", "close");
    
    req.onreadystatechange = function (e) {
	if (req.readyState == XMLHttpRequest.DONE) {
	    if (req.status == 200) {
		console.log("It worked, probably");
                window.location.reload(false);
	    } else {
		console.log("It didn't work (status: " + req.status + ")");
	    }
	}
    }
    req.send();
}

function delete_list() {
	var csrftoken = getCookie('csrftoken');
	if (!csrftoken) {
		console.log("Something went wrong getting the csrf token");
		return;
	}
	
	var req = new XMLHttpRequest();
	req.open("DELETE", "#", true);
	
	/*req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", params.length);*/
	req.setRequestHeader("X-CSRFToken", csrftoken);
	req.setRequestHeader("Connection", "close");
	
	req.onreadystatechange = function (e) {
		if (req.readyState == XMLHttpRequest.DONE) {
			if (req.status == 200) {
				console.log("It worked, probably");
				callback();
			} else {
				console.log("It didn't work (status: " + req.status + ")");
			}
		}
	}
	req.send();
}

function delete_song(pk, callback) {
	var csrftoken = getCookie('csrftoken');
	if (!csrftoken) {
		console.log("Something went wrong getting the csrf token");
		return;
	}
	
	var req = new XMLHttpRequest();
	req.open("DELETE", ""+pk+"/", true);
	
	/*req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", params.length);*/
	req.setRequestHeader("X-CSRFToken", csrftoken);
	req.setRequestHeader("Connection", "close");
	
	req.onreadystatechange = function (e) {
		if (req.readyState == XMLHttpRequest.DONE) {
			if (req.status == 200) {
				console.log("It worked, probably");
				callback();
			} else {
				console.log("It didn't work (status: " + req.status + ")");
			}
		}
	}
	req.send("");
}

function post_newsong(title, artist, url, callback) {
	var csrftoken = getCookie('csrftoken');
	if (!csrftoken) {
		console.log("Something went wrong getting the csrf token");
		return;
	}

	var req = new XMLHttpRequest();
	var params = "url=" + encodeURIComponent(url) + "&artist=" + encodeURIComponent(artist) + "&title=" + encodeURIComponent(title);
	req.open("POST", "#", true);

	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", params.length);
	req.setRequestHeader("Connection", "close");
	req.setRequestHeader("X-CSRFToken", csrftoken);

	req.onreadystatechange = function (e) {
		if (req.readyState == XMLHttpRequest.DONE) {
			if (req.status == 200) {
				console.log("It worked, probably");
				callback();
			} else {
				console.log("It didn't work (status: " + req.status + ")");
			}
		}
	}
	req.send(params);
}

function post_newlist(name, callback) {
	var csrftoken = getCookie('csrftoken');
	if (!csrftoken) {
		console.log("Something went wrong getting the csrf token");
		return;
	}

	var req = new XMLHttpRequest();
	var params = "name="+encodeURIComponent(name);
	req.open("POST", "/library/", true);

	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", params.length);
	req.setRequestHeader("Connection", "close");
	req.setRequestHeader("X-CSRFToken", csrftoken);

	req.onreadystatechange = function (e) {
		if (req.readyState == XMLHttpRequest.DONE) {
			if (req.status == 200) {
				console.log("It worked, probably");
				callback();
			} else {
				console.log("It didn't work (status: " + req.status + ")");
			}
		}
	}
	req.send(params);
}

function bullshit() {
	var len = Math.floor(Math.random() * 20) + 5;
	var shits = "qwertyuiopasdfghjklzxcvbnm1234567890._";
	var s = "";
	for (var i = 0; i < len; i++) {
		var l = shits.charAt(Math.floor(Math.random() * shits.length));
		s += l;
	}
	return s;
}

function make_testjson() {
	var test = [];
	for (var i = 0; i < 20; i++) {
		var tests = {};
		tests.title = bullshit();
		tests.url = bullshit();
		tests.artist = bullshit();
		test.push(tests);
	}
	console.log(JSON.stringify(test));
}

function toggleSortTitle() {
	return toggleSort(true);
}
function toggleSortArtist() {
	return toggleSort(false);
}

function toggleSort(title) {
	var tca = document.getElementById("titlesort-chev-up");
	tca.style.display = "none";
	var tcd = document.getElementById("titlesort-chev-down");
	tcd.style.display = "none";
	var aca = document.getElementById("artistsort-chev-up");
	aca.style.display = "none";
	var acd = document.getElementById("artistsort-chev-down");
	acd.style.display = "none";

	if (title) {
		if (sortmode == SORT_TITLE_ASC) {
			sortmode = SORT_TITLE_DEC;
			tcd.style.display = "";
		} else {
			sortmode = SORT_TITLE_ASC;
			tca.style.display = "";
		}
	} else {
		if (sortmode == SORT_ARTIST_ASC) {
			sortmode = SORT_ARTIST_DEC;
			acd.style.display = "";
		} else {
			sortmode = SORT_ARTIST_ASC;
			aca.style.display = "";
		}
	}

	updateSort();
}

function updateSort() {
	var tbody = document.getElementById("lib-table").getElementsByTagName("tbody")[0];
	var col,
	asc;
	switch (sortmode) {
	case SORT_TITLE_ASC:
		col = 0;
		asc = 1;
		break;
	case SORT_TITLE_DEC:
		col = 0;
		asc = -1;
		break;
	case SORT_ARTIST_ASC:
		col = 1;
		asc = 1;
		break;
	case SORT_ARTIST_DEC:
		col = 1;
		asc = -1;
		break;
	default:
		return;
	}

	var rows = tbody.rows,
	rlen = rows.length,
	arr = new Array(),
	i,
	j,
	cells,
	clen;
	// fill the array with values from the table
	for (i = 0; i < rlen; i++) {
		cells = rows[i].cells;
		clen = cells.length;
		arr[i] = new Array();
		for (j = 0; j < clen; j++) {
			arr[i][j] = cells[j].innerHTML;
		}
	}
	// sort the array by the specified column number (col) and order (asc)
	arr.sort(function (a, b) {
		if (col == 0) {
			var ac = a[col].split(/<|>/)[2];
			var bc = b[col].split(/<|>/)[2];
			return (ac == bc) ? 0 : ((ac > bc) ? asc : -1 * asc);
		}
		return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
	});
	for (i = 0; i < rlen; i++) {
		arr[i] = "<td>" + arr[i].slice(0, 3).join("</td><td>") + "</td><td class=\"pk_col\" style=\"display: none\">" + arr[i][3] + "</td>";
	}
	tbody.innerHTML = "<tr>" + arr.join("</tr><tr>") + "</tr>";
}

function clearSongs() {
	var tbody = document.getElementById("lib-table").getElementsByTagName("tbody")[0];
	while (tbody.lastChild) {
		tbody.removeChild(tbody.lastChild);
	}
}

function loadPlaylists() {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function (e) {
		if (req.readyState == XMLHttpRequest.DONE) {
			var text = req.responseText;
			if (text) {
				var lists = JSON.parse(text);
				var ui = document.getElementById("list_group");
				for (var i = 0; i < lists.length; i++) {
					var name = lists[i].name;
					var slug = lists[i].slug;
					//console.log(name);
					var link = document.createElement("a");
					link.href = "/library/" + slug;
					link.innerHTML = name;
					var div = document.createElement("div");
					div.appendChild(link);
					ui.appendChild(div);
				}
			} else {
				alert("An error occurred loading the playlists");
			}
		}
	};
	req.open("GET", "/playlists/all");
	req.send();
}

function loadSongs() {
	clearSongs();
	var songreq = new XMLHttpRequest();
	songreq.onreadystatechange = function (e) {
		if (songreq.readyState == XMLHttpRequest.DONE) {
			var text = songreq.responseText;
			if (text) {
				addSongs(JSON.parse(text));
				updateSort();
			} else {
				alert("An error occurred loading the song database");
			}
		}
	};
	songreq.open("GET", "library_json/");
	songreq.send();
}

function searchIfSpace(e) {
	if (e.keyCode === 13) {
		doSearch();
	}
}

function doSearch() {
	var searchfield = document.getElementById("lib-search-field");
	var searchtext = searchfield.value;
	var tbody = document.getElementById("lib-table").getElementsByTagName("tbody")[0];

	for (var r = 0; r < tbody.rows.length; r++) {
		var found = false;
		var row = tbody.rows[r];
		for (var c = 0; c < row.children.length; c++) {
			//console.log(row.children[c]);
			var text = row.children[c].innerHTML;
			if (text.toUpperCase().indexOf(searchtext.toUpperCase()) != -1) {
				found = true;
				break;
			}
		}
		if (found) {
			row.style.display = "";
		} else {
			row.style.display = "none";
		}
	}
}

function addSongs(songs) {
	var table = document.getElementById("lib-table");
	var tbody = table.getElementsByTagName("tbody")[0];
	for (var si in songs) {
		var song = songs[si];
		tbody.appendChild(addSongHTML(song));
	}
	//console.log(songs);
}

function addSongHTML(song) {
	var row = document.createElement("tr");
	var title = document.createElement("td");
	var url = document.createElement("a");
	var artist = document.createElement("td");
	url.href = song.url;
	url.innerHTML = song.title;
	artist.innerHTML = song.artist;
	title.appendChild(url);
	row.appendChild(title);
	row.appendChild(artist);
	/* NEW */
	row.appendChild(optionsColumn(song))
	/* END NEW */
	var pk = document.createElement("td");
	pk.className = "pk_col";
	pk.style.display = "none";
	pk.innerHTML = song.pk;
	row.appendChild(pk);

	return row;
}

function optionsColumn(song) {
	var opt = document.createElement("td");
	var close = document.createElement("a");
	var span = document.createElement("span");
	var att = document.createAttribute("class");
	att.value = "glyphicon glyphicon-remove";
	span.setAttributeNode(att);
	close.onclick = function() {
		var row = close.parentNode.parentNode;
		var pkcol = row.getElementsByClassName("pk_col")[0];
		delete_song(parseInt(pkcol.innerHTML), loadSongs);
	}
	close.appendChild(span);
	opt.appendChild(close);
	return opt;
}

//That's right... three nested requests
function submit_playlist() {
	var lists = null;
	var name = document.getElementById("Playlist_name").value;
	
	var req = new XMLHttpRequest();
	req.onreadystatechange = function (e) {
		if (req.readyState == XMLHttpRequest.DONE) {
			var text = req.responseText;
			var lists = null;
			if (text) {
				lists = JSON.parse(text);
			} else {
				console.log("an error occurred loading the playlists (status: "+req.status+")");
			}
			
			if (lists != null) {
				for (var i = 0; i < lists.length; i++) {
					if (name == lists[i].name) {
						//already exists!
						alert("A playlist with that name already exists!");
						return false;
					}
				}
			}
			
			post_newlist(name, function() {
				//get the playlist list AGAIN so we can get the slug
				var req2 = new XMLHttpRequest();
				req2.onreadystatechange = function (e) {
					if (req2.readyState == XMLHttpRequest.DONE) {
						var text = req2.responseText;
						if (text) {
							var lists = JSON.parse(text);
							var slug = null;
							for (var i = 0; i < lists.length; i++) {
								if (name == lists[i].name) {
									slug = lists[i].slug;
									break;
								}
							}
							if (slug) {
								$(location).attr("href", "/library/"+slug);
							} else {
								console.log("Something horrible happened!");
							}
						} else {
							console.log("An error occurred loading the playlists (status: "+req2.status+")");
						}
					}
				};
				req2.open("GET", "/playlists/all/");
				req2.send();
			});
		}
	};
	req.open("GET", "/playlists/all/");
	req.send();
	
	return false;
}

function attachHandlers() {
	// listen for search-box changes & run search
	$("#lib-search-field").bind('input', function() {
		doSearch();
	});

	return;
}
