public class PdfDocument implements Document {
    @Override
    public void open() {
        System.out.println("Pdf Document opened");
    }

    @Override
    public void save() {
        System.out.println("Pdf Document Saved");
    }

    @Override
    public void close() {
        System.out.println("Pdf Document closed");
    }

}
