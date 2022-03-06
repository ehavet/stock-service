import {Kafka} from 'kafkajs'

export default new Kafka({
    clientId: 'stock-service',
    brokers: ['localhost:9092'],
    retry: {
        initialRetryTime: 1000,
        retries: 3
    }
})
