package com.example.Marketplace.controllers;

import com.example.Marketplace.models.Product;
import com.example.Marketplace.services.ProductService;
import lombok.AllArgsConstructor;
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
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }
}
