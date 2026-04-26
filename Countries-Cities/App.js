import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import React, { useEffect, useState } from 'react';


const App = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState('');

  const [result, setResult] = useState(null);
  const [populationInfo, setPopulationInfo] = useState(null);
  const [flag, setFlag] = useState('');

  const [loading, setLoading] = useState(false);

  const searchCity = async () => {
    if (!city || !country || !year) {
      alert('Enter city, country, and year!');
      return;
    }

    setLoading(true);
    //IA: usei pra entender ligar duas chamadas de API (população e bandeira)
    try {
      const responsePopulation = await fetch(
        'https://countriesnow.space/api/v0.1/countries/population/cities/filter',  //população
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            city: city,
            country: country
          }),
        }
      );

      const populationJson = await responsePopulation.json();

      const responseFlag = await fetch(
        'https://countriesnow.space/api/v0.1/countries/flag/images',  //bandeira
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            country: country
          }),
        }
      );

      const flagJson = await responseFlag.json();

      console.log(populationJson);
      console.log(flagJson);

      //IA: pedi sugestão de como tratar erro de fetch (estava trazendo as informações erradas das cidades)
      if (populationJson.data && populationJson.data.length > 0) {
      const cityData = populationJson.data.find(
        item => item.city.toLowerCase() === city.toLowerCase()
      );

      if (cityData) {
        const selectedYear = cityData.populationCounts.find(
          item => item.year === year
        );

        setResult(cityData);
        setPopulationInfo(selectedYear || null);

        if (flagJson.data?.flag) {
          setFlag(flagJson.data.flag);
        }

        if (!selectedYear) {
          alert("Year not found");
        }

      } else {
        alert("Exact city not found");
      }
    }

    } catch (error) {
      console.log(error);
      alert('Error searching for data');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.card}>
      <Text style={styles.innerText}>Countries&Cities</Text>
      <Text style={styles.description}>Project developed with the goal of consulting population data of cities in different countries, allowing to search for the population by a specific year and view the corresponding country's flag through integration with an external API.</Text>
      <Text style={styles.description}>Note: Enter the names of the city and the country in English.</Text>
      </View>

      <View style={styles.card}>
      <TextInput
        placeholder="Enter the city"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter the country"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter the year"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        style={styles.input}
      />

    <Button 
      title="Search" 
      onPress={searchCity}
      color="#17375c"
        title="Buscar"
        onPress={searchCity}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 20 }}
        />
      )}

      {result && populationInfo && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            City: {result.city}
          </Text>

          <Text style={styles.resultText}>
            Country: {result.country}
          </Text>

          <Text style={styles.resultText}>
            Year: {populationInfo.year}
          </Text>

          <Text style={styles.resultText}>
            Population: {populationInfo.value}
          </Text>

          <Text style={styles.resultText}>
            Sex: {populationInfo.sex}
          </Text>
        </View>
      )}

      {flag && (
        <Image
          source={{ uri: flag }}
          style={styles.flag}
        />
      )}

    </View>
  
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 0,
    backgroundColor: '#eeeeee'
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,

  },


  input: {
    borderWidth: 2,
    borderColor: '#17166e',
    padding: 10,
    marginBottom: 15,
    borderRadius: 15
  },

  resultContainer: {
    marginTop: 20
  },

  resultText: {
    fontSize: 18,
    marginBottom: 8,
    fontStyle: 'italic'

  },

  flag: {
    width: 270,
    height: 190,
    marginTop: 20,
    resizeMode: 'contain',
    alignSelf: 'center'

  },

    innerText: {
    color: '#17166e',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10


  },
    description: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 15
  },

  //IA: pedi orientação de design para criar um card mais bonito, com sombra e bordas arredondadas

  card: {
  backgroundColor: '#fff',
  padding: 25,
  borderRadius: 20,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,

  elevation: 8
  }
});

export default App;