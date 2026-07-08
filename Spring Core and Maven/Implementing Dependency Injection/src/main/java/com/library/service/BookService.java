package com.library.service;

import com.library.repository.BookRepository;
public class BookService {
    public BookRepository repository;
    public BookService(){
        System.out.println("BookService Object Created");
    }
    public void setRepository(BookRepository repository) {
        this.repository = repository;
    }
    public void show() {
        System.out.println("BookService Method Called");
        repository.display();
    }
}
