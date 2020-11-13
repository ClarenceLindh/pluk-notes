
let notes = [];

let editNoteId = null;
let imgUrll= null;




indexRenderNotes();

function indexRenderNotes() {
    if($('body').is('.index')){
        renderNotes();
    }
}



function search(needle){
    
    let haystack = $('.note');
    
    console.log('haystack', haystack, 'needle', needle);

    for(let note of haystack){
        let content = $(note).find('.note-content').text();
        let title = $(note).find('.note-title').text();
        console.log('Note content: ', content);
        console.log('Note title: ', title);

        if(title.toLowerCase().includes(needle.toLowerCase()) || content.toLowerCase().includes(needle.toLowerCase())){
            $(note).show();
        } else {
            $(note).hide();
        }
    }
}


async function getNotes() {
    let result = await fetch('/rest/notes');
    notes = await result.json();

}


async function renderNotes() {
    await getNotes();
    let noteList = document.querySelector("#notesList ul");
    console.log("nuvarande url",imgUrll);

    noteList.innerHTML = "";
    
    
    for(let note of notes) {
        let date = new Date(note.date).toLocaleString();
            
            let noteLi = `
            <div class="container">
            <div class="header"><span>${note.title}</span></div>
            <li class="note" id="${note.id}"style="display:none;">
            <div class="note-content">${note.content}</div><br>
            <div class="note-date">${date}</div>
            <div class="imgParent">
             <button id="${note.imageUrl}" onclick="saveNoteId2(this)">skit</button>
             <div class="image"><embed class="em" src="${note.imageUrl}" alt="note-image"></div>
             </div>
            <button class="deleteButton" onclick="confirmClick(this)">Delete</button><br>
            <button class="editButton" onclick="saveNoteId(this)">Edit</button><br>
         
            <script> 
             </script>
            </li></div>
            `;

            noteList.innerHTML += noteLi;
            console.log("nuvarande url",imgUrll);
    }

   // <button id="${note.imageUrl}" onclick="saveNoteId2(this)">bhas</button>

    
   
   var ParentImage = document.querySelectorAll(".imgParent");// Tar alla img.parent klasser och sätter in i variablen Parent Image
    for (var index = 0; index <ParentImage.length; index++){ // Loopar igenom alla parent.image 
        console.log("fsdsfdf",ParentImage[0]);
     ParentImage[index].addEventListener("click", function(){ //lyssnar på en specifik parentimage och gör sedna koden på just den
         this.classList.toggle("active");
      });

    


    ParentImage[index].querySelector("button").addEventListener("click", //tar en specifik knapp fårn parentimage och kör en funktion
      function testing(){

        



        if(imgUrll=="null"){
         this.closest(".imgParent").remove();
         console.log("bild element tas bort");}else (console.log("anteckningens url är ej  = null"));
    });
    }
 
    

/*

async function rensaskit(){
    let noteId = $(e).parent();
     noteId.removeChild(image);

    renderNotes()
    let button2 = document.getElementById('testdel');

button2.addEventListener("click", function removeImageifnull(e){
    vadsomhelst(e);
    });

    async function vadsomhelst(e){
    var image = document.querySelector(".image");
    var imgParent = document.querySelector(".imgParent");
    var emb = document.querySelector (".em");
    var unknown = "(unknown)";
    console.log(emb);

    imgParent.removeChild(image);
    console.log(image);
    console.log(e);
    }
    */

    /*
function removeImageifnull(){
var image = document.querySelector(".image");
var imgParent = document.querySelector(".imgParent");
var emb = document.querySelector (".em");
var unknown = "(unknown)";
console.log(emb);

if (emb === (unknown)){
    imgParent.removeChild (image);
}
//imgParent.removeChild(image);
console.log(image);
} 
*/

    $(".header").click(function () {
       
        $header = $(this);
        //getting the next element
        $content = $header.next();
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideToggle(15, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            $header.text(function () {
                //change text based on condition
                //return $content.is(":visible")
            });
        });
    
    });
}



async function renderEditNote(id) {
    await getNotes();
    let noteList = document.querySelector("#notesList ul");
    noteList.innerHTML = "";
    
    for(let note of notes) {

        if (id == note.id) {
            
            let noteLi = `
            <li class="currentNoteId" id="${note.id}">
            <div class="addNoteContainer">
            <button onclick="renderNotes();">Back</button>
            <h3>Edit Note!</h3>
            <form onsubmit="updateNote(event)">                
                <div class="image"><embed src="${note.imageUrl}" alt="note-image"></div><br>
                <input type="text" name="textbox" id="title" Value="${note.title}"><br>                
                <br> 
                <input type ="text" id="content" Value="${note.content}"><br><br>              
                <input type="file" accept="image/*,.pdf, audio/*, video/*" placeholder="Select image">              
                <button type="submit">Update note</button>
              </form>  </div>  
            </li>`;

            noteList.innerHTML += noteLi;
            }
        
    }
       
}

function saveNoteId(editButton) {
   editNoteId = $(editButton).parent().attr('id');
   console.log('Id for note to edit:', editNoteId);
   renderEditNote(editNoteId);   
}

function saveNoteId2(editButton) {
  // imgUrll = $(editButton).parent().attr('id');
    
  imgUrll = $(editButton).attr('id');
    console.log('Id for note to edit:', imgUrll);
   
    
 }
 

async function confirmClick(removeButton){
    //let noteId = $(removeButton).parent().attr('id');
    if (confirm('Are you sure?')){
        deleteNote (removeButton);
    } else {
        renderNotes ();
    }
}

async function deleteNote(removeButton){
    let noteId = $(removeButton).parent().attr('id');
    console.log('ID:', noteId)
    
    let note = {
        id: noteId,
    }

    let result = await fetch("/rest/notes", {
        method: "DELETE",
        body: JSON.stringify(note)
    });

    console.log(await result.text());

    renderNotes()
}




async function createNote(e) {
    e.preventDefault();

    let files = document.querySelector('input[type=file]').files;
    let formData = new FormData();

    for(let file of files) {

        formData.append('files', file, file.name);

    }

    let uploadResult = await fetch('/api/file-upload', {

        method: 'POST',

        body: formData

    });

    let imageUrl = await uploadResult.text();
    console.log('URL', imageUrl);

    let titleInput = document.querySelector("#title");
    let contentInput = document.querySelector("#content");

    let note = {
        title: titleInput.value,
        content: contentInput.value,
        imageUrl: imageUrl
    }
    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
        
    });
    
    notes.push(note);

    console.log(await result.text())
    renderNotes()
}

async function updateNote(e) {
    e.preventDefault();

    let files = document.querySelector('input[type=file]').files;
    let formData = new FormData();

    for(let file of files) {

        formData.append('files', file, file.name);

    }

    let uploadResult = await fetch('/api/file-upload', {

        method: 'POST',

        body: formData

    });

   let imageUrl = await uploadResult.text();
   console.log('URL', imageUrl);

    let titleInput = document.querySelector("#title");
    let contentInput = document.querySelector("#content");

    let note = {
        title: titleInput.value,
        content: contentInput.value,
        id: editNoteId,
        imageUrl: imageUrl
    }
    let result = await fetch("/rest/notes", {
        method: "PUT",
        body: JSON.stringify(note)
        
    });
    
    notes.push(note);

    console.log(await result.text())
    renderNotes();
}

