import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        // write your code here

        Express app = new Express();


        try {
            app.use(Middleware.statics(Paths.get("src/www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }


        app.listen(3000);//defaults to port 80
        System.out.println("Server started on port 3000");
    }
}

