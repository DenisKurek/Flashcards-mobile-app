package com.ans.backend.user;

import com.ans.backend.set.FlashcardsSet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class User {
        @Id
        private ObjectId id;
        @Indexed(unique = true)
        private String username;
        @Indexed(unique = true)
        private String emailAddress;
        private String password;
        @DocumentReference
        private List<FlashcardsSet> setsIds;

        public User(String username, String emailAddress, String password) {
                this.username = username;
                this.emailAddress = emailAddress;
                this.password = password;
        }

}
