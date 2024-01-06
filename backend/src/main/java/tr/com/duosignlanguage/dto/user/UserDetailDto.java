package tr.com.duosignlanguage.dto.user;


import lombok.Data;
import lombok.EqualsAndHashCode;
import tr.com.duosignlanguage.dto.BaseDto;
import tr.com.duosignlanguage.enums.UserRole;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDetailDto extends BaseDto {
    private String username;
    private String email;
    private String name;
    private String surname;
    private String about;
    private UserRole role;
}
