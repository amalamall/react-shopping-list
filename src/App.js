import { useEffect, useState } from "react";
import styled from "styled-components";
import "./index.css";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Button = styled.button`
  display: inline-block;
  flex: 1;
  border: 1px solid black;
  background-color: white;
  color: black;
  border-radius: 2px;
  cursor: pointer;
  padding: 10px;
`;
const Text = styled.input`
  border: 2px solid #000;
  width: 200px;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
`;

const LIST = styled.div`
  display: "flex";
  flex-direction: "column";
  justify-content: space-around;
`;
const App = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productList, setProductList] = useState([
    {
      id : 100,
      name : 'product100',
      price : 500,
      packed : false
      
    },
    {
      id : 200,
      name : 'product200',
      price : 700,
      packed : true
      
    },
    {
      id : 300,
      name : 'product10',
      price : 100,
      packed : false
      
    },
    {
      id : 400,
      name : 'product20',
      price : 50,
      packed : true
      
    }

  ]);
  const [countPacked, setcountPacked] = useState(0);
  const [countUnpacked, setcountUnpacked] = useState(0);

  const [totalpackedProduct, settotalpackedProduct] = useState(0);

  const [searchUnpacked, setunpackedSearch] = useState("");
  const [searchpacked, setpackedSearch] = useState("");

  const handleClick = () => {
    const id = productList.length + 1;
    setProductList((prev) => [
      ...prev,
      {
        id: id,
        name,
        price,
        packed: false,
      },
    ]);
    setName("");
    setPrice("");
  };

  const handleRemove = (id) => {
    let newProductList = productList.filter((product) => {
      return product.id !== id;
    });
    console.log(newProductList);
    setProductList(newProductList);
  };

  const handlePacked = (id) => {
    let list = productList.map((product) => {
      let item = {};
      if (product.id == id) {
        if (!product.packed) {
          settotalpackedProduct(totalpackedProduct + Number(product.price));
        } else {
          settotalpackedProduct(totalpackedProduct - product.price);
        }

        item = { ...product, packed: !product.packed };
      } else item = { ...product };
      return item;
    });
    setProductList(list);
  };

  useEffect(()=>{
    setcountPacked(productList.filter(p => p.packed).length)
    setcountUnpacked(productList.filter(p => !p.packed).length)
  },[productList])

  useEffect(()=>{
    productList?.map((p)=>{
      if(p.packed){
          settotalpackedProduct(prev => prev + p.price)
      }
    })
    return(()=> {
      settotalpackedProduct(0)
    })
  },[])


  const handleUnpackedAll = () => {
    let list = productList.map((product) => {
      return { ...product, packed: false };
    });
    setProductList(list);
  };

  return (
    <Container>
      <div>
        <h2>Product List</h2>
        <Text value={name} onInput={(e) => setName(e.target.value)} />
        <Text value={price} onInput={(e) => setPrice(e.target.value)} />
        <Button onClick={() => handleClick()}>Add</Button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3>Unpacked Items {countUnpacked} </h3>
          <Text
            value={searchUnpacked}
            onChange={(e) => setunpackedSearch(e.target.value)}
          />
          {productList?.map((product) => {
            return (
              <LIST key={product?.id}>
                {(product?.packed === false && searchUnpacked !== "" && searchUnpacked === product.name && (
                  <p
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <input
                        onClick={() => handlePacked(product?.id)}
                        type={"checkbox"}
                      ></input>
                      {product?.name}
                    </span>
                    <span> {product?.price}</span>
                    <svg
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => handleRemove(product?.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                    >
                      <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z" />
                    </svg>
                  </p>
                )) ||
                  (product?.packed === false && searchUnpacked === "" && (
                    <p
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <input
                          onClick={() => handlePacked(product?.id)}
                          type={"checkbox"}
                        ></input>
                        {product?.name}
                      </span>
                      <span> {product?.price}</span>
                      <svg
                        style={{ width: "20px", height: "20px" }}
                        onClick={() => handleRemove(product?.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                      >
                        <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z" />
                      </svg>
                    </p>
                  ))}
              </LIST>
            );
          })}
          <hr />
          <h3>Packed Items {countPacked}</h3>
          <Text
            value={searchpacked}
            onChange={(e) => setpackedSearch(e.target.value)}
          />

          {productList.map((product) => {
            return (
              <LIST key={product?.id}>
                {(product?.packed && searchpacked !== "" && searchpacked === product.name && (
                  <p
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <input
                        onClick={() => handlePacked(product?.id)}
                        type={"checkbox"}
                      ></input>
                      {product?.name}
                    </span>
                    <span> {product?.price}</span>
                    <svg
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => handleRemove(product?.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                    >
                      <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z" />
                    </svg>
                  </p>
                )) ||
                  (product?.packed && searchpacked === "" && (
                    <p
                      key={product?.id}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <input
                          onClick={() => handlePacked(product?.id)}
                          type={"checkbox"}
                        ></input>
                        {product?.name}
                      </span>
                      <span> {product?.price}</span>
                      <svg
                        style={{ width: "20px", height: "20px" }}
                        onClick={() => handleRemove(product?.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                      >
                        <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z" />
                      </svg>
                    </p>
                  ))}
              </LIST>
            );
          })}
          <Button onClick={() => handleUnpackedAll()}>
            Mark All as Unpacked
          </Button>
          <p style={{ textAlign: "right" }}>Total : {totalpackedProduct}</p>
        </div>
      </div>
    </Container>
  );
};
export default App;
