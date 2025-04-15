package com.example.Marketplace.services;

import com.example.Marketplace.models.Account;
import com.example.Marketplace.models.Category;
import com.example.Marketplace.models.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts(String search, String sortBy, String direction, List<String> categories);
    Product addProduct(Product product, Account account);
    Product getById(Integer id);
    List<Product> getProductsByAccountId(Integer accountId);
    List<Category> getAllCategories();
    Category addCategory(Category category);
}
