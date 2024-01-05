package tr.com.duosignlanguage.config.audit;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;
import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {
    @Override
    public Optional<String> getCurrentAuditor() {
        Optional<String> userInfo = Optional.ofNullable(SecurityContextHolder.getContext()).map(SecurityContext::getAuthentication).map(Principal::getName);
        if(userInfo.get().equals("anonymousUser")){
            return Optional.of("SYSTEM");
        }
        return userInfo;
    }
}
