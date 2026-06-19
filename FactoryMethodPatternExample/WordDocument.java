public class WordDocument implements Document {
    @Override
    public void open() {
        System.out.println("Word Document opened");
    }

    @Override
    public void save() {
        System.out.println("Word Document Saved");
    }

    @Override
    public void close() {
        System.out.println("Word Document closed");
    }
}
