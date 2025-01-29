package com.example.Marketplace.services.impls;

import com.example.Marketplace.models.Cart;
import com.example.Marketplace.models.CartDetail;
import com.example.Marketplace.models.Product;
import com.example.Marketplace.repositories.AccountRepository;
import com.example.Marketplace.repositories.CartDetailRepository;
import com.example.Marketplace.repositories.CartRepository;
import com.example.Marketplace.repositories.ProductRepository;
import com.example.Marketplace.services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Primary
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final AccountRepository accountRepository;
    private final CartDetailRepository cartDetailRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public Cart getByAccountId(Integer accountId) {
        Cart cart = cartRepository.findByAccountId(accountId);

        if (cart == null) {
            return createCart(accountId);
        }

        cart.setItems(cart.getItems().stream()
                .sorted(Comparator.comparing(item -> item.getProduct().getName()))
                .collect(Collectors.toCollection(LinkedHashSet::new)));

        return cart;
    }

    @Override
    @Transactional
    public void addToCart(Integer productId, Integer accountId) {
        Product product = productRepository.findById(productId).get();
        Cart cart = getByAccountId(accountId);

        CartDetail cartDetail = cart.getItems()
                .stream().filter(item -> item.getProduct() == product).findFirst().orElse(null);

        if (cartDetail == null) {
            cartDetail = new CartDetail();
            cartDetail.setProduct(product);
            cartDetail.setQuantity(1);
            cart.getItems().add(cartDetail);
            cartRepository.save(cart);
        }
        else {
            changeQuantity(cartDetail.getId(), 1);
        }
    }

    @Override
    public Cart createCart(Integer accountId) {
        Cart cart = new Cart();
        cart.setAccount(accountRepository.findById(accountId).get());
        cart.setItems(new HashSet<>());
        return cartRepository.save(cart);
    }

    @Override
    public void changeQuantity(Integer cartDetailId, int quantity) {
        CartDetail cartDetail = cartDetailRepository.findById(cartDetailId).get();

        if (cartDetail.getQuantity() == 1 && quantity == -1) {
            deleteItem(cartDetailId);
        }
        else {
            cartDetail.setQuantity(cartDetail.getQuantity() + quantity);
            cartDetailRepository.save(cartDetail);
        }
    }

    @Override
    public void deleteItem(Integer cartDetailId) {
        cartDetailRepository.deleteById(cartDetailId);
    }
}
