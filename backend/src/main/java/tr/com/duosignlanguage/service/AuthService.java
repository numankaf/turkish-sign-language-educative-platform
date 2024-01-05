package tr.com.duosignlanguage.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.duosignlanguage.config.jwt.JwtTokenProvider;
import tr.com.duosignlanguage.config.security.UserDetailsImpl;
import tr.com.duosignlanguage.dto.auth.LoginRequestDto;
import tr.com.duosignlanguage.dto.auth.LoginResponseDto;
import tr.com.duosignlanguage.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public LoginResponseDto login(LoginRequestDto dto) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword());
        Authentication auth = authenticationManager.authenticate(token);
        String jwtToken = tokenProvider.generateToken(auth);
        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setAccessToken(jwtToken);
        loginResponseDto.setTokenType("Bearer");
        return loginResponseDto;
    }

}
