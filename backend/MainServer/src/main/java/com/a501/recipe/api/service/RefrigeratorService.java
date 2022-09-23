package com.a501.recipe.api.service;

import com.a501.recipe.api.repository.RefrigeratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RefrigeratorService {

    private final RefrigeratorRepository refrigeratorRepository;

}
