import snsClient from "./snsClient";

const sendSms = (phoneNumber: string) => {
  const params = {
    Message: "Thank you for your donations",
    PhoneNumber: phoneNumber,
  };

  snsClient.publish(params);
};

export default sendSms;
