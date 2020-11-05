
let notes = [];

renderNotes();

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
            let noteLi = `<li id="${note.id}"><span class="note-title" onclick="">
            ${note.title}</span><button onclick="">Delete</button><br>
            <div class="note-content">${note.content}</div><br></li>`;
            noteList.innerHTML += noteLi;
        }
    }
}