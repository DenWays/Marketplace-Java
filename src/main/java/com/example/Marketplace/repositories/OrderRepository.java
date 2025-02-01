package com.example.Marketplace.repositories;

import com.example.Marketplace.models.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<PurchaseOrder, Integer> {
    List<PurchaseOrder> findAllByAccountId(Integer accountId);
}
