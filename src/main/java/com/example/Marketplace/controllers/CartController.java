package com.example.Marketplace.controllers;

import com.example.Marketplace.configs.CustomUserDetails;
import com.example.Marketplace.models.Cart;
import com.example.Marketplace.services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/")
    public Cart getCartByAccountId(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return cartService.getByAccountId(userDetails.getAccount().getId());
    }

    @PostMapping("addtocart/{productId}")
    public void addToCart(@PathVariable Integer productId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        cartService.addToCart(productId, userDetails.getAccount().getId());
    }

    @DeleteMapping("deleteItem/{cartDetailId}")
    public void deleteItem(@PathVariable Integer cartDetailId) {
        cartService.deleteItem(cartDetailId);
    }

    @PostMapping("changeQuantity/{cartDetailId}/{quantity}")
    public void changeQuantity(@PathVariable Integer cartDetailId, @PathVariable int quantity) {
        cartService.changeQuantity(cartDetailId, quantity);
    }
}
