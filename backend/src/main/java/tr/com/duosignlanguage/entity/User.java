package tr.com.duosignlanguage.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import tr.com.duosignlanguage.enums.UserRole;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "USERS")
@Data
public class User extends BaseEntity{
    @Column(name = "USERNAME", length = 30, unique = true)
    private String username;

    @Column(name = "EMAIL", unique = true)
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "NAME")
    private String name;

    @Column(name = "SURNAME")
    private String surname;

    @Column(name = "ABOUT")
    private String about;

    @Enumerated(EnumType.STRING)
    private UserRole role;
}
