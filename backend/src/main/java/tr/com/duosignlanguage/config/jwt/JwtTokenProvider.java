package tr.com.duosignlanguage.config.jwt;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import tr.com.duosignlanguage.config.security.UserDetailsImpl;
import tr.com.duosignlanguage.constants.TokenConstants;


import java.util.Date;
import java.util.UUID;

@Component
@Slf4j
public class JwtTokenProvider {
    @Value("${application.jwt_secret}")
    private String jwtSecret;

    @Value("${application.jwt_expires_in}")
    private long jwtExpireDuration;

    @Value("${application.refresh_token.jwt_expires_in}")
    private long jwtRefreshTokenExpireDuration;

    public String generateToken(UserDetailsImpl user){
        Date expireDate = new Date(new Date().getTime() + jwtExpireDuration);
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("auth", user.getAuthorities())
                .claim("token_type", TokenConstants.ACCESS_TOKEN)
                .claim("uid", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512,jwtSecret)
                .compact();
    }

    public String generateRefreshToken(UserDetailsImpl user, UUID uuid){
        Date expireDate = new Date(new Date().getTime() + jwtRefreshTokenExpireDuration);
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("token_type", TokenConstants.REFRESH_TOKEN)
                .claim("token_id", uuid)
                .claim("uid", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512,jwtSecret)
                .compact();
    }
    public String getUsernameFromToken(String token){
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public Long getUserIdFromToken(String token){
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return claims.get("uid", Long.class);
    }

    public String getTokenIdFromRefreshToken(String token){
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return claims.get("token_id", String.class);
    }

    public boolean validateToken(String token){
        try {
            return !Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getExpiration().before(new Date());
        }catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

}
