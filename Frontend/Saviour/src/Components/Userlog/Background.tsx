type Bgstatus = {
    status: boolean;
}
import OnlineDoctor from '../../assets/UserLog/OnlineD.png'
import Onlinepana from '../../assets/UserLog/Onlinepana.png'

const Background = ({ status }: Bgstatus) => {
    const image = status ? OnlineDoctor : Onlinepana
    return (
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-full min-h-[250px] lg:min-h-[400px] xl:min-h-[500px] rounded-3xl bg-gradient-to-br from-indigo-50/80 via-blue-50/60 to-slate-50/80 bg-contain bg-center bg-no-repeat relative overflow-hidden" style={{ backgroundImage: `url(${image})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
        </div>
    )
}
export default Background
