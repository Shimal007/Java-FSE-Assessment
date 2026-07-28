package org.example.library;

import java.awt.print.Book;

public class BookService {
    private BookRepository repository;

    public void setRepository(BookRepository repository) {
        this.repository = repository;
    }
    public void showBook(){
        System.out.println("Book Service");
        repository.displayBook();
    }
}
