package com.ans.backend.user;

import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> singleUser(String emailAddress){
        return userRepository.findUserByEmailAddress(emailAddress.toLowerCase(Locale.ROOT));
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
}
