package tr.com.duosignlanguage.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import tr.com.duosignlanguage.config.jwt.JwtTokenProvider;
import tr.com.duosignlanguage.config.security.UserDetailsImpl;
import tr.com.duosignlanguage.config.security.UserDetailsServiceImpl;
import tr.com.duosignlanguage.dto.auth.AuthorizationRequestDto;
import tr.com.duosignlanguage.dto.auth.AuthorizationResponseDto;
import tr.com.duosignlanguage.dto.auth.RefreshTokenDto;
import tr.com.duosignlanguage.entity.RefreshToken;
import tr.com.duosignlanguage.entity.User;
import tr.com.duosignlanguage.repository.RefreshTokenRepository;
import tr.com.duosignlanguage.repository.UserRepository;

import java.util.UUID;

import static tr.com.duosignlanguage.exception.constant.ExceptionConstant.INVALID_TOKEN;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final UserDetailsServiceImpl userDetailsService;

    @Value("${application.jwt_expires_in}")
    private long jwtExpireDuration;

    @Value("${application.refresh_token.jwt_expires_in}")
    private long jwtRefreshTokenExpireDuration;
    public AuthorizationResponseDto authorize(AuthorizationRequestDto dto) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword());
        Authentication auth = authenticationManager.authenticate(token);
        UserDetailsImpl user = (UserDetailsImpl) auth.getPrincipal();


        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserId(user.getId());
        refreshTokenRepository.save(refreshToken);

        String accessToken = tokenProvider.generateToken(user);
        String refreshTokenStr = tokenProvider.generateRefreshToken(user, refreshToken.getId());

        return AuthorizationResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshTokenStr)
                .tokenType("Bearer")
                .expiresIn(jwtExpireDuration)
                .refreshExpiresIn(jwtRefreshTokenExpireDuration)
                .build();
    }

    public AuthorizationResponseDto refreshToken(RefreshTokenDto dto){
        UUID tokenId = UUID.fromString(tokenProvider.getTokenIdFromRefreshToken(dto.getRefreshToken()));
        Long userId = tokenProvider.getUserIdFromToken(dto.getRefreshToken());
        if (tokenProvider.validateToken(dto.getRefreshToken()) && refreshTokenRepository.existsById(tokenId)) {
            // valid and exists in db
            refreshTokenRepository.deleteById(tokenId);
            RefreshToken refreshToken = new RefreshToken();
            refreshToken.setUserId(userId);
            refreshTokenRepository.save(refreshToken);

            User user = userRepository.findById(userId).orElseThrow();
            UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(user.getUsername());

            String accessToken = tokenProvider.generateToken(userDetails);
            String refreshTokenStr = tokenProvider.generateRefreshToken(userDetails, refreshToken.getId());

            return AuthorizationResponseDto.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshTokenStr)
                    .tokenType("Bearer")
                    .expiresIn(jwtExpireDuration)
                    .refreshExpiresIn(jwtRefreshTokenExpireDuration)
                    .build();
        }

        throw new BadCredentialsException(INVALID_TOKEN);

    }

    public void logout(RefreshTokenDto dto){
        UUID tokenId = UUID.fromString(tokenProvider.getTokenIdFromRefreshToken(dto.getRefreshToken()));
        if (tokenProvider.validateToken(dto.getRefreshToken()) && refreshTokenRepository.existsById(tokenId)) {
            // valid and exists in db
            refreshTokenRepository.deleteById(tokenId);
        }else{
            throw new BadCredentialsException(INVALID_TOKEN);
        }
    }

    @Transactional
    public void logoutAll(RefreshTokenDto dto){
        UUID tokenId =UUID.fromString(tokenProvider.getTokenIdFromRefreshToken(dto.getRefreshToken()));
        if (tokenProvider.validateToken(dto.getRefreshToken()) && refreshTokenRepository.existsById(tokenId)) {
            // valid and exists in db
            Long userId = tokenProvider.getUserIdFromToken(dto.getRefreshToken());
            refreshTokenRepository.deleteAllByUserId(userId);
        }else{
            throw new BadCredentialsException(INVALID_TOKEN);
        }
    }




}
