import Button from "../components/button"
import { useNavigate } from "react-router-dom"

const Home:React.FC = () =>{
    const navigate = useNavigate()
 return(
  <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-3">Hello</h1>
      <Button label="nextpage" onClick={()=>{navigate("/va")}}></Button>
    </div>
   
 )
}

export default Home