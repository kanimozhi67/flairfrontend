import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import api from "../api/axiosClient";

const CompletedTask = ({ user }) => {
    const styles = {
  wrapper: {
    padding: "16px",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: "1000px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    background: "linear-gradient(135deg, #e0f7fa, #fffde7)",
  },

  title: {
    textAlign: "center",
    color: "#ff6f00",
    fontSize: "24px",
    marginBottom: "16px",
    fontWeight: "bold",
  },
};

  const [completedData, setCompletedData] = useState(null);

  const fetchCompleted = async () => {
    try {
      const res = await api.get(`/users/completed/${user._id}`);
      setCompletedData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchCompleted();
  }, [user?._id]);

  const columns = [
    {
      title: "🎯 Level",
      dataIndex: "completedLevel",
      key: "completedLevel",
      align: "center",
    },
    {
      title: "📘 Category",
      dataIndex: "completedCategory",
      key: "completedCategory",
      align: "center",
    },
    {
      title: "⭐ Difficulty",
      dataIndex: "completedSelectedLevel",
      key: "completedSelectedLevel",
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "🏆 Score",
      dataIndex: "completedPoints",
      key: "completedPoints",
      align: "center",
    },
  ];



     const dataSource  = completedData?.completedLevel?.map((_, i) => ({
  key: i,
  completedLevel: completedData.completedLevel[i],
  completedCategory: completedData.completedCategory[i],
  completedSelectedLevel: completedData.completedSelectedLevel[i],
time: completedData.time[i],
  completedPoints: completedData.completedPoints[i],
}));

  return (
    <div style={styles.wrapper}>
      <Card style={styles.card}>
        <h2 style={styles.title}>🎉 My Completed Games</h2>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10 }}
          bordered
          size="middle"
          scroll={{ x: true }}   // ✅ mobile friendly
        />
      </Card>
    </div>
  );
};

export default CompletedTask;
