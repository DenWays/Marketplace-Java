package com.example.Marketplace.services;

import com.example.Marketplace.models.PurchaseOrder;
import com.example.Marketplace.models.Status;

import java.util.List;

public interface AdminService {
    List<PurchaseOrder> getAllOrders();
    List<Status> getAllStatuses();
    void changeStatus(Integer orderId, Integer statusId);
}
