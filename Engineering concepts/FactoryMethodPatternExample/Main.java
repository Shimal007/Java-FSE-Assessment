public class Main {
    public static void main(String[] args) {
        DocumentFactory wd   = new WordDocumentFactory();
        wd.processDocument();

        DocumentFactory pdf   = new PdfDocumentFactory();
        pdf.processDocument();

        DocumentFactory excel   = new ExcelDocumentFactory();
        excel.processDocument();
    }
}
