package com.example.Marketplace.controllers;

import com.example.Marketplace.configs.CustomUserDetails;
import com.example.Marketplace.models.Account;
import com.example.Marketplace.models.Category;
import com.example.Marketplace.models.Product;
import com.example.Marketplace.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/products")
@AllArgsConstructor
public class CatalogController {
    private final ProductService productService;

    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getById(id);
    }

    @PostMapping("add")
    public Product addProduct(@RequestBody Product product, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return productService.addProduct(product, userDetails.getAccount());
    }

    @GetMapping("account/{accountId}")
    public List<Product> getProductsByAccountId(@PathVariable Integer accountId) {
        List<Product> asd = productService.getProductsByAccountId(accountId);
        return productService.getProductsByAccountId(accountId);
    }

    @GetMapping("categories")
    public List<Category> getAllCategories() {
        return productService.getAllCategories();
    }

    @PostMapping("addCategory")
    public Category addCategory(@RequestBody Category category) {
        return productService.addCategory(category);
    }
}
