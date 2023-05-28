import React from 'react'

const Admintable = (props) => {
  return (
    <>
      <table className="admintable">
        <thead className="tableheader">
          <tr>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Price</th>
            <th>Product Category</th>
            <th>Product Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         
          {props.product.map((item) => (
            <tr
              key={item.productId}
              onClick={() => props.handleRowClick(item)}
              className={props.selectedRow === item ? "selected" : ""}
            >
              <td>{item.productDescription}</td>
              <td>{item.productCategory}</td>
              <td>{item.productPrice}</td>
              <td>{item.productName}</td>

              <td>
                <img
                  src={`data:image/png;base64,${item.productImage}`}
                  width={100}
                  height={100}
                  alt=""
                />
              </td>
              <td>
                <a>
                  <i
                    class="fa-solid fa-trash"
                    onClick={() => props.deleteProduct(item)}
                  ></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Admintable
