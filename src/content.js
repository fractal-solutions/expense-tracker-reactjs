import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CgEditHighlight } from "react-icons/cg";
import { GiMoneyStack } from "react-icons/gi";
import { AiFillBank } from "react-icons/ai";
import { RiScalesFill } from "react-icons/ri";
//
import expenses from './expenses';
import income from './income';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import style from './App.module.css';
import { Chart as ChartJS } from 'chart.js/auto';
import {Line} from 'react-chartjs-2';







export function ContentContainer () {

    const [expenseArr,updateExpense] = useState([]);
    const [incomeArr,updateIncome] = useState([]);




    var expenseModalState = false;
    function ExModal () {
        
        
        const [exModal, setExModal] = useState(false);   

        function expenseModal () {
                setExModal(!exModal);
                expenseModalState = !expenseModalState;
                document.getElementById('expense-list').classList.toggle('blur-lg');
                document.getElementById('sidebar').classList.toggle('blur-sm');
                
                
        };

        function addExpense () {
            var supplier = document.getElementById('supplier').value;
            var itemName = document.getElementById('itemName').value;
            var unitCost = document.getElementById('unitCost').value;
            var quantity = document.getElementById('quantity').value;
            var date = document.getElementById('date').value;
            var id = uuid();
            var newExpense = {id:id, supplier:supplier, itemName:itemName, date:date, unitCost:unitCost, quantity:quantity}
            updateExpense([newExpense,...expenseArr]);
            
            //expenses.unshift({supplier:supplier, itemName:itemName, date:date, unitCost:unitCost, quantity:quantity});
            expenseModal();
        };

        return (
            <div id="expenseModal">
                <div className="add-expense" id="add-expense">
                    <AddIcon icon={ <IoMdAddCircle size="64"/> } clickFunction={expenseModal}/>
                </div>

                {exModal && (
                    <div className="modal">
                        <div className="overlay"></div>
                        <div className="modal-content">
                            <div className="h-4"></div>
                            <p>ADD EXPENSE</p>
                            <div className="h-4"></div>
                            <input type="text" id="supplier" className="w-8/12" placeholder="Supplier"></input>
                            <input type="text" id="itemName" className="w-8/12" placeholder="Item Name"></input>
                            <input type="number" id="unitCost" className="w-5/12" placeholder="Unit Cost"></input>
                            <input type="number" id="quantity" className="w-3/12" placeholder="Qty"></input>
                            
                            <input type="date" id="date" className="w-5/12" placeholder="Date"></input>
                            <button onClick={addExpense} className="w-3/12 text-white bg-black h-10 hover:bg-red-900 transition-all duration-300 ease-out">+</button>
                            <button className="close-modal" onClick={expenseModal}>X</button>
                        </div>
                    </div>
                )}

                
            </div>
        );
    };

    
    var incomeModalState = false;
    function InModal () {
        
        
        
        const [inModal, setInModal] = useState(false);

        function incomeModal () {
                setInModal(!inModal);
                incomeModalState = !incomeModalState;
                document.getElementById('income-list').classList.toggle('blur-lg');
                document.getElementById('sidebar').classList.toggle('blur-sm');
                
        };

        

        function addIncome () {
            var itemName = document.getElementById('itemName').value;
            var unitCost = document.getElementById('unitCost').value;
            var date = document.getElementById('date').value;
            var id = uuid();
            console.log(date);
            var newIncome = {id:id, itemName:itemName, date:date, unitCost:unitCost, quantity:1};
            updateIncome([newIncome,...incomeArr]);
            //income.unshift({itemName:itemName, date:date, unitCost:unitCost, quantity:1});
            incomeModal();
            
        };

        return (
            <div id="incomeModal">
                <div className="add-income"  id="add-income">
                    <AddIcon icon={ <IoMdAddCircle size="64"/> } clickFunction={incomeModal}/>
                </div>

                {inModal && (
                    <div className="modal">
                        <div className="overlay"></div>
                        <div className="modal-content">
                        <div className="h-4"></div>
                            <p>ADD INCOME</p>
                            <div className="h-4"></div>
                            <input type="text" id="itemName" className="w-8/12" placeholder="Source"></input>
                            <input type="number" id="unitCost" className="w-5/12" placeholder="Amount"></input>
                            <input type="number" className="w-5/12 scale-0" placeholder="NEXT LINE"></input>
                            <input type="date" id="date" className="w-5/12"  placeholder="Date"></input>
                            <input type="number" className="w-5/12 scale-0" placeholder="NEXT LINE"></input>
                            <button onClick={addIncome} className="w-3/12 text-white bg-black h-10 hover:bg-green-900 transition-all duration-300 ease-out">+</button>
                            <button className="close-modal" onClick={incomeModal}>X</button>
                        </div>
                    </div>
                )}

                

                
            </div>
        );
    };

    

    const AddIcon = ({icon, clickFunction}) => (
        <div className="add-icon" onClick={ clickFunction }>
            {icon}
        </div>
    );

    const ItemIcon = ({icon, clickFunction,iconColor}) => (
        <div className={"item-icon " + iconColor} onClick={ clickFunction }>
            {icon}
        </div>
    );


   

    function Item  ({item, type}) {

        const itemName = item.itemName;
        const date = item.date;
        const unitCost = item.unitCost.toLocaleString();
        const quantity = item.quantity;
        const total = (unitCost * quantity).toLocaleString();
        
        var counter = 1;

            //ITEM ICON FUNCTIONS
        function deletePrompt() {
            if(type === 1){
                updateIncome(incomeArr.filter(income => {return income.id !== item.id;}));
            } 
            else {
                updateExpense(expenseArr.filter(expense => {return expense.id !== item.id;}));
            }
            
            


        }

        function highlightItem() {
            
            counter++;
        }
        


        return (<div className={ counter%2 === 0 ? style.highlighted : style.item + " group"} id="item">
            
            <span className="item-shortcuts">
                    <ItemIcon icon={ <CgEditHighlight size="14"/> } clickFunction={highlightItem} iconColor="text-yellow-500"/>
                    <ItemIcon icon={ <MdDelete size="14"/> } clickFunction={deletePrompt} iconColor="text-red-500"/>
       
            </span>
            <span className="item-name">{itemName}
                <span className="item-date group-hover:text-white">{date}</span>
                
            </span>
            
            <hr className="p-1 mx-4 hover:text-white" ></hr>
            <span className="item-text">
                KES {unitCost} per unit    
            </span>
            { type === 1 ?
                <span className="item-total text-green-800 group-hover:text-green-600">
                    KES {total}
                </span>
                : <span className="item-total text-red-800 group-hover:text-red-600">
                    KES {total}
                </span>
            }
            
            <span className="item-text">Qty: {quantity}</span>
            
        </div>);
    };


    function PerformanceSummaryItem(){
       
        const [date, setDate] = useState([]);
        const [total, setTotal] = useState(0);
        const [incomeTotal, setIncome] = useState(0);
        const [expenseTotal, setExpense] = useState(0);
        useEffect(() => {
            setDate(...date, incomeArr.map(o => {return o.date;}));
            setDate(...date, [...date].concat(expenseArr.map(o => {return o.date}).filter((item) => [...date].map(o => {return o.date}).indexOf(item) < 0)));
            //setDate([...date].sort((a,b) => a > b ? -1 : 1));
            var incomeSum = incomeArr.reduce(function(prev, curr){
                return prev + + curr.unitCost
            },0);

            var expenseSum = expenseArr.reduce(function(prev, curr){
                return prev + + (curr.unitCost*curr.quantity)
            },0);

            setTotal(incomeSum-expenseSum);
            setIncome(incomeSum);
            setExpense(expenseSum);
            console.log(incomeSum +'vs '+expenseSum  );

            
        },[]);
        

        return (
            <>
                <div className="item group">
                    <Line 
                        datasetIdKey="id"
                        data = {{
                            labels: [...date.map(o => o)],
                            datasets: [
                                {
                                    label: 'Income',
                                    borderColor: '#1f9e0b',
                                    data:[...incomeArr.map(o => o.unitCost)]
                                },
                                {
                                    label: 'Expenses',
                                    borderColor: '#cf2b2b',
                                    data:[...expenseArr.map(o => o.unitCost* o.quantity)]
                                },
                            ],
                        }}
                        options = {{
                            scales: {
                                x: {
                                    reverse: true,

                                    ticks: {
                                        display: false,
                                    },

                                    grid:{
                                        color: '#ffffff',
                                    }
                                    
                                },
                                y: {
                                    grid:{
                                        color: '#ffffff',
                                    }  
                                }
                                
                            },
                            tension: 0.3,
                            pointStyle: 'crossRot',
                            borderWidth: 1,
                            aspectRatio: 2.7/1,
                            plugins: {
                                title: {
                                    display: false,
                                    text: 'Expense Tracker',
                                    font:{weight: 'lighter', size: 20},
                                    color: '#000000',
                                }
                            },
                        }}
                    /> 

                </div>
                
                <div className="item group">
                    <div className="flex-row flex">
                        <ItemIcon icon={ <GiMoneyStack size="36"/> }  iconColor="text-black"/>
                        <span className="item-text px-3">
                            Floating Balance:    
                        </span>

                        { total > 0 ?
                            <span className="item-total text-green-800 group-hover:text-green-600 pl-6">
                                KES {total.toLocaleString()}
                            </span>
                            : <span className="item-total text-red-800 group-hover:text-red-600">
                                KES {total.toLocaleString()}
                            </span>
                        }
                    </div>
                    <div className="flex-row flex">
                        <ItemIcon icon={ <RiScalesFill size="36"/> }  iconColor="text-black"/>
                        <span className="item-text px-3">
                            Gross Revenue:    
                        </span>

                        { incomeTotal > 0 ?
                            <span className="item-total text-green-800 group-hover:text-green-600 pl-6">
                                KES { incomeTotal.toLocaleString()} 
                            </span>
                            : <span className="item-total text-red-800 group-hover:text-red-600">
                                KES { incomeTotal.toLocaleString()} 
                            </span>
                        }
                    </div>
                    <div className="flex-row flex">
                        <ItemIcon icon={ <AiFillBank size="36"/> }  iconColor="text-black"/>
                        <span className="item-text px-3">
                            Value Retention:    
                        </span>

                        { total > 0 ?
                            <span className="item-total text-green-800 group-hover:text-green-600 pl-6">
                                { ((incomeTotal/(incomeTotal-total))*10.5).toFixed(2)} %
                            </span>
                            : <span className="item-total text-red-800 group-hover:text-red-600">
                                { ((total/(expenseTotal-total))*100).toFixed(2)} %
                            </span>
                        }
                    </div>
                </div>
            </>
        );
    };

    


    //THE MAIN RETURN
    return(
        
        
            <div className="content-container">
                
                <div id="expense-list" className="expense-content-list">
                { !expenseArr.length ?
                        console.log("no items")
                        : expenseArr.map( item => (
                        <Item key={uuid()} item = {item} type={2} />
                        
                    ))}
                </div>
                <div id="income-list" className="income-content-list">
                    { !incomeArr.length ?
                        console.log("no items")
                        : incomeArr.map( item => (
                        <Item key={uuid()} item = {item} type = {1} />
                        
                    ))}
                </div>

                <div id="performance" className="expense-content-list">
                    <PerformanceSummaryItem />
                </div>

                <div className="add-icon-holder">
                    <div id="expense-add-icon">{ (<ExModal/>)}</div>
                    
                    <div id="income-add-icon">{ (<InModal/>)}</div>
                </div>
            </div>
            
        
    );//add icon holder contains add button
};









export default ContentContainer;