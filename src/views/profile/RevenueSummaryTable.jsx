import React from "react";
import "./RevenueSummaryTable.css";

const RevenueSummaryTable = ({ properties }) => {
  console.log("RevenueSummaryTable properties:", properties); 
  const totalRevenue = properties.reduce((total, { revenue }) => total + revenue, 0);
  const totalBookings = properties.reduce((total, { bookingCount }) => total + bookingCount, 0);
  const totalFees = totalRevenue * 0.1;
  const netRevenue = totalRevenue - totalFees;

  return (
    <table className="revenue-summary-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Revenue</th>
          <th>Bookings</th>
        </tr>
      </thead>
      <tbody>
        {properties.map(({ property, revenue, bookingCount }) => (
          <tr key={property._id}>
            <td>{property.title}</td>
            <td>{revenue.toFixed(1)} €</td>
            <td>{bookingCount}</td>
          </tr>
        ))}
        <tr>
          <td><strong></strong></td>
          <td><strong>{totalRevenue.toFixed(1)} €</strong></td>
          <td><strong>{totalBookings}</strong></td>
        </tr>
        <tr>
          <td style={{ color: "#e06a6a" }}><strong>Service Fees</strong></td>
          <td style={{ color: "#e06a6a" }}><strong>- {totalFees.toFixed(1)} €</strong></td>
          <td></td>
        </tr>
        <tr>
          <td style={{ color: "#06b782" }}><strong>Total Revenue</strong></td>
          <td style={{ color: "#06b782" }}><strong>{netRevenue.toFixed(1)} €</strong></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default RevenueSummaryTable;