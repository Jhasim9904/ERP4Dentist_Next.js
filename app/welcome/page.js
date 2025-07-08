// import WelcomeScreen from "@/components/WelcomeScreen/WelcomeScreen";
import WelcomeScreen from "@/components/WelcomeScreen/WelcomeScreen";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";



const WelcomePage = () => {
  return (
    <div className="app-layout">
                <div className="main-content">
                  <Navbar
                  />
                  <div className="container1">
                    <WelcomeScreen />
                  </div>
                  <div style={{ marginTop: "100px" }}>
                    <Footer />
                  </div>
                </div>
              </div>
    

  );
};

export default WelcomePage;