package com.ans.backend.user;

import com.ans.backend.set.FlashcardsSet;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<FlashcardsSet> setsOfUser(String userName) {
        Optional<User> user = singleUser(userName);
        if(user.isEmpty()){
            throw new RuntimeException("user not found");
        }
        return user.get().getSetsIds();
    }


    public void saveUser(User user) {
        userRepository.save(user);
    }
}
