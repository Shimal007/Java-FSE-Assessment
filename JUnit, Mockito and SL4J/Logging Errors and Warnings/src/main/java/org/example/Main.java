package org.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {

    private static final Logger logger = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) {

        logger.info("Application started.");

        logger.warn("Disk space is running low.");

        logger.error("Unable to connect to the database.");

        logger.info("Application finished.");
    }
}