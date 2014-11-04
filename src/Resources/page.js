var prehashval = "";
function loop()
{
    if (location.hash.slice(1)!=prehashval)
        hashChanged();

    prehashval = location.hash.slice(1);
    setTimeout("loop()", 100);
}
function hashChanged()
{
    var page_name = location.hash.slice(1);
    loadPage(page_name);
}

function loadPage(name)
{
    var pages = document.getElementsByClassName("page");
    if (pages.length==0) {
        setTimeout("loadPage('"+name+"')", 100);
        return;
    }
    var is_page_showing = false;
    for (var i=0; i < pages.length; i++) {
        if (name == pages[i].id) {
            pages[i].style.display = "";
            is_page_showing = true;
        } else {
            pages[i].style.display = "none";
        }
    }

    if (!is_page_showing) {
        pages[0].style.display = "";
    }
}

function nextPage()
{
    var pages = document.getElementsByClassName("page");
    var current_index = 0;
    for (var i=0; i < pages.length; i++) {
        if (location.hash.slice(1) == pages[i].id) {
            current_index = i;
        }
    }

    current_index++;
    if (current_index >= pages.length) {
        current_index = pages.length-1;
    }

    location.hash = "#" + pages[current_index].id
}
function prevPage()
{
    var pages = document.getElementsByClassName("page");
    var current_index = 0;
    for (var i=0; i < pages.length; i++) {
        if (location.hash.slice(1) == pages[i].id) {
            current_index = i;
        }
    }

    current_index--;
    if (current_index < 0) {
        current_index = 0;
    }

    location.hash = "#" + pages[current_index].id
}
function homePage()
{
    var pages = document.getElementsByClassName("page");
    location.hash = "#" + pages[0].id
}
loop();
window.onload = function(){
    hashChanged();
    if (localStorage.ran==null){
        localStorage.ran = true;
        alert("Use the arrow keys to navigate backward and forward.");
    }
}
window.onkeyup = function(e) {
    if (e.key == "Right" || e.keyIdentifier == "Right"){
        nextPage();
    } else if (e.key == "Left" || e.keyIdentifier == "Left") {
        prevPage();
    } else if (e.key == "Home" || e.keyIdentifier == "Home") {
        homePage();
    }
}