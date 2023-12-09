package tn.esprit.rendezvous;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class RendezVousApplication {

    public static void main(String[] args) {
        SpringApplication.run(RendezVousApplication.class, args);
    }

}
