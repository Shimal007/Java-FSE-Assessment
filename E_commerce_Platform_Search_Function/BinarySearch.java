package E_commerce_Platform_Search_Function;

public class BinarySearch {
    public static Product search(Product[] products, int key) {
        int low = 0;
        int high = products.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (products[mid].ProductId == key) {
                return products[mid];
            } else if (products[mid].ProductId < key) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return null;
    }
}
