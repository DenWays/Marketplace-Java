package com.example.Marketplace.services.impls;

import com.example.Marketplace.models.PurchaseOrder;
import com.example.Marketplace.models.Status;
import com.example.Marketplace.repositories.AccountRepository;
import com.example.Marketplace.repositories.OrderRepository;
import com.example.Marketplace.repositories.StatusRepository;
import com.example.Marketplace.services.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class AdminServiceImpl implements AdminService {
    private final OrderRepository orderRepository;
    private final StatusRepository statusRepository;

    @Override
    public List<PurchaseOrder> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Status> getAllStatuses() {
        return statusRepository.findAll();
    }

    @Override
    @Transactional
    public void changeStatus(Integer orderId, Integer statusId) {
        PurchaseOrder order = orderRepository.findById(orderId).get();
        order.setStatus(statusRepository.findById(statusId).get());
        orderRepository.save(order);
    }
}
