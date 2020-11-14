import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.*;
import java.time.Instant;
import java.util.List;

public class Database {

    private Connection conn;

    public Database() {
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:pluknotes.db");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
    public List<Numbers> getNumbers(){
    List<Numbers> numbers= null;
    try {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM numbers");
        ResultSet rs = stmt.executeQuery();

        Numbers[] numbersFromRS = (Numbers[]) Utils.readResultSetToObject(rs, Numbers[].class);
        numbers= List.of(numbersFromRS);
    } catch (SQLException throwables) {
        throwables.printStackTrace();
    } catch (JsonProcessingException e) {
        e.printStackTrace();
    }

    return numbers;

}
    public void createNumber(Numbers number){
        try{
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO numbers(number) VALUES (?)");
            stmt.setInt(1, number.getNumber());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
    public void deleteNumber(Numbers number) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM numbers WHERE id = ?");
            stmt.setInt(1, number.getId());

            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }
    public void updateNumber(Numbers number) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE numbers SET number = ?");

            stmt.setInt(1, number.getNumber());

            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }



    public List<Note> getNotes() {
        List<Note> notes = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM notes ORDER BY date DESC");
            ResultSet rs = stmt.executeQuery();

            Note[] notesFromRS = (Note[]) Utils.readResultSetToObject(rs, Note[].class);
            notes= List.of(notesFromRS);

//            while (rs.next()) {
//                int id = rs.getInt("id");
//                String name = rs.getString("name");
//                int age = rs.getInt("age");
//
//                Note note = new Note(name, age);
//                notes.add(note);
//            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return notes;
    }

    public Note getNotesById(int id) {
        Note note = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM notes WHERE id = ?");
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();

            Note[] noteFromRS = (Note[]) Utils.readResultSetToObject(rs, Note[].class);

            note = noteFromRS[0];

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return note;
    }

    public void createNote(Note note) {
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO notes (date, title, content, imageUrl) VALUES(?, ?, ?, ?)");
            stmt.setLong(1, Instant.now().toEpochMilli());
            stmt.setString(2, note.getTitle());
            stmt.setString(3, note.getContent());
            stmt.setString(4, note.getImageUrl());


            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }

    public void updateNote(Note note) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE notes SET date = ?, title = ?, content = ?, " +
                    "imageUrl = ?" +
                    "WHERE id = ?");
            stmt.setLong(1, Instant.now().toEpochMilli());
            stmt.setString(2, note.getTitle());
            stmt.setString(3, note.getContent());
            stmt.setString(4, note.getImageUrl());
            stmt.setInt(5, note.getId());

            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void deleteNote(Note note) {
        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM notes WHERE id = ?");
            stmt.setInt(1, note.getId());

            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


    }

    public String uploadImage(FileItem image) {
        // the uploads folder in the "www" directory is accessible from the website
        // because the whole "www" folder gets served, with all its content

        // get filename with file.getName()
        String imageUrl = "/uploads/" + image.getName();

        // open an ObjectOutputStream with the path to the uploads folder in the "www" directory
        try (var os = new FileOutputStream(Paths.get("src/www" + imageUrl).toString())) {
            // get the required byte[] array to save to a file
            // with file.get()
            os.write(image.get());
        } catch (Exception e) {
            e.printStackTrace();
            // if image is not saved, return null
            return null;
        }

        return imageUrl;
    }
}