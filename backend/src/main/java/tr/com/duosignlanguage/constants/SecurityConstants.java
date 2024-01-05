package tr.com.duosignlanguage.constants;

public class SecurityConstants {
    public static final String[] AUTH_WHITELIST = {
            "/h2-console/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/swagger-ui/index.html",
    };


    public static final String[] AUTH_PERMIT = {
            "/auth/**",
    };

    public static final String[] AUTH_ADMIN= { //
            "/users/**",
    };
}
