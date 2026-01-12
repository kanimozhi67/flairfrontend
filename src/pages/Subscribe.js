import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../../api/axiosClient";

export default function Subscribe() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubscribe = async () => {
    const res = await api.post("/subscription/create");
    const { clientSecret } = res.data;

    await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    alert("🎉 Subscription successful!");
  };

  return (
    <div>
      <h2>Premium Subscription</h2>
      <CardElement />
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
}
