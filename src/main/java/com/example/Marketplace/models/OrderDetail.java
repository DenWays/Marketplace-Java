package com.example.Marketplace.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "orderDetail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idOrderDetail")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idProduct")
    private Product product;

    @Column(name = "quantity")
    private int quantity;
}
