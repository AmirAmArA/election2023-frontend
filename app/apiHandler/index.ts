const API_URL = process.env.NEXT_PUBLIC_API_URL;


/**
 * Fetches city data from the API.
 *
 * @returns {Promise<CityData[]>} A promise that resolves to an array of city data.
 * @throws {Error} Throws an error if there is an issue with the fetch operation or response.
 */
export async function getCities(): Promise<CityData[]> {
  try {
    // Fetch city data from the API
    const res = await fetch(`${API_URL}/city`);
    
    // Check if the response is not OK and throw an error if needed
    if (!res.ok) {
      throw new Error("Can't reach the server right now");
    }

    // Parse the JSON response
    const cities: CityData[] = await res.json();

    // Return the parsed city data
    return cities;

  } catch (error: any) {
    // Catch any errors that occur during the fetch or JSON parsing
    throw new Error(error.message);
  }
}

/**
 * Fetches city data from the API.
 *@param {string} city
 * @returns {Promise<AddsData[]>} A promise that resolves to an array of adds data.
 * @throws {Error} Throws an error if there is an issue with the fetch operation or response.
 */
// export async function getAdds(): Promise<AddsData[]> {
//   try {
//     // Fetch city data from the API
//     const res = await fetch(`${API_URL}/adds`);
    
//     // Check if the response is not OK and throw an error if needed
//     if (!res.ok) {
//       throw new Error("Can't reach the server right now");
//     }

//     // Parse the JSON response
//     const adds: AddsData[] = await res.json();

//     // Return the parsed city data
//     return adds;

//   } catch (error: any) {
//     // Catch any errors that occur during the fetch or JSON parsing
//     throw new Error(error.message);
//   }
// }

export const getAdds = async (city: string) => {
  try {
      
      // Make a fetch request to the API to get city data
      console.log({city})
      const addcity = city;
      const res = await fetch(`${API_URL}/adds/addcity`,
      {
        method: 'POST',
        headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({addcity: city}),
    });

      // Check if the response is not OK, and throw an error if needed
      if (!res.ok) {
          throw new Error("Can't reach the server right now");
      }

      // Parse the response JSON into an array of CityData objects
      const adds: any = await res.json();

      // Return the fetched city data
      return adds;
  } catch (error: any) {
      // Catch any errors that occur during the fetch or JSON parsing
      throw new Error(error.message);
  }
};

/**
 * Fetches votes data for a specific city.
 *
 * @param {string} city - The name of the city.
 * @returns {Promise<votesData[]>} - A promise that resolves to an array of city vote data.
 * @throws {Error} - Throws an error if there is a fetch error or JSON parsing error.
 */
export const getVotesofCity = async (city: string) => {
  try {
      
      // Make a fetch request to the API to get city data
      const res = await fetch(`${API_URL}/candidate/${city}`);

      // Check if the response is not OK, and throw an error if needed
      if (!res.ok) {
          throw new Error("Can't reach the server right now");
      }

      // Parse the response JSON into an array of CityData objects
      const votes: votesData[] = await res.json();

      // Return the fetched city data
      return votes;
  } catch (error: any) {
      // Catch any errors that occur during the fetch or JSON parsing
      throw new Error(error.message);
  }
};




/**
 * Fetches data by date and city from the API.
 *
 * @param {string} date - The date for which data is requested.
 * @param {string} city - The name of the city for which data is requested.
 * @returns {Promise<any[]>} - A promise that resolves to an array of data for the specified date and city.
 * @throws {Error} - Throws an error if there is a fetch error or JSON parsing error.
 */
export const fetchByDateAndCity = async (date: string, city: string) => {
  try {
      // Make a fetch request to the API to get data by date and city
      const res = await fetch(`${API_URL}/history/by-date-and-city`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city, date }),
      });

      // Check if the response is not OK, and throw an error if needed
      if (!res.ok) {
          throw new Error("Can't reach the server right now");
      }

      // Parse the response JSON into an array of data objects
      const dataByDateAndCity: any[] = await res.json();

      // Return the fetched data
      return dataByDateAndCity;

  } catch (error: any) {
      // Catch any errors that occur during the fetch or JSON parsing
      throw new Error(error.message);
  }
};
