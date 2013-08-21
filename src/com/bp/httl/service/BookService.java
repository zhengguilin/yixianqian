package com.bp.httl.service;

import java.util.List;

import com.bp.httl.domain.Book;

public interface BookService {

	List<Book> findBooks() throws Exception;

}