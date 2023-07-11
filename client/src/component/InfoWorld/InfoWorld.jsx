import React, { useState,useEffect } from 'react';
import {infoWorldApi} from '../../api/PostsRequests'
const InfoWorld = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await infoWorldApi();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  
     

  return (
    <div>
       {/* {data ? (
      <p>{data}</p>
    ) : (
      <p>Loading...</p>
    )}  */}
    </div>
  );
};

export default InfoWorld;