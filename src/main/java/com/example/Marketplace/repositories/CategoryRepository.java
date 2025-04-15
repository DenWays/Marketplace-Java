package com.example.Marketplace.repositories;

import com.example.Marketplace.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
