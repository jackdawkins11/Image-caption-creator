package com.example.myproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


import lombok.Data;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}

@RestController
class MyController{

	@Autowired
	MemeRepo memeRepo;

	@PostMapping(value = "/meme")
	public Meme postMeme( @RequestParam("file") MultipartFile file, @RequestParam("caption") String caption ){
		Meme meme = new Meme();
		meme.setCaption( caption );
		meme = memeRepo.save( meme );
		try {
			Files.copy(file.getInputStream(),
(Path)Paths.get("src", "main", "resources", "static", "uploads", String.valueOf( meme.getId() )), StandardCopyOption.REPLACE_EXISTING );

			if( memeRepo.count() > 5 ){
				Meme deleteMeme = memeRepo.findFirstByOrderByIdAsc();
				Files.deleteIfExists(
						(Path)Paths.get("src", "main", "resources", "static", "uploads", String.valueOf( deleteMeme.getId() ) ) );
			}
		} catch (Exception e) {
			throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
		}
		return meme;
	}

	@GetMapping(value = "/memes")
	public List<Meme> getMemes(){
		return memeRepo.findFirst5ByOrderByIdDesc();
	}

}

@Data
@Entity
@Table(name="memes")
class Meme{
	String caption;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
}

interface MemeRepo extends JpaRepository<Meme,Long> {
	List<Meme> findFirst5ByOrderByIdDesc();
	Meme findFirstByOrderByIdAsc();
}
