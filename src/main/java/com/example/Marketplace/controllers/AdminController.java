package com.example.Marketplace.controllers;

import com.example.Marketplace.models.PurchaseOrder;
import com.example.Marketplace.models.Status;
import com.example.Marketplace.services.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin")
@AllArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("orders")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<PurchaseOrder> getAllOrders() {
        return adminService.getAllOrders();
    }

    @GetMapping("statuses")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Status> getAllStatuses() {
        return adminService.getAllStatuses();
    }

    @PostMapping("changestatus/{orderId}/{statusId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void changeStatus(@PathVariable Integer orderId, @PathVariable Integer statusId) {
        adminService.changeStatus(orderId, statusId);
    }
}
