
let notes = [];
let numbers = [];
var count="";     
let editNoteId = null;
let themeButton = document.getElementById('themeBtn')
let imgUrll=null;
let editimageUrl = null;


async function Function1(){
    console.log("LETS RENDER1");
    count++;
    await updateNumber();
    await myFunction();
};


myFunction();


async function myFunction() {
   await getNumbers();
  console.log(" 1st count",count);
  console.log("LETS RENDER3");
    if(count == 1){
        console.log(" 2st count",count);
        document.body.style.backgroundImage =" url('image/coal.jpg')";
        
       
       } 
        
        else if (count==2){ 
            console.log(" 3st count",count);
            document.body.style.backgroundImage =" url('image/0000.jpg')";
       
            
        }
            
           
            else if (count == 3){
                console.log(" 4st count",count);
                count=0;
                document.body.style.backgroundImage =null;
              
            
            }else {
            console.log(" 5st count",count);
          
            console.log(" AEEA"+count);

        }};

  

  
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
        <script>saveNoteId2(this)</script>
        `;
        noteList.innerHTML += noteLi;
        console.log("nuvarande url",imgUrll);
        imgUrll=note.imageUrl;


        if(imgUrll==null){
            let noteLi = `
            <div class="container">

            <div class="header"><span>${note.title}</span></div> 
            <li class="note" id="${note.id}"style="display:none;">
            <div class="note-content">${note.content}</div><br>
            <button class="deleteButton" onclick="confirmClick(this)"><i class="fa fa-trash"></i></button>
            <button class="editButton"  id="${note.imageUrl}" onclick="saveNoteId(this)"><i class="fa fa-edit"></i></button><br>
            <div class="note-date">${date}</div>
         
           
            </li></div>
            `;
            noteList.innerHTML += noteLi;
            console.log("nuvarande url",imgUrll);}
            
            else{
                let noteLi = `
                <div class="container">
                <div class="header"><span>${note.title}</span></div> 
                <li class="note" id="${note.id}"style="display:none;">
                <div class="note-content">${note.content}</div><br>
                <a href="${note.imageUrl}" target="_blank">${note.imageUrl}</a>
                <div class="image"><embed class="em" src="${note.imageUrl}" alt="note-image"></div>
                <button class="deleteButton" onclick="confirmClick(this)"><i class="fa fa-trash"></i></button>
                <button class="editButton" id="${note.imageUrl}" onclick="saveNoteId(this)"><i class="fa fa-edit"></i></button><br>
                <div class="note-date">${date}</div>
                </li></div>
                `;
                noteList.innerHTML += noteLi;
                console.log("nuvarande url",imgUrll);
                
            }

           
    }



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
                <div class="image"><embed src="${note.imageUrl}" alt="note-image"></div>
                <a href="${note.imageUrl}" target="_blank">${note.imageUrl}</a><br>
                <input type="checkbox" id="deleteFile" name="Delete file">
                <label for="deleteFile">Delete file</label><br>
                <input type="text" name="textbox" id="title" Value="${note.title}"><br>                
                <br> 
                <textarea id="content" cols="30" rows="4">${note.content}</textarea><br><br>              
                <input type="file" accept="image/*,.pdf, audio/*, video/*" placeholder="Select image">              
                <button type="submit">Update note</button>
              </form>  </div>  
            </li>`;

            noteList.innerHTML += noteLi;

            }
        
    }
     //  <textarea id="content" cols="30" rows="4">${note.content}</textarea>

}

function saveNoteId(editButton) {
   editNoteId = $(editButton).parent().attr('id');
   console.log('Id for note to edit:', editNoteId);
   renderEditNote(editNoteId);

   editimageUrl =$(editButton).attr("id");
   console.log("id for imageUrl", editimageUrl);
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

    let imageUrl = null;

    let files = document.querySelector('input[type=file]').files;

    console.log('How many files are uploaded: ', files.length);

    if (!files.length == 0) {

        let formData = new FormData();

        for(let file of files) {

        formData.append('files', file, file.name);

        }

        let uploadResult = await fetch('/api/file-upload', {

        method: 'POST',

        body: formData

        });

        imageUrl = await uploadResult.text();

    }

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
    window.location.replace ('index.html');
}

async function updateNote(e) {
    e.preventDefault();

    let imageUrl = editimageUrl;

    let files = document.querySelector('input[type=file]').files;
    console.log('How many files are uploaded: ', files.length);
    if (!files.length == 0) {

    let formData = new FormData();

    for(let file of files) {

        formData.append('files', file, file.name);

    }

    let uploadResult = await fetch('/api/file-upload', {

        method: 'POST',

        body: formData

    });

   imageUrl = await uploadResult.text();

} 

   console.log('URL of current file: ', imageUrl);

    let willFileBeDeleted = document.querySelector("#deleteFile");
    console.log('Value of deleteFile checkbox: ', willFileBeDeleted.checked);
    if (willFileBeDeleted.checked == true) {
        imageUrl = null;
    }


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

async function getNumbers(){
    let result = await fetch('/rest/numbers');
    numbers = await result.json();
    console.log(numbers);

    count=numbers[0].number;

    console.log("WE MADE IT HERE");

}

async function updateNumber() {
   
    
let currentNumber=count;
let push = {
    number:currentNumber
}
let result = await fetch("/rest/numbers", {
    method: "PUT",
    body: JSON.stringify(push)
    
}); 
numbers.push(push);
console.log(await result.text())
}
console.log("END OF MAIN.JS");
