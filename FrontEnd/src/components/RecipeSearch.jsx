import { Button } from "antd";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Center } from "@chakra-ui/react";
import { NavLink, Navigate } from "react-router-dom";

function RecipeSearch() {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipeData, setRecipeData] = useState(null);
  const [recipeImage, setRecipeImage] = useState("");
  const [loading, setLoading] = useState(false); // State variable to track loading state

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://kitchen-kingdom-ai.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredients.split(/[,\s]+/) }),
      });
      const data = await response.json();
      const dishName = data.data["Dish Name"];
  
      const response1 = await fetch("https://kitchen-kingdom-ai.onrender.com/dish", { // Changed endpoint to /dish
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dish: dishName }), // Pass dish name in request body
      });
  
      if (!response1.ok) {
        throw new Error(`Failed to fetch image URL: ${response1.status} ${response1.statusText}`);
      }
  
      const data1 = await response1.json();
      setRecipeData(data);
      setRecipeImage(data1.imageUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  

  return (
    <div style={styles.container}>
      <Navbar />
      <div>
        <h1 style={styles.title}>Cook What You Want With Kitchen-Kingdom-AI</h1>
        <div style={styles.formContainer}>
        <input
            type="text"
            placeholder="Enter ingredients (comma or space separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
          Generate Recipe
          </button>
        </div>
        {loading ? (
          // Apply the loading animation styles
          <div style={styles.loadingContainer}>
          {/* <div style={styles.loadingSpinner}></div> */}
          <div style={styles.loadingText}>🍳 Please wait, your recipe is being prepared! 🍽️</div>
          </div>
        ) : (
          recipeData && (
            <div>
              {/* Display recipe name */}
              <div style={styles.loadingTexts}>
                  🍳 For you, our Kitchen-Kingdom-AI suggests this recipe! 🍽️
                </div>
              <h1 style={styles.title}>{`${recipeData.data["Dish Name"]} **`}</h1>
              <div className="card-container" style={styles.cardContainer}>
                {recipeData.data["Ingredients:"] && (
                  <div className="card" style={styles.card}>
                    <h3 style={styles.cardTitle}>Ingredients:</h3>
                    <ul style={styles.list}>
                      {recipeData.data["Ingredients:"].map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {recipeData.data["Instructions:"] && (
                  <div className="card" style={styles.card}>
                    <h3 style={styles.cardTitle}>Instructions:</h3>
                    <ol style={styles.list}>
                      {recipeData.data["Instructions:"].map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {recipeData.data["Extra Add-Ons:"] && (
                  <div className="card" style={styles.card}>
                    <h3 style={styles.cardTitle}>Extra Add-Ons:</h3>
                    <ul style={styles.list}>
                      {recipeData.data["Extra Add-Ons:"].map((addOn, index) => (
                        <li key={index}>{addOn}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <img
                src={recipeImage}
                alt="Recipe"
                style={styles.recipeImage}
              />
              <Center h="10vh"></Center>
            </div>
          )
        )}
      </div>
    </div>
  );
  
  
}

const styles = {
  loadingContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: "9999",
  },
  loadingText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    // marginLeft: "25%",
    marginBottom: "20px", // Add margin to separate from the loading spinner
  },
  loadingTexts: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginLeft: "25%",
    marginBottom: "20px", // Add margin to separate from the loading spinner
  },
  container: {
    maxWidth: "1500px",
    marginBottom: "10px",
    margin: "0 auto",
    padding: "0px",
    paddingBottom:"10px",
    borderRadius: "10px",
    background: "#FFFFFF",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    marginTop: "30px",
    marginBottom: "30px",
    color: "gold",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },
  recipeImage: {
    width: "40%", // Set the width of the image to 100% of the container
    height: "auto", // Maintain aspect ratio
    marginTop: "30px",
    marginLeft: "30%",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
  },
  input: {
    width: "calc(90% - 100px)",
    padding: "12px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px 30px",
    backgroundColor: "#ffc100",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  cardContainer: {
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardTitle: {
    color: "gold",
    marginBottom: "15px",
  },
  list: {
    paddingInlineStart: "20px",
  },
};

// Hover styles
styles.cardHover = {
  transform: "translateY(-5px)",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
};

styles.cardHoverH3 = {
  color: "#ff6347",
};

export default RecipeSearch;
