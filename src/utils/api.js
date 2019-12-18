import axios from 'axios';

const weatherKey = '';

export function getForecast(searchTerm) {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/forecast/daily?q=${searchTerm}&type=accurate&APPID=${weatherKey}&cnt=5`
  );
}

export function getDetail(searchTerm) {
  return axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&type=accurate&APPID=${weatherKey}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}
