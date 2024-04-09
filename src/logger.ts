import * as winston from 'winston';


function projectFormat() {
    return winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms()
    )
}

export function createLogger(level: string = "info") {
    return winston.createLogger({
        level: 'info',
        format: winston.format.colorize(),
        transports: [
            new winston.transports.Console(
                {
                    format: projectFormat()
                })
        ]
    });
}