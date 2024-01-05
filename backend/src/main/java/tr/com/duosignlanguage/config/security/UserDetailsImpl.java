package tr.com.duosignlanguage.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tr.com.duosignlanguage.entity.User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails {
    private final User user;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (Objects.nonNull(user) && user.getRole() != null){

            return List.of(new SimpleGrantedAuthority(user.getRole().toString()));
        }
        return Collections.emptyList();
    }

    public Long getId(){
        return user.getId();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
