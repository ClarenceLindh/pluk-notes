
let notes = [];

renderNotes();

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
        {
            let noteLi = `
            <li class="note" id="${note.id}">
            <div class="note-title">${note.title}</div>
            <div class="note-content">${note.content}</div><br>
            <div class="note-date">${note.date}</div>
            <button class="deleteButton" onclick="confirmClick (this)">Delete</button><br>
            </li>`;

            noteList.innerHTML += noteLi;
        }
    }
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