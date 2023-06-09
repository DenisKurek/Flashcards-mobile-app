package com.ans.backend.user;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Optional<User>> getUser(@RequestBody LoginRequest loginRequest) {

        Optional<User> user = userService.singleUser(loginRequest.emailAddress());
        user.ifPresentOrElse(
                (x)-> System.out.println(x.getPassword() +" "+ loginRequest.password()),
                ()-> System.out.println(loginRequest.emailAddress()+" ni ma")
        );
        if (user.isPresent() && user.get().getPassword().equals(loginRequest.password())) {
            return ResponseEntity.
                    status(HttpStatus.OK)
                    .body(user);
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Optional.empty());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Optional<User>> addUser(@RequestBody SignInRequest request) {
        try {
            User newUser = new User(request.emailAddress(), request.password());
            userService.saveUser(newUser);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Optional.of(newUser));
        } catch (DuplicateKeyException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Optional.empty());
        }

    }

}
