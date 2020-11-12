import express.Express;
import express.middleware.Middleware;
import org.apache.commons.fileupload.FileItem;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
//
public class Main {
//ja
    public static void main(String[] args) {


        Express app = new Express();
        Database db = new Database();



        app.get("/rest/notes", (req, res) -> {
            List<Note>notes = db.getNotes();

            res.json(notes);
        });

        app.get("/rest/notes/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));

            Note note = db.getNotesById(id);

            res.json(note);
        });

        app.post("/rest/notes", (req, res) -> {
            Note note = (Note) req.getBody(Note.class);

            System.out.println(note.toString());

            db.createNote(note);

            res.send("post OK");
        });

        app.delete("/rest/notes", (req, res) -> {
            Note note = (Note) req.getBody(Note.class);

            System.out.println(note.toString());

            db.deleteNote(note);

            res.send("delete OK");
        });

        app.post("/api/file-upload", (req, res) -> {
            String imageUrl = null;

            // extract the file from the FormData
            try {
                List<FileItem> files = req.getFormData("files");
                imageUrl = db.uploadImage(files.get(0));
            } catch (Exception e) {
                // no image uploaded
                e.printStackTrace();
            }

            // return "/uploads/image-name.jpg
            res.send(imageUrl);
        });

        app.put("/rest/notes", (req, res) -> {
            Note note = (Note) req.getBody(Note.class);

            System.out.println("(Put: " + note.toString());

            db.updateNote(note);

            res.send("Note updated OK");
        });

        try {
            app.use(Middleware.statics(Paths.get("src/www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(3000); // defaults to port 80
        System.out.println("Server started on port 3000");
    }
}
