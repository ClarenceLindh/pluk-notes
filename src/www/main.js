
let notes = [];

renderNotes();

function search(needle){
    
    let haystack = $('.note');
    
    console.log('haystack', haystack, 'needle', needle);

    for(let note of haystack){
        let content = $(note).find('.note-content').text();
        console.log('Note content', content);
        if(content.toLowerCase().includes(needle.toLowerCase())){
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

function createNote() {
    var li = document.createElement("LI");
    var inputValue = document.getElementById("note").value;
    var liText = document.createTextNode(inputValue);

    li.appendChild(liText);
    
    if (inputValue === " ") {
        alert("Denna raden får inte vara tom");
    } else {
        document.getElementById("my-ul").appendChild(li);
    }
}

async function renderNotes() {
    await getNotes();
    let noteList = document.querySelector("#notesList ul");

    noteList.innerHTML = "";

    for(let note of notes) {
        {
            let noteLi = `<li class="note" id="${note.id}"><span class="note-title" onclick="">

            ${note.title}</span><button onclick="deleteNote(this)">Delete</button><br>
            <div class="note-content">${note.content}</div><br><br><div class="note-date">${note.date}</div></li>`;

            noteList.innerHTML += noteLi;
        }
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