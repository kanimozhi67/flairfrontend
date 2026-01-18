import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Card, message } from "antd";
import api from "../api/axiosClient";
import { Navigate, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate();
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #FFE29F, #FFA99F)",
    padding: "16px",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 20,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6f61",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  cardBox: {
    padding: 12,
    border: "2px dashed #ffb6b6",
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ff6f61",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 12,
    fontSize: 12,
    color: "#777",
  },
};

  const handlePay = async () => {
    try {
      const res = await api.post("/payment/createcheckoutsession");
      window.location.href = res.data.url;
    
     // navigate("/profile")
    } catch (err) {
      message.error("Oops! Payment didn’t work 😢");
    }
  };

  return (
    <div style={styles.wrapper}>
      <Card style={styles.card} bordered={false}>
        <h2 style={styles.title}>🎉 Unlock Your Class!</h2>
        <p style={styles.subtitle}>
          Safe & secure payment made just for kids 💖
        </p>

         {/* <div style={styles.cardBox}>
         <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#333",
                  "::placeholder": { color: "#aaa" },
                },
              },
            }}
          />
        </div>  */}

        <Button
          type="primary"
          size="large"
          block
          style={styles.button}
          onClick={handlePay}
        >
          🚀 Pay $5 & Start Learning
        </Button>

        <p style={styles.footer}>🔒 100% Secure Payment</p>
      </Card>
    </div>
    
  );
};

export default PaymentPage;
