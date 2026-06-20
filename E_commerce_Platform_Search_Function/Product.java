package E_commerce_Platform_Search_Function;

class Product {
    int ProductId;
    String ProductName;
    String Category;

    public Product(int ProductId, String ProductName, String Category) {
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.Category = Category;
    }

    public void display() {
        System.out.println("Product ID:" + ProductId);
        System.out.println("Product Name:" + ProductName);
        System.out.println("Category:" + Category);
    }
}