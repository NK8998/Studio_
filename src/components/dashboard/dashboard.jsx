import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UploadVideo } from "../../assets/dashboardelements";
import "./css/dashboard.css";
import { FirstCard } from "./subcomponents/firstcard";
import { SecondCard } from "./subcomponents/secondcard";
import { ThirdCard } from "./subcomponents/thirdcard";
import withTransition from "../../Utilities/transition";

const Dashboard = ({}) => {
  const { channelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className='dashboard'>
      <div className='dashboard-wrapper'>
        <div className='dashbord-rows-top'>
          <p>Channel dashboard</p>
          <div className='end'>
            <div className='upload--videos'>
              <UploadVideo />
            </div>
          </div>
        </div>
        <div className='dashboard-rows-lower'>
          <FirstCard />
          <SecondCard />
          <ThirdCard />
        </div>
      </div>
    </div>
  );
};

export default withTransition(Dashboard);
