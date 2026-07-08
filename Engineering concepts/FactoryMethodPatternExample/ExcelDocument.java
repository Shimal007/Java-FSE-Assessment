public class ExcelDocument implements Document {
    @Override
    public void open() {
        System.out.println("Excel Document opened");
    }

    @Override
    public void save() {
        System.out.println("Excel Document Saved");
    }

    @Override
    public void close() {
        System.out.println("Excel Document closed");
    }
}
