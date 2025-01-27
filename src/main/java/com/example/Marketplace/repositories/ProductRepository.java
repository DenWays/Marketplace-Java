package com.example.Marketplace.repositories;

import com.example.Marketplace.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
