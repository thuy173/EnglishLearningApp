package com.example.elearningapi.controller.site;

import com.example.elearningapi.beans.response.vocabulary.IpaResponse;
import com.example.elearningapi.service.IpaService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ipa")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class IpaController {
    private final IpaService ipaService;

    @GetMapping("/{word}")
    public IpaResponse getIPA(@PathVariable  String word) {
        return ipaService.getWordDefinition(word);
    }

}
