import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;

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
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO users ( date, title, content, archived) VALUES (?, ?, ?, ?)");
            stmt.setString(1, note.getDate());
            stmt.setString(1,note.getTitle());
            stmt.setString(2,note.getContent());
            stmt.setBoolean(3, note.getArchived());

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
}

