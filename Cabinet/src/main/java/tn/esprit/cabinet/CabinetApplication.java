package tn.esprit.cabinet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class CabinetApplication {

    public static void main(String[] args) {
        SpringApplication.run(CabinetApplication.class, args);
    }

}
