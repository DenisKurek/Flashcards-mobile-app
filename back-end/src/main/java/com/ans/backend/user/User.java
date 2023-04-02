package com.ans.backend.user;

import com.ans.backend.flashcard.Flashcard;
import com.ans.backend.set.FlashcardsSet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
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
        private String username;
        private String emailAddress;

        @DocumentReference
        private List<FlashcardsSet> setsIds;
}
