package tn.esprit.servicemedical;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ServiceMedicalApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceMedicalApplication.class, args);
    }

}
