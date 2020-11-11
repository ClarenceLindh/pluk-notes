
let notes = [];



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

    noteList.innerHTML = "";
    

    for(let note of notes) {
        let date = new Date(note.date).toLocaleString();
        
            let noteLi = `
            <div class="container">
            <div class="header"><span>${note.title}</span></div>
            <li class="note" id="${note.id}"style="display:none;">
            <div class="note-title">${note.title}</div>
            <div class="note-content">${note.content}</div><br>
            <div class="note-date">${date}</div>
            <div class="image"><img src="${note.imageUrl}"></div>
            <button class="deleteButton" onclick="confirmClick (this)">Delete</button><br>
            </li></div>
            `;

            noteList.innerHTML += noteLi;
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

async function confirmClick(removeButton){
    let taskId = $(removeButton).parent().attr('id');
    if (confirm('Are you sure?')){
        deleteNote (removeButton);
    } else {
        renderNotes ();
    }
}

async function deleteNote(removeButton){
    let taskId = $(removeButton).parent().attr('id');
    console.log('ID:', taskId)
    
    let task = {
        id: taskId,
    }

    let result = await fetch("/rest/notes", {
        method: "DELETE",
        body: JSON.stringify(task)
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

