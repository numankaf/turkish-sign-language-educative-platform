package tr.com.duosignlanguage.dto.auth;

import lombok.Data;

@Data
public class AuthorizationRequestDto {
    private String username;
    private String password;
}
