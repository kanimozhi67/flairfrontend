import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, message } from "antd";
import api from "../api/axiosClient";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();

 const handlePay = async () => {
  try {
    const res = await api.post("/payment/createcheckoutsession");

    window.location.href = res.data.url;
    console.log(res.data.url)
  } catch (err) {
    message.error("Payment failed");
  }
};

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>💳 Pay Now</h2>
      <CardElement />
      <Button type="primary" onClick={handlePay} style={{ marginTop: 20 }}>
        Pay $50
      </Button>
    </div>
  );
};

export default PaymentPage;
