package com.example.Marketplace.controllers;

import com.example.Marketplace.configs.CustomUserDetails;
import com.example.Marketplace.models.PurchaseOrder;
import com.example.Marketplace.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/orders")
@AllArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/")
    public List<PurchaseOrder> getOrders(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return orderService.getOrders(userDetails.getAccount().getId());
    }

    @PostMapping("addorder")
    public PurchaseOrder addOrder(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return orderService.createOrder(userDetails.getAccount().getId());
    }
}
