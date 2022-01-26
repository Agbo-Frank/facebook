import Header from "../../Header/Header"
import LeftColumn from "../../LeftColumn/LeftColumn"
import MainColumn from "../../MainColumn/MainColumn"
import RightColumn from "../../RightColumn/RightColumn"
import './home.css'

function Home(){
    return(
        <>
            <Header />
            <div className="home">
                <LeftColumn />
                <MainColumn />
                <RightColumn />
            </div>
        </>
    )
}
export default Home