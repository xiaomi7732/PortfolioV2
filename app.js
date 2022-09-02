function goToPage(path) {
    if (!path) {
        path = "page1";
    }

     document.getElementsByClassName("main-page-content")

    var targetPage = document.getElementById(path);
    targetPage.setAttribute("class", "visible-page");

}