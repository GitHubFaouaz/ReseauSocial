import axios from 'axios';

export const getData = async (req, res) => {
  try {
    const response = await axios.get('https://sortiraujourdhui.fr/api/?u=Faouaz&k=e607f5ff4b1fe57bdfd1c552b3add021');
    const data = response.data;
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};