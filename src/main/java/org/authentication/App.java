package org.authentication;

import org.flywaydb.core.Flyway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App 
{
    public static void main( String[] args )
    {
        Flyway flyway = Flyway.configure().dataSource("jdbc:postgresql://localhost:5432/postgres", "admin", "1234").load();
        flyway.migrate();
        SpringApplication.run(App.class, args);
    }
}
