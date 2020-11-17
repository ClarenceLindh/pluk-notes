public class Numbers {

    private int number;
    private int id;
    public Numbers(){
    }

    public Numbers(int number, int id) {
        this.number = number;
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Numbers{" +
                "number=" + number +
                ", id=" + id +
                '}';
    }
}







