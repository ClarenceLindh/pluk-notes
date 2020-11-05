
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
            let noteLi = `<li id="${note.id}"><span onclick="">${note.content}</span><button onclick="">x</button></li>`;
            noteList.innerHTML += noteLi;
        }
    }
}