package com.example.Marketplace.services;

import com.example.Marketplace.models.Cart;
import com.example.Marketplace.models.Product;

public interface CartService {
    Cart getByAccountId(Integer accountId);
    void addToCart(Integer productId, Integer accountId);
    Cart createCart(Integer accountId);
    void changeQuantity(Integer cartDetailId, int quantity);
    void deleteItem(Integer cartDetailId);
}
