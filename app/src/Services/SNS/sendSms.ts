import snsClient from "./snsClient";

const sendSms = async (phoneNumber: string) => {
  const params = {
    Message: "Thank you for your donations",
    PhoneNumber: phoneNumber,
  };

  console.log(await snsClient.publish(params));
};

export default sendSms;
