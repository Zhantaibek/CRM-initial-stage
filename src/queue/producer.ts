import amqp from 'amqplib';
import { env } from '@config/env';
import { logger } from 'core/utils/logger';

let connection: any = null;
let channel: amqp.Channel | null = null;

export const QUEUES = {
  EMAIL_VERIFICATION: 'email.verification',
};

export const connectQueue = async () => {
  try {
    connection = await amqp.connect(env.RABBITMQ_URL);
    const ch = await connection.createChannel();
    channel = ch;

    await ch.assertQueue(QUEUES.EMAIL_VERIFICATION, { durable: true });

    logger.info('Connected to RabbitMQ');
  } catch (err) {
    logger.error(`RabbitMQ connection error: ${err}`);
  }
};

export const publishToQueue = async (queue: string, message: object): Promise<boolean> => {
  if (!channel) {
    logger.warn('RabbitMQ channel not available, sending email directly');
    return false;
  }

  
  channel!.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(message)),
    { persistent: true }
  );

  return true;
};