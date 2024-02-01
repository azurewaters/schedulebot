"use client";

import { useState } from "react";
import { Drink } from "@/app/types/Drinks";

export default function Home() {

  //  State to store the list of drinks
  const [listOfDrinks, setListOfDrinks] = useState<Drink[]>([]);

  //  Function to fetch data from the server and set the state of listOfDrinks
  const handleClick = async () => {
    const response = await fetch('api/drinks');
    setListOfDrinks(response.ok ? await response.json() : []);
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleClick} className="bg-gray-800 text-white p-2 rounded-lg">Fetch a list of drinks</button>
      <div className="flex flex-col">
        {listOfDrinks.map((drink:Drink) => (
          <div key={drink.id}>
            <p>{drink.title}</p>
            <p>{drink.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
