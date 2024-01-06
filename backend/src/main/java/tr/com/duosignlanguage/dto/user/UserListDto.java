package tr.com.duosignlanguage.dto.user;

import lombok.Data;
import tr.com.duosignlanguage.enums.UserRole;

@Data
public class UserListDto {
    private Long id;
    private String username;
    private String email;
    private String name;
    private String surname;
    private UserRole role;
}
