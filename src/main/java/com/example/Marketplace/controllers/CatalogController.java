package com.example.Marketplace.controllers;

import com.example.Marketplace.configs.CustomUserDetails;
import com.example.Marketplace.models.Account;
import com.example.Marketplace.models.Category;
import com.example.Marketplace.models.Product;
import com.example.Marketplace.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/products")
@AllArgsConstructor
public class CatalogController {
    private final ProductService productService;

    @GetMapping
    public List<Product> getProducts(@RequestParam(required = false) String search,
                                     @RequestParam(required = false, defaultValue = "name") String sortBy,
                                     @RequestParam(required = false, defaultValue = "asc") String direction,
                                     @RequestParam(required = false) List<String> categories) {
        return productService.getProducts(search, sortBy, direction, categories);
    }

    @GetMapping("{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getById(id);
    }

    @PostMapping("add")
    @PreAuthorize("hasAuthority('ROLE_CONSUMER')")
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
    @PreAuthorize("hasAuthority('ROLE_CONSUMER')")
    public Category addCategory(@RequestBody Category category) {
        return productService.addCategory(category);
    }
}
