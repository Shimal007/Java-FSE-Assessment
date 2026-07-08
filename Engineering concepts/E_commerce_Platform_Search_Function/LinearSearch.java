package E_commerce_Platform_Search_Function;

class LinearSearch {
    public static Product search(Product[] products, int key) {
        for (Product p : products) {
            if (p.ProductId == key) {
                return p;
            }
        }
        return null;
    }
}