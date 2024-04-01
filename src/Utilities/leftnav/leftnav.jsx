import { useSelector } from "react-redux";
import "./css/leftnav.css";
import { Bottom } from "./subcomponents/bottom";
import { Middle } from "./subcomponents/middle";

export const LeftNav = ({}) => {
  const expand = useSelector((state) => state.App.expand);
  const { pfp_url } = useSelector((state) => state.auth.userData);
  return (
    <div className={`leftnav ${expand ? "expand" : "collapse"}`}>
      <div className={`leftnav-upper ${expand ? "expand" : "collapse"}`}>
        <div className={`pfpImg ${expand ? "expand" : "collapse"}`}>
          <img src={pfp_url} alt='pfp' />
        </div>
        <div className={`leftnav-upper-lower  ${expand ? "expand" : "collapse"}`}>
          <p className='upper-p'>Your channel</p>
          <p className='upper-p lower'>NLP</p>
        </div>
      </div>
      <Middle expand={expand} />
      <Bottom expand={expand} />
    </div>
  );
};
