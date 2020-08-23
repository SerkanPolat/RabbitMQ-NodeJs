const amqp = require("amqplib")
const KuyrukAdi = process.argv[2] || "jobsQueue";
connect_rabbitmq();

async function connect_rabbitmq(){

    try{
        
    const opt =  await { credentials: require('amqplib').credentials.plain('serkan', 'polat') };
    const connection = await amqp.connect("amqp://localhost:5672",opt)
    const channel = await connection.createChannel();
    const assert = await channel.assertQueue(KuyrukAdi);

    channel.consume(KuyrukAdi,(message)=>{

        console.log("Mesaj Alindi :"+message.content.toString());
        channel.ack(message);
    });

    console.log("Gonderilen Mesaj ",message);
    }catch(error){
        console.log("Hata Olustu :"+error);
    }

}