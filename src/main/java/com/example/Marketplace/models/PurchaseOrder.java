package com.example.Marketplace.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;

@Data
@Entity
@Table(name = "purchase_order")
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPurchaseOrder")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idAccount")
    private Account account;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "idPurchaseOrder")
    private Set<OrderDetail> items;

    @ManyToOne
    @JoinColumn(name = "idStatus")
    private Status status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Column(name = "creatingDate")
    private LocalDate creatingDate;
}
