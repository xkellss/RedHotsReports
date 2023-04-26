import React, {useEffect, useState} from "react";
import Dashboard from './Dashboard';
import OrderData from './OrderData';
import TopItems from './TopItems';
import classes from './ReportPage.module.css';

function Report(){
    const [isLoading, setIsLoading] = useState(true)
    const [menuItems, setMenuItems] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setIsLoading(true);
        
        fetch('/json/item.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const menuItems = [];

                for (const key in data) {
                    const menuItem = {
                        id: key,
                        ...data[key]
                    };
                    menuItems.push(menuItem);
                }
                setMenuItems(menuItems)
                console.log("menuItems:", menuItems);

            })
            .then(() => fetch('/json/order.json'))
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        const orders = [];

                        for (const key in data) {
                            const order = {
                                id: key,
                                ...data[key]
                            };
                            orders.push(order);
                        }
                        setIsLoading(false)
                        setOrders(orders)
                        console.log("orders:", orders);
                    });
        }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }
    //net sales = subtota
    //gross sales = subtotalTax

    const grossSales = orders.reduce((total,order) => total + order.subtotalTax, 0)
    const netSales = orders.reduce((total,order) => total + order.subtotal, 0)
    const salesTax = orders.reduce((total,order)=> total+ order.total,0)


    function dayOfWeek(dateString) {
        const date = new Date(dateString);
        return date.getDay();
    }
        const weeklyNetSales = new Array(7).fill(0);
    const weeklyTransactions = new Array(7).fill(0);
    const weeklyDates = new Array(7).fill('');

        orders.forEach((order) => {
            const weekDay = dayOfWeek(order.orderDate);
            weeklyNetSales[weekDay] += order.subtotal;
            weeklyTransactions[weekDay] ++;
            weeklyDates[weekDay] = new Date(order.orderDate).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit'
            });
        });


    const dataReport = {
        grossSales: grossSales,
        netSales:netSales,
        salesTax: salesTax,
        weeklyNetSales: weeklyNetSales,
        weeklyTransactions: weeklyTransactions,
        weeklyDates: weeklyDates,
    };

    return(
        <div>
        <section className={classes.report}>
            <h4 className={classes.dashboard}>Dashboard</h4>
            {/*order data*/}
                <OrderData dataReport={dataReport} className={classes.reportData}/>
                <Dashboard orders={orders} dataReport={dataReport} className={classes.reportData} />
                <TopItems orders={orders} menuItems={menuItems} className={classes.reportData} />
        </section>
        </div>
    )
} export default Report;