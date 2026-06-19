class Logger {
    private static Logger instance;

    private Logger() {
    }

    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void logMessage(String msg) {
        System.out.println(msg);
    }
}

class Main {
    public static void main(String[] args) {
        Logger l1 = Logger.getInstance();
        Logger l2 = Logger.getInstance();
        l1.logMessage("Hello from l1");
        l2.logMessage("Hello from l2");
        System.out.println(l1 == l2);
    }
}