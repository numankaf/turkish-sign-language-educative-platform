package tr.com.duosignlanguage.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class StreamingService {
    private static final String videoPath = "classpath:videos/%s.mp4";

    private final ResourceLoader resourceLoader;

    public Mono<Resource> getVideo(String name){
        return Mono.fromSupplier(()->resourceLoader.getResource(String.format(videoPath, name)));
    }
}
