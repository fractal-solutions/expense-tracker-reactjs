import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { TiChartBar } from "react-icons/ti";
import { ContentContainer } from './content';
import React, {Component} from "react";



const Sidebar = () => {



    const incomeClick = event => {
        
        document.getElementById('expense-list').classList.add('hidden');
        document.getElementById('income-list').classList.remove('hidden');
        document.getElementById('expenseModal').classList.add('hidden');
        document.getElementById('incomeModal').classList.remove('hidden');
        document.getElementById('income-add-icon').classList.remove('hidden');
        document.getElementById('expense-add-icon').classList.add('hidden');
        document.getElementById('performance').classList.add('hidden');
        
    };
    
    const expenseClick = event => {
        
        document.getElementById('expense-list').classList.remove('hidden');
        document.getElementById('income-list').classList.add('hidden');
        document.getElementById('expenseModal').classList.remove('hidden');
        document.getElementById('incomeModal').classList.add('hidden');
        document.getElementById('income-add-icon').classList.add('hidden');
        document.getElementById('expense-add-icon').classList.remove('hidden');
        document.getElementById('performance').classList.add('hidden');
        
    };
    
    const performanceClick = event => {
        document.getElementById('incomeModal').classList.add('hidden');
        document.getElementById('expenseModal').classList.add('hidden');
        document.getElementById('income-list').classList.add('hidden');
        document.getElementById('expense-list').classList.add('hidden');
        document.getElementById('performance').classList.remove('hidden');
    }; 


       

    return (
        <div className="sidebar" id="sidebar">
            <SideBarIcon icon= { <GiReceiveMoney size="32"/> } text = 'Income' clickFunction={incomeClick}/>
            <SideBarIcon icon= { <GiPayMoney size="32"/> } text = 'Expenses' clickFunction={expenseClick}/>
            <SideBarIcon icon= { <TiChartBar size="32"/> } text = 'Performance Summary' clickFunction={performanceClick}/>
            <SideBarIcon icon= { <BsFillArrowUpCircleFill size="32"/> } text = 'qqq'/>
        </div>
      );
    
};

const SideBarIcon = ({icon, text, clickFunction}) => (

    
    <div className="sidebar-icon group" onClick={clickFunction}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);



export default Sidebar;