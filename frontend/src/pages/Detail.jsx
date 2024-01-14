import { useEffect } from "react";
import DetailHotel from "../components/detail/DetailHotel";


const Detail = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <DetailHotel/>
};

export default Detail;
