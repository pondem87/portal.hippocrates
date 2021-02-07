import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/user/userContext';
import DashHeader from '../dashboard/dashHeader';
import moment from 'moment';
import { getTransactionsList } from '../../functions/paymentFunctions';

const PaymentHistory = () => {
    const user = useContext(UserContext)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        getPayments()
    }, [])

    const getPayments = async () => {
        try {
            let trans = await getTransactionsList(user.token);
            setTransactions(trans)
        } catch (error) {
            alert("Failed to load transactions: " + error)
        }
    }

    const history = useHistory();

    const goToHome = () => {
        history.push('/');
    }

    return (
        <div>
            <DashHeader user={user} />
            <div className="row">
                <div className="col-12 border-bottom border-info">
                    <button onClick={goToHome} className="btn btn-outline-info mt-1 float-right"><i className="fas fa-home mr-1"></i>Go back to dashboard</button>
                    <h2 className="text-muted">Payment History</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Date/Time</th>
                                <th scope="col">Method</th>
                                <th scope="col">Gateway</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Service</th>
                                <th scope="col">Date of service</th>
                                <th scope="col">Payment status</th>
                                <th scope="col">Service status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions && transactions.map((transaction) => {
                                    return (
                                        <tr key={transaction.uuid}>
                                            <td>{moment(transaction.timestamp).format("ddd D MMM, HH:mm")}</td>
                                            <td>{transaction.method}</td>
                                            <td>{transaction.provider}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.service}</td>
                                            <td>{moment(transaction.created_at).format("ddd D MMM, HH:mm")}</td>
                                            <td>
                                                {
                                                    transaction.status === "Awaiting Delivery" || transaction.status === "Delivered" || transaction.status === "Paid" ?
                                                        "Paid" : transaction.status === "Created" || transaction.status === "Sent" ? "Pending" : transaction.status
                                                }
                                            </td>
                                            <td>
                                                {
                                                    transaction.fullfilled ? "Completed" :
                                                        transaction.reject ? "Cancelled" : "Pending"
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }                            
                        </tbody>
                    </table>
                    {
                        transactions && transactions.length === 0 ? <div className="text-center"><p>There are no payments to display.</p></div> : <span />
                    }
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory;