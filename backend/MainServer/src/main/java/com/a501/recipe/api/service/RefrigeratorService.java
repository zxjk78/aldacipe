package com.a501.recipe.api.service;

import com.a501.recipe.api.repository.RefrigeratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefrigeratorService {

    private final RefrigeratorRepository refrigeratorRepository;

}
