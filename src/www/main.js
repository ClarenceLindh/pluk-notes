
let notes = [];

renderNotes();

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
            let noteLi = `<li id="${note.id}"><span class="note-title" onclick="">
            ${note.title}</span><button onclick="">Delete</button><br>
            <div class="note-content">${note.content}</div><br><div class="note-date">${note.date}</div></li>`;
            noteList.innerHTML += noteLi;
        }
    }
}