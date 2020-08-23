const amqp = require("amqplib")
const KuyrukAdi = process.argv[2];
const message={
    icerik:"Serkan Polat",
    date:new Date()
}

connect_rabbitmq();

async function connect_rabbitmq(){
    console.log("KuyrukAdi  : "+KuyrukAdi);
    try{
        
    const opt =  await { credentials: require('amqplib').credentials.plain('serkan', 'polat') };
    const connection = await amqp.connect("amqp://localhost:5672",opt)
    const channel = await connection.createChannel();
    const assert = await channel.assertQueue(KuyrukAdi)

    setInterval(function(){
        message.date=new Date().getTime();
        channel.sendToQueue(KuyrukAdi,Buffer.from(JSON.stringify(message)));
       // console.log("Gonderilen Mesaj ",message);
    },1);
   
    }catch(error){
        console.log("Hata Olustu :"+error);
    }

}