const Category = require("../models/category.model");

const getCategories = async (userId) => {
  try {
    const categories = await Category.find({ owner: userId });
    return categories;
  } catch (error) {
    console.error("Błąd podczas wyszukiwania transakcji:", error);
    throw error;
  }
};

const addCategories = async (name, color, owner) => {
  try {
    const newCategory = await Category.create({
      name: name,
      color: color,
      owner: owner,
    });

    return newCategory;
  } catch (error) {
    console.error("Error during add transaction:", error);
    throw error;
  }
};

module.exports = { getCategories, addCategories };
