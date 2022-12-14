import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { doc, deleteDoc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const TransactionList = ({ transactions }) => {
  const handleDelete = () => {};

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200"> 
        {transactions.map((transaction) => (
            

          <li 
            key={transaction.uid}
            className="py-4 rounded-lg bg-white shadow-lg "
          >
            <div className="card-body">
            {console.log(transaction.id)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div className="card-title">
              <p className="text-lg font-medium text-gray-900">
                {transaction.name}
              </p>
              <p className="text-lg text-gray-500">${transaction.amount}</p>

              <div className="place-self-center">
                <FaTrashAlt
                  onClick={() =>
                    deleteDoc(
                      doc(projectFirestore, "transactions", transaction.id)
                    )
                  }
                />
              </div>
            </div>
          </div>
          </li>
        ))}
      </ul>

    
    </div>
  );
};

export default TransactionList;
