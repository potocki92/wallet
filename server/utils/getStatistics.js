const { getCategories } = require("../service/categories.service");

const getStatistics = async (transactions, userId) => {
  const categories = await getCategories(userId);
  const stats = categories.map((category) => ({
    category: category.name,
    color: category.color,
    total: transactions
      .filter((element) => element.categories === category.name)
      .reduce((acc, element) => (acc = acc + element.sum), 0),
  }));

  const expenses = transactions
    .filter((element) => !element.income)
    .reduce((acc, element) => (acc = acc + element.sum), 0);

  const income = transactions
    .filter((element) => element.income)
    .reduce((acc, element) => (acc = acc + element.sum), 0);

  const data = {
    stats,
    expenses,
    income,
  };

  return data;
};

module.exports = { getStatistics };
