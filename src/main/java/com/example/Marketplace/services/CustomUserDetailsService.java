package com.example.Marketplace.services;

import com.example.Marketplace.configs.CustomUserDetails;
import com.example.Marketplace.models.Account;
import com.example.Marketplace.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Account account = accountRepository.findByLogin(login);

        if (account == null) {
            throw new UsernameNotFoundException("Not found");
        }

        return new CustomUserDetails(account);
    }
}
