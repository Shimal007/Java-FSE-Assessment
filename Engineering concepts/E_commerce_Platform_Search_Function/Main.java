package E_commerce_Platform_Search_Function;

public class Main {
    public static void main(String[] args) {
        Product arr[] = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Mobile", "Electronics"),
                new Product(103, "Shirt", "Clothing"),
                new Product(104, "Shoes", "Footwear")
        };
        System.out.println("Linear Search");
        Product linear = LinearSearch.search(arr, 106);
        if (linear != null) {
            linear.display();
        } else {
            System.out.println("Product Not Found");
        }
        System.out.println("Binary Search");
        Product binary = BinarySearch.search(arr, 103);
        if (binary != null) {
            binary.display();
        } else {
            System.out.println("Product Not Found");
        }

    }
}
