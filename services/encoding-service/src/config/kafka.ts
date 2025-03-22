import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "encoding service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "encode-group" });

export const consumeFromKafka = async (
  processVideo: (videoData: {
    videoUrl: any;
    videoTitle: string;
  }) => Promise<void>
) => {
  await consumer.connect();
  await consumer.subscribe({ topic: "video-uploads", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message, topic, heartbeat }) => {
      if (message.value) {
        try {
          const data = JSON.parse(message.value.toString());
          console.log(`Received Kafka message: Processing ${data?.videoTitle}`);
          await processVideo(data);
        } catch (error: any) {
          console.log("again trying");
          console.log(error?.message);
        }
      }
    },
  });
};
