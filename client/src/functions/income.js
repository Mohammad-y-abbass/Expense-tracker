export const getIncomeData = async () => {
  try {
    const response = await fetch("http://localhost:9000/api/get-income");
    if (!response.ok) throw new Error(response.statusText);
    const jsonData = await response.json();
    return jsonData.income;
  } catch (err) {
    console.error(err.message);
  }
};
