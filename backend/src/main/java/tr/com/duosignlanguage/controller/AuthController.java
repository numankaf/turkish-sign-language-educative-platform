package tr.com.duosignlanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tr.com.duosignlanguage.dto.auth.LoginRequestDto;
import tr.com.duosignlanguage.dto.auth.LoginResponseDto;
import tr.com.duosignlanguage.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/login")
    ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto dto){
        LoginResponseDto responseDto = authService.login(dto);
        return ResponseEntity.ok(responseDto);
    }
}
