package com.example.Marketplace.repositories;

import com.example.Marketplace.models.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
}
