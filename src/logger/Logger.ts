import colors from 'colors/safe';
import winston from 'winston';

colors.setTheme({
                    info: ['brightBlue', 'bold'],
                    warn: ['yellow', 'bold'],
                    error: ['red', 'bold']
                });

const Logger = winston.createLogger({
                                        format: winston.format.combine(
                                            winston.format.printf(({ level, message }) => {
                                                const time = colors.grey(new Date().toString());
                                                level = (colors as any)[level](level.toUpperCase());
                                                return `${time} [${level}] : ${message}`;
                                            })
                                        ),
                                        transports: [
                                            new winston.transports.Console()
                                        ]
                                    });

export default Logger;
