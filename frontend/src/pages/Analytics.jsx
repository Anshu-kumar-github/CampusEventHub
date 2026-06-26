import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const Analytics = () => {

  const { eventId } = useParams();

  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          `/feedback/analytics/${eventId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setAnalytics(
        response.data.analytics
      );

    } catch (error) {

  console.error(error);

  toast.error(
    error.response?.data?.message ||
    "Failed to load analytics."
  );

}

  };

  if (!analytics) {
    return (
      <Layout>
        <div className="flex justify-center py-10">
  <div
    className="
      h-10
      w-10
      animate-spin
      rounded-full
      border-4
      border-gray-300
      border-t-blue-600
    "
  ></div>
</div>
      </Layout>
    );
  }

  const chartData = Object.entries(
    analytics.ratingDistribution
  ).map(([rating, count]) => ({
    rating: `${rating} ⭐`,
    count
  }));

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-4">
        Event Analytics
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="border p-4 rounded shadow">

          <h2 className="text-lg font-semibold">
            Average Rating
          </h2>

          <p className="text-3xl font-bold">
            {analytics.averageRating}
          </p>

        </div>

        <div className="border p-4 rounded shadow">

          <h2 className="text-lg font-semibold">
            Total Feedback
          </h2>

          <p className="text-3xl font-bold">
            {analytics.totalFeedback}
          </p>

        </div>

      </div>

      <div className="mt-8">

        <h2 className="text-xl font-bold mb-4">
          Rating Distribution
        </h2>

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="rating"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                radius={[5, 5, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </Layout>

  );

};

export default Analytics;