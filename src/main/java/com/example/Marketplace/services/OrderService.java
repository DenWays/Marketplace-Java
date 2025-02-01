package com.example.Marketplace.services;

import com.example.Marketplace.models.PurchaseOrder;

import java.util.List;

public interface OrderService {
    List<PurchaseOrder> getOrders(Integer accountId);
    PurchaseOrder createOrder(Integer accountId);
}
