package com.example.Marketplace.services;

import com.example.Marketplace.models.Account;
import com.example.Marketplace.models.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts();
    Product addProduct(Product product);
    Product getById(Integer id);
    List<Product> getProductsByAccountId(Integer accountId);
}
