package tr.com.duosignlanguage.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import tr.com.duosignlanguage.service.StreamingService;

@RestController
@RequestMapping("/resource")
@RequiredArgsConstructor
public class ResourceController {
    private final StreamingService streamingService;
    @GetMapping(value = "/video/{name}", produces = "video/mp4")
    public Mono<Resource> getVideos(@PathVariable String name){
        return streamingService.getVideo(name);
    }

}
