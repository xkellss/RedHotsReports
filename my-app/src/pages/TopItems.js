import React from "react";
import classes from './TopItems.module.css'

function TopItems({orders, menuItems}){

    const itemCounts = {};

    // Iterate through the orders and items to count the number of times each item has been ordered
    orders.forEach(order => {
        order.orderItems.forEach(item =>{
            const itemName = item.itemName;
            const count = item.count;

            if (itemCounts[itemName]){
                itemCounts[itemName] += count;
            }else{
                itemCounts[itemName] = count;
            }
        })
    })

    // Sort the items by their count in descending order
    const itemList = Object.keys(itemCounts).sort((a, b) => itemCounts[b] - itemCounts[a]);

    return (
        <div className={classes.listContainer}>
            <ol className={classes.order}>
                {itemList.map((itemName) => (
                    <li key={itemName}>
                        {itemName}  <span className={classes.count}>{itemCounts[itemName]} times ordered</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}export default TopItems;
