package com.ans.backend.user;

import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> singleUser(String emailAddress){
        return userRepository.findUserByEmailAddressIgnoreCase(emailAddress);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
}
