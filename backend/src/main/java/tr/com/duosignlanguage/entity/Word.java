package tr.com.duosignlanguage.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import tr.com.duosignlanguage.enums.UserRole;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "WORDS")
@Data
public class Word extends BaseEntity{

    @Column(name = "TR")
    private String tr;

    @Column(name = "EN")
    private String en;

}
