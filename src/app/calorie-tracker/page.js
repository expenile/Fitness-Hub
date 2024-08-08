
"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faUtensils,
  faPlus,
  faMinus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const NutritionMeter = () => {
  const defaultItemsDisplayed = [
    {
      id: 1,
      name: "Apple",
      calories: 52,
      protein: 0.26,
      carbs: 14,
      fat: 1,
      quantity: 1,
    },
    {
      id: 2,
      name: "Banana",
      calories: 89,
      protein: 1.09,
      carbs: 23,
      fat: 5,
      quantity: 1,
    },
    {
      id: 3,
      name: "Grapes",
      calories: 40,
      protein: 0.2,
      carbs: 20,
      fat: 2,
      quantity: 1,
    },
    {
      id: 4,
      name: "Orange",
      calories: 35,
      protein: 0.15,
      carbs: 25,
      fat: 4,
      quantity: 1,
    },
  ];

  const [nutritionItems, setNutritionItems] = useState(defaultItemsDisplayed);
  const [newItem, setNewItem] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [editItem, setEditItem] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    const calculateTotalCalories = nutritionItems.reduce(
      (total, item) => total + parseFloat(item.calories) * item.quantity,
      0
    );

    setTotalCalories(calculateTotalCalories);

    if (calculateTotalCalories > 1000) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [nutritionItems]);

  const addNutritionItem = () => {
    if (
      newItem.name &&
      newItem.calories >= 0 &&
      newItem.protein >= 0 &&
      newItem.carbs >= 0 &&
      newItem.fat >= 0
    ) {
      setNutritionItems([
        ...nutritionItems,
        { ...newItem, id: Date.now(), quantity: 1 },
      ]);
      setNewItem({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const removeAllItems = () => {
    setNutritionItems([]);
  };

  const editItemFunction = (item) => {
    setEditItem(item.id);
    setNewItem({ ...item });
  };

  const updateItemFunction = () => {
    if (
      newItem.name &&
      newItem.calories >= 0 &&
      newItem.protein >= 0 &&
      newItem.carbs >= 0 &&
      newItem.fat >= 0
    ) {
      const updatedItems = nutritionItems.map((item) =>
        item.id === newItem.id ? newItem : item
      );
      setNutritionItems(updatedItems);
      setNewItem({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
      setEditItem(null);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const deleteItemFunction = (id) => {
    const updatedItems = nutritionItems.filter((item) => item.id !== id);
    setNutritionItems(updatedItems);
  };

  const updateItemQuantity = (id, change) => {
    const updatedItems = nutritionItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
    );
    setNutritionItems(updatedItems);
  };

  const totalProtein = () => {
    return nutritionItems.reduce(
      (total, item) => total + parseFloat(item.protein) * item.quantity,
      0
    );
  };

  const totalCarbs = () => {
    return nutritionItems.reduce(
      (total, item) => total + parseFloat(item.carbs) * item.quantity,
      0
    );
  };

  const totalFat = () => {
    return nutritionItems.reduce(
      (total, item) => total + parseFloat(item.fat) * item.quantity,
      0
    );
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <h1 className="text-center mb-4 display-4 font-weight-bold">
          Nutrition Meter
        </h1>
        {showWarning && (
          <div className="alert alert-danger text-center">
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Total calories exceed recommended limit (1000 calories)!
          </div>
        )}
        <div className="mb-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                placeholder="Item Name"
                className={`form-control ${
                  inputError && !newItem.name ? "border-danger" : ""
                }`}
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="number"
                placeholder="Calories"
                className={`form-control ${
                  inputError && newItem.calories < 0 ? "border-danger" : ""
                }`}
                value={newItem.calories}
                onChange={(e) =>
                  setNewItem({ ...newItem, calories: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="number"
                placeholder="Protein (g)"
                className={`form-control ${
                  inputError && newItem.protein < 0 ? "border-danger" : ""
                }`}
                value={newItem.protein}
                onChange={(e) =>
                  setNewItem({ ...newItem, protein: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="number"
                placeholder="Carbs (g)"
                className={`form-control ${
                  inputError && newItem.carbs < 0 ? "border-danger" : ""
                }`}
                value={newItem.carbs}
                onChange={(e) =>
                  setNewItem({ ...newItem, carbs: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="number"
                placeholder="Fat (g)"
                className={`form-control ${
                  inputError && newItem.fat < 0 ? "border-danger" : ""
                }`}
                value={newItem.fat}
                onChange={(e) =>
                  setNewItem({ ...newItem, fat: e.target.value })
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-4">
            {editItem ? (
              <button
                className="btn btn-primary"
                onClick={updateItemFunction}
              >
                <FontAwesomeIcon icon={faEdit} /> Update Item
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={addNutritionItem}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Item
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={removeAllItems}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> Clear All
            </button>
          </div>
        </div>

        <div className="row">
          {nutritionItems.map((item) => (
            <div
              key={item.id}
              className="col-md-6 col-lg-3 mb-4"
            >
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <ul className="list-unstyled">
                    <li>Calories: {item.calories * item.quantity}</li>
                    <li>Protein: {item.protein * item.quantity}g</li>
                    <li>Carbs: {item.carbs * item.quantity}g</li>
                    <li>Fat: {item.fat * item.quantity}g</li>
                    <li className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => updateItemQuantity(item.id, 1)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateItemQuantity(item.id, -1)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => editItemFunction(item)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteItemFunction(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <p className="h4 font-weight-bold">
            Total Calories: {totalCalories}{" "}
            <FontAwesomeIcon icon={faUtensils} size="lg" />
          </p>
          <p className="h4 font-weight-bold">
            Total Protein: {totalProtein()}g
          </p>
          <p className="h4 font-weight-bold">
            Total Carbs: {totalCarbs()}g
          </p>
          <p className="h4 font-weight-bold">Total Fat: {totalFat()}g</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionMeter;
