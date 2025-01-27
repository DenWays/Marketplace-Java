package com.example.Marketplace.services.impls;

import com.example.Marketplace.models.Account;
import com.example.Marketplace.models.Product;
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

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product addProduct(Product product) {
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
}
