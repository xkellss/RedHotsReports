import React, {useEffect, useState} from "react";

function Report(){
    const [isLoading, setIsLoading] = useState(true)
    const [menuItems, setMenuItems] = useState([])
    const [orders, setOrders] = useState([])

    // function handleAddToCart(menuItem) {
    //     // Add the selected menuItem to the cart
    //     console.log(`Adding ${menuItem.name} to the cart...`);
    // }
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
    const targetDate = '2023-03-21';
    const targetMonth = '2023-03';

    const ordersOnTargetDate = orders.filter(order => order.orderDate.startsWith(targetDate));
    const ordersOnTargetMonth = orders.filter(order => order.orderDate.startsWith(targetMonth));

    const totalSalesOnTargetDate = ordersOnTargetDate.reduce((total, order) => {
        if (order.total === 0 ){
            return total + order.subtotal;
        }else {
            return total + order.subtotalTax;
        }
    },0);

    const totalSalesOnTargetMonth = ordersOnTargetMonth.reduce((total, order) => {
        if (order.total === 0 ){
            return total + order.subtotal;
        }else {
            return total + order.subtotalTax;
        }
    },0);

    console.log(`Total sales on ${targetDate}: ${totalSalesOnTargetDate}`);
    console.log(`Total sales on ${targetMonth}: ${totalSalesOnTargetMonth}`);

    return(
        <section>
            <h1>Reports page</h1>
            {/*<Report menuItems={menuItems} orders ={orders}/>*/}

            <h2>order Items</h2>
            {orders.map((order) => (
                <div key={order.orderId}>
                    <p>OrderID: {order.orderId}</p>
                    <p>Email: {order.customerAccount.email}</p>
                    <p>Name: {order.customerAccount.firstName} {order.customerAccount.lastName}</p>
                    <p>Phone Number: {order.customerAccount.phoneNumber}</p>
                    {order.total === 0 ? (
                        <p> Subtotal: ${order.subtotal}</p>
                    ) : (
                        <p> SubtotalTax: ${order.subtotalTax}</p>
                    )}
                    <br/>
                </div>
                )
            )
            }
                <p>Total Subtotal: ${orders.reduce((total, order) => total + order.subtotal, 0)}</p>
                    <p>Total Sales in {targetDate} : ${totalSalesOnTargetDate}</p>
                    <p>Total Sales in {targetMonth} : ${totalSalesOnTargetMonth}</p>

        </section>
    )
} export default Report;