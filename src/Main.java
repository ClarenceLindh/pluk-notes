import express.Express;
import express.middleware.Middleware;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        Express app = new Express();
        Database db=new Database();

        app.get("/rest/users",(req, res)->{
            List<Note> notes =db.getNotes();
            res.json(notes);
        });

        app.get("/rest/users/:id", (req,res)->{
            int id=Integer.parseInt(req.getParam("id"));

            Note note = db.getNotesById(id);
            res.json(note);
        });

        app.post("/rest/users", (req,res) -> {
            Note note = (Note) req.getBody(Note.class);

            System.out.println(note.toString());

            db.createNote(note);
            res.send(" post ok");
        });

        try {
            app.use(Middleware.statics(Paths.get("src/www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }


        app.listen(3000);//defaults to port 80
        System.out.println("Server started on port 3000");
    }
}

