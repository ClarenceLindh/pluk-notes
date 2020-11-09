import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;

import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.*;
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

    public List<Note> getNotes(){
        List<Note> notes =  null;
        try {
            PreparedStatement stmt=conn.prepareStatement("SELECT * FROM notes");
            ResultSet rs=stmt.executeQuery();

            Note[] notesFromRS= (Note[]) Utils.readResultSetToObject(rs , Note[].class);
            notes = List.of(notesFromRS);


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return notes;
    }

    public  Note getNotesById (int id){

        Note note = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM notes WHERE id = ?");
            stmt.setInt(1, id);
            ResultSet rs= stmt.executeQuery();

            Note[]notesFromRs = (Note[]) Utils.readResultSetToObject(rs, Note[].class);


            note = notesFromRs[0];
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return note;

    }

    public void createNote ( Note note){
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO users ( name, age) VALUES (?,?)");
            stmt.setString(1,note.getTitle());
            stmt.setString(2,note.getContent());

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

//    public String uploadImage(FileItem image) {
//        // the uploads folder in the "www" directory is accessible from the website
//        // because the whole "www" folder gets served, with all its content
//
//        // get filename with file.getName()
//        String imageUrl = "/uploads/" + image.getName();
//
//        // open an ObjectOutputStream with the path to the uploads folder in the "www" directory
//        try (var os = new FileOutputStream(Paths.get("src/www" + imageUrl).toString())) {
//            // get the required byte[] array to save to a file
//            // with file.get()
//            os.write(image.get());
//        } catch (Exception e) {
//            e.printStackTrace();
//            // if image is not saved, return null
//            return null;
//        }
//
//        return imageUrl;
//    }


}

