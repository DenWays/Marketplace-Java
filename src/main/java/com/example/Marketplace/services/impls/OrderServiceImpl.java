package com.example.Marketplace.services.impls;

import com.example.Marketplace.models.Cart;
import com.example.Marketplace.models.PurchaseOrder;
import com.example.Marketplace.models.OrderDetail;
import com.example.Marketplace.repositories.AccountRepository;
import com.example.Marketplace.repositories.CartRepository;
import com.example.Marketplace.repositories.OrderRepository;
import com.example.Marketplace.repositories.StatusRepository;
import com.example.Marketplace.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Primary
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final AccountRepository accountRepository;
    private final StatusRepository statusRepository;

    @Override
    public List<PurchaseOrder> getOrders(Integer accountId) {
        return orderRepository.findAllByAccountId(accountId);
    }

    @Override
    @Transactional
    public PurchaseOrder createOrder(Integer accountId) {
        Cart cart = cartRepository.findByAccountId(accountId);
        PurchaseOrder order = new PurchaseOrder();

        order.setAccount(accountRepository.findById(accountId).get());
        order.setCreatingDate(LocalDate.now());
        order.setStatus(statusRepository.findById(1).get());
        order.setItems(new HashSet<>());
        orderRepository.save(order);

        Set<OrderDetail> items = cart.getItems().stream()
                        .map(cartItem -> {
                            OrderDetail item = new OrderDetail();
                            item.setProduct(cartItem.getProduct());
                            item.setQuantity(cartItem.getQuantity());
                            return item;
                        })
                        .collect(Collectors.toSet());
        order.setItems(items);
        orderRepository.save(order);
        cartRepository.deleteById(cart.getId());

        return order;
    }
}
