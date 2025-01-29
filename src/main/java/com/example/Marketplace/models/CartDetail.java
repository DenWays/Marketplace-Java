package com.example.Marketplace.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cartDetail")
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCartDetail")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idProduct")
    private Product product;

    @Column(name = "quantity")
    private int quantity;
}
