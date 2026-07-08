package com.library.service;

import com.library.repository.BookRepository;
public class BookService {
    public BookService(){
        System.out.println("BookService Object Created");
    }
    public void show() {
        System.out.println("BookService Method Called");
    }
}
