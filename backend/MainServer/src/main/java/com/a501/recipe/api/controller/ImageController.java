package com.a501.recipe.api.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Value("${image.path}")
    private String imagePath;

    // img 태그 src로 불러오기
    @ResponseBody
    @GetMapping("")
    public Resource showBoardImage(@RequestParam("path") String filename) throws MalformedURLException {
        System.out.println(filename);
        String path = System.getProperty("user.dir"); // 현재 디렉토리 가져오기
//        File file = new File(path + imagePath + filename);
        File file = new File( imagePath + filename);
        return new UrlResource("file:"+file.getPath());
    }


}
