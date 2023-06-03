// import ToogleBg from "../../component/ToogleBg/ToogleBg";
import BarreHome from "../../component/barreHome/BarreHome";
import PostCenter from "../../component/PostCenter/PostCenter";
import ProfileLeft from "../../component/ProfileLeft/ProfileLeft";
import ProfileRight from "../../component/ProfileRight/ProfileRight";

function Home() {
  return (
    <>
      <BarreHome />
      <div className="home">
        <ProfileLeft location="profilLeft" />
        <PostCenter />
        <ProfileRight />
      </div>
    </>
  );
}

export default Home;
