import debug, { Debugger } from "debug";

interface Logger {
  namespace: string;
  logger: Debugger;
}

class LoggingModule {
  private loggers: Logger[] = [];

  public getLogger(namespace: string, label: string): Debugger {
    const existingLogger = this.loggers.find(
      (logger) => logger.namespace === namespace
    );

    if (existingLogger) {
      return debug(`${namespace}:${label}`);
    }

    const newLogger = debug(namespace);
    this.loggers.push({ namespace, logger: newLogger });

    return debug(`${namespace}:${label}`);
  }
}

const loggingModule = new LoggingModule();

export function getLogger(namespace: string, label: string): Debugger {
  return loggingModule.getLogger(namespace, label);
}
