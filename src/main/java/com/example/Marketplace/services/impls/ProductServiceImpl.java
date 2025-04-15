package com.example.Marketplace.services.impls;

import com.example.Marketplace.models.Account;
import com.example.Marketplace.models.Category;
import com.example.Marketplace.models.Product;
import com.example.Marketplace.repositories.CategoryRepository;
import com.example.Marketplace.repositories.ProductRepository;
import com.example.Marketplace.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product, Account account) {
        product.setAccount(account);
        return productRepository.save(product);
    }

    @Override
    public Product getById(Integer id) {
        return productRepository.findById(id).get();
    }

    @Override
    public List<Product> getProductsByAccountId(Integer accountId) {
        return productRepository.findProductsByAccountId(accountId);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }
}
