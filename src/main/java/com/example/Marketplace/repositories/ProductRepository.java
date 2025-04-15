package com.example.Marketplace.repositories;

import com.example.Marketplace.models.Account;
import com.example.Marketplace.models.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findProductsByAccountId(Integer accountId);
    @Query("""
        SELECT p FROM Product p
        WHERE (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')))
            AND (:categories IS NULL OR p.category.name IN :categories)
    """)
    List<Product> searchByNameAndCategories(
            @Param("search") String search,
            @Param("categories") List<String> categories,
            Sort sort
    );
}
