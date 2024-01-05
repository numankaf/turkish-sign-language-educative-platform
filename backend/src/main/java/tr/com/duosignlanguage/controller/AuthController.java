package tr.com.duosignlanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.com.duosignlanguage.dto.auth.AuthorizationRequestDto;
import tr.com.duosignlanguage.dto.auth.AuthorizationResponseDto;
import tr.com.duosignlanguage.dto.auth.RefreshTokenDto;
import tr.com.duosignlanguage.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/login")
    ResponseEntity<AuthorizationResponseDto> authorize(@RequestBody AuthorizationRequestDto dto){
        AuthorizationResponseDto responseDto = authService.authorize(dto);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/refresh-token")
    ResponseEntity<AuthorizationResponseDto> refreshToken(@RequestBody RefreshTokenDto dto){
        AuthorizationResponseDto responseDto = authService.refreshToken(dto);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/logout")
    ResponseEntity<AuthorizationResponseDto> logout(@RequestBody RefreshTokenDto dto){
        authService.logout(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout-all")
    ResponseEntity<AuthorizationResponseDto> logoutAll(@RequestBody RefreshTokenDto dto){
        authService.logoutAll(dto);
        return ResponseEntity.ok().build();
    }

}
