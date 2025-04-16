package com.example.Marketplace.services.impls;

import com.example.Marketplace.models.Account;
import com.example.Marketplace.models.Category;
import com.example.Marketplace.models.Product;
import com.example.Marketplace.repositories.CategoryRepository;
import com.example.Marketplace.repositories.ProductRepository;
import com.example.Marketplace.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
@Primary
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<Product> getProducts(String search, String sortBy, String direction, List<String> categories) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        boolean isSearchEmpty = (search == null || search.trim().isEmpty());
        boolean isCategoriesEmpty = (categories == null || categories.isEmpty());

        if (isSearchEmpty && isCategoriesEmpty) {
            return productRepository.findAll(sort);
        }
        else {
            return productRepository.searchByNameAndCategories(
                    isSearchEmpty ? null : search.trim(),
                    isCategoriesEmpty ? null : categories,
                    sort
            );
        }
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

    @Override
    public void changeQuantity(Integer productId, Integer quantity) throws Exception {
        Product product = productRepository.findById(productId).get();

        if (quantity == 1) {
            product.setQuantity(product.getQuantity() + 1);
        }
        else if (quantity == -1) {
            if (product.getQuantity() > 1) {
                product.setQuantity(product.getQuantity() - 1);
            }
            else {
                throw new Exception("Количество равно 1.");
            }
        }
        else {
            if (quantity <= 0) {
                throw new Exception("Переданное количество отрицательно или равно 0.");
            }
            else {
                product.setQuantity(quantity);
            }
        }

        productRepository.save(product);
    }

    @Override
    public Product editProduct(Product newProduct, Integer productId) {
        Product product = productRepository.findById(productId).get();

        product.setName(newProduct.getName());
        product.setDescription(newProduct.getDescription());
        product.setCategory(newProduct.getCategory());
        product.setQuantity(newProduct.getQuantity());
        product.setPrice(newProduct.getPrice());
        product.setImageUrl(newProduct.getImageUrl());

        productRepository.save(product);
        return product;
    }
}
