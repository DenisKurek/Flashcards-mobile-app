package com.ans.backend.user;

import com.ans.backend.set.FlashcardsSet;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
        @JsonSerialize(using= ToStringSerializer.class)
        private ObjectId id;
        @NotBlank()
        @Email(message = "invalid email address")
        @Indexed(unique = true)
        private String emailAddress;

        @NotBlank
        @Size(min = 4, max = 14)
        private String password;

        @DocumentReference
        private List<FlashcardsSet> setsIds;

        public User(String emailAddress, String password) {
                this.emailAddress = emailAddress;
                this.password = password;
        }

}
