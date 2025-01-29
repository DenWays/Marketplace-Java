package com.example.Marketplace.repositories;

import com.example.Marketplace.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findByAccountId(Integer accountId);
}
