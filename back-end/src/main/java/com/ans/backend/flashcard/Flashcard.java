package com.ans.backend.flashcard;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "flashcards")
public class Flashcard {
    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId id;
    private String concept;
    private String definition;

    public Flashcard(String concept, String definition){
        this.concept = concept;
        this.definition = definition;
    }

}
