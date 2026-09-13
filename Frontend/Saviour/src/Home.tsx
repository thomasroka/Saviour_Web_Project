import Background from "./Background"
import Footer from "./Components/Footer"
import LandingDoctors from "./Components/LandingDoctors"
import Navbar from "./Components/Navbar"
import Testimonal from "./Components/Testimonal"
import Work from "./Components/Work"
const Home = () => {
    return (
        <div className="w-full overflow-x-hidden">
            <Navbar />
            <Background />
            <Work />
            <LandingDoctors />
            <Testimonal />
            <Footer />
        </div>
    )
}

export default Home