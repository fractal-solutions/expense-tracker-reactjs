import { TbChartBar } from "react-icons/tb";

const topnav = () => {
    return(
        <div className="top-nav">
            
            <TopNavLogo icon= { <TbChartBar size="32"/> } />
            <Title/>
        </div>
    );
};

const Title = () => <h5 className='title-text'>Finance Bros</h5>;

const TopNavLogo = ({icon}) => (
    <div className='top-nav-logo'>
        {icon}
    </div>
);

export default topnav;