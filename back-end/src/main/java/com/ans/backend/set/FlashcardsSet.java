package com.ans.backend.set;

import com.ans.backend.flashcard.Flashcard;
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
@Document(collection = "sets")
public class FlashcardsSet {
    @Id
    private ObjectId id;
    private String title;

    @DocumentReference
    private List<Flashcard> flashcardsIds;
}
