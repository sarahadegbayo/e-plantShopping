import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount in the cart
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const itemCost = parseFloat(item.cost.slice(1)); // Remove the "$" and convert to number
            return total + itemCost * item.quantity; // Multiply by quantity
        }, 0);
    };

    // Calculate total cost for each item
    const calculateTotalCost = (cost, quantity) => {
        const itemCost = parseFloat(cost.slice(1)); // Remove the "$" and convert to number
        return itemCost * quantity;
    };

    // Increment item quantity
    const handleIncrement = (name) => {
        const item = cartItems.find(item => item.name === name);
        dispatch(updateQuantity({ name, quantity: item.quantity + 1 }));
    };

    // Decrement item quantity
    const handleDecrement = (name) => {
        const item = cartItems.find(item => item.name === name);
        if (item.quantity === 1) {
            dispatch(removeItem(name)); // If quantity is 1, remove item
        } else {
            dispatch(updateQuantity({ name, quantity: item.quantity - 1 }));
        }
    };

    // Remove item from cart
    const handleRemoveItem = (name) => {
        dispatch(removeItem(name)); // Dispatch action to remove the item by name
    };

    // Total quantity of items in the cart
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <h1>Your Cart</h1>
            <div>
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div>{item.name}</div>
                        <div>{item.cost}</div>
                        <div>
                            <button onClick={() => handleDecrement(item.name)}>-</button>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                readOnly
                            />
                            <button onClick={() => handleIncrement(item.name)}>+</button>
                        </div>
                        <div>Subtotal: ${parseFloat(item.cost.slice(1)) * item.quantity}</div>
                        <button onClick={() => handleRemoveItem(item.name)}>Delete</button>
                    </div>
                ))}
            </div>
            <div>
                <h3>Total Quantity: {totalQuantity}</h3>
                <h3>Total Amount: ${calculateTotalAmount().toFixed(2)}</h3>
            </div>
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={() => alert('Coming Soon')}>Checkout</button>
        </div>
    );
}

export default CartItem;



