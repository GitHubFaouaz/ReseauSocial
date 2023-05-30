// import ToogleBg from "../../component/ToogleBg/ToogleBg";
import BarreHome from "../../component/barreHome/BarreHome";
import ProfileCenter from "../../component/ProfileCenter/ProfileCenter";
import ProfileLeft from "../../component/ProfileLeft/ProfileLeft";
import ProfileRight from "../../component/ProfileRight/ProfileRight";

function Home() {
  return (
    <>
      <BarreHome />
      <div className="home">
        <ProfileLeft />
        <ProfileCenter />
        <ProfileRight />
      </div>
    </>
  );
}

export default Home;
