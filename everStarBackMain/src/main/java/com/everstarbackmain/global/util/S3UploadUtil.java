package com.everstarbackmain.global.util;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.everstarbackmain.global.config.S3Config;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class S3UploadUtil {

	private final AmazonS3 amazonS3;
	private final S3Config s3Config;

	public String saveFile(MultipartFile multipartFile) throws IOException {
		String originalFilename = multipartFile.getOriginalFilename();

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(multipartFile.getSize());
		metadata.setContentType(multipartFile.getContentType());

		amazonS3.putObject(s3Config.getBucket(), originalFilename, multipartFile.getInputStream(), metadata);
		return amazonS3.getUrl(s3Config.getBucket(), originalFilename).toString();
	}
}
