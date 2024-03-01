const divPagination = document.getElementById("pagination");
const buttonPrev = document.getElementById("prev-page");
const buttonNext = document.getElementById("next-page");
const ul_Lista = document.getElementById("character-list");
let currentPage= 1;
let maxPage= 42;

function drawPage (pageNumber, initialLoad){
    fetch("https://rickandmortyapi.com/api/character/?page="+pageNumber)
    .then((response)=>{
        if (!response.ok){
            throw new Error ("La solicitud no fue exitosa");
        }
        return response.json();
    })
    .then((data) =>{
        if (initialLoad){
            maxPage= data.info.pages;
        }
        data.results.forEach((character) => {
            let liPersonaje =document.createElement ("li");
            ul_Lista.appendChild(liPersonaje);
            liPersonaje.innerHTML= 
            "<img src=\"" + character.image + "\" alt=\""+ character.name+"\" ><p>"
            + character.name +"</p>" +
            "<p>"+character.species+"</p>";
        });
    })
    .catch((error)=>{
        ul_Lista.innerText="Error:No se pudo obtener la página"
    });
      
}

drawPage (1, true);

buttonPrev.addEventListener ("click", () => {
    if (currentPage>1){
        ul_Lista.innerHTML="";
        currentPage=currentPage-1;
        drawPage(currentPage, false);
    } 
});

buttonNext.addEventListener ("click", () => {
    if (currentPage<maxPage){
        ul_Lista.innerHTML="";
        currentPage=currentPage+1;
        drawPage(currentPage, false);
    } 
});