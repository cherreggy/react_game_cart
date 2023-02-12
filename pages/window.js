import { CloseSquareOutlined, DownloadOutlined } from "@ant-design/icons";

import { Button } from "antd";
import { useEffect } from "react";

function CartList(props) {
  var items = [];
  // const items = props.cartData.map((item) => {
  //   if (item.num > 0)
  //     return (
  // <CartListItem
  //   key={item.name}
  //   name={item.name}
  //   price={item.price}
  //   pc_num={item.pc_num}
  //   switch_num={item.switch_num}
  //   ps_num={item.ps_num}
  //   img_url={item.img_url}
  // ></CartListItem>
  //     );
  //   else return null;
  // });
  // 遍历所有产品，显示购物车内情况时将三样种类分开
  var totalPrice = 0; //所有商品总价
  var num_all = 0; //所有商品数目
  for (let i = 0; i < props.cartData.length; i++) {
    // PC端产品
    if (props.cartData[i].pc_num > 0) {
      items.push(
        <CartListItem
          ind={i}
          key={props.cartData[i].name + "PC"}
          name={props.cartData[i].name}
          price={props.cartData[i].price}
          num={props.cartData[i].pc_num}
          img_url={props.cartData[i].img_url}
          type="PC端"
          handleData={props.handleData}
          data={props.cartData}
        ></CartListItem>
      );
      num_all += props.cartData[i].pc_num;
      totalPrice += props.cartData[i].pc_num * props.cartData[i].price.slice(1);
    }
    // Switch端产品
    if (props.cartData[i].switch_num > 0) {
      items.push(
        <CartListItem
          ind={i}
          key={props.cartData[i].name + "Switch"}
          name={props.cartData[i].name}
          price={props.cartData[i].price}
          num={props.cartData[i].switch_num}
          img_url={props.cartData[i].img_url}
          type="Switch端"
          handleData={props.handleData}
          data={props.cartData}
        ></CartListItem>
      );
      num_all += props.cartData[i].switch_num;
      totalPrice +=
        props.cartData[i].switch_num * props.cartData[i].price.slice(1);
    }
    // PS端产品
    if (props.cartData[i].ps_num > 0) {
      items.push(
        <CartListItem
          ind={i}
          key={props.cartData[i].name + "PS"}
          name={props.cartData[i].name}
          price={props.cartData[i].price}
          num={props.cartData[i].ps_num}
          img_url={props.cartData[i].img_url}
          type="PS端"
          handleData={props.handleData}
          data={props.cartData}
        ></CartListItem>
      );
      num_all += props.cartData[i].ps_num;
      totalPrice += props.cartData[i].ps_num * props.cartData[i].price.slice(1);
    }
  }
  return (
    <div className="h-full w-full bg-black bg-opacity-60 absolute top-0 left-0 flex justify-center items-center">
      <div className="h-3/5 w-3/5 bg-white dark:bg-black rounded-lg px-10 pt-24 box-border relative dark:text-white">
        <div className="h-3/4 w-11/12 overflow-scroll mx-auto border-solid border-gray-100 border-t-0 border-l-0 border-r-0">
          {/* 关闭窗口按钮 */}
          <CloseSquareOutlined
            className="absolute top-5 right-5 text-2xl cursor-pointer"
            onClick={() => {
              props.handleShowWindow(false);
            }}
          />
          {/* 添加至购物车的列表 */}
          {num_all === 0 ? (
            <div className="text-3xl text-center">您还没有购物┭┮﹏┭┮</div>
          ) : (
            <div>{items}</div>
          )}
        </div>

        {/* 清空按钮和计算总额 */}
        <ClearFull
          fullPrice={"$ " + totalPrice}
          handleData={props.handleData}
          data={props.cartData}
        ></ClearFull>
      </div>
    </div>
  );
}
export default CartList;

function CartListItem(props) {
  // 计算小总价
  var localPrice = 0;
  localPrice = props.price.slice(1) * props.num;

  // console.log(props.price.slice(1) * props.num);
  // 列表项
  return (
    <>
      <div className="h-40 border-solid border-gray-100 border-t-0 border-l-0 border-r-0 flex items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={props.img_url}
              height={100}
              className="mr-10 rounded-md"
            />
            <div>
              <h3 className="mt-0 mb-0">{props.name}</h3>
              <p className="text-gray-400 leading-none mt-2 mb-3">
                {props.type}
              </p>
              <Calculator
                type={props.type}
                num={props.num}
                handleData={props.handleData}
                data={props.data}
                ind={props.ind}
              ></Calculator>
            </div>
          </div>
          {/* 这里注意应该算的是总价 */}
          <div className="text-xl">{"$ " + localPrice}</div>
        </div>
      </div>
    </>
  );
}

function ClearFull(props) {
  // 更改原始数据
  const process_data = (data) => {
    var processed = [];
    for (let i = 0; i < data.length; i++) {
      processed.push(data[i]);
      processed[i].pc_num = 0;
      processed[i].switch_num = 0;
      processed[i].ps_num = 0;
    }
    return processed;
  };

  // console.log(props.data);

  return (
    <div className="ml-10 mt-10 flex justify-between items-center">
      <Button
        className="w-1/5 h-10"
        onClick={() => {
          props.handleData(process_data(props.data));
        }}
      >
        清空购物车
      </Button>
      <p className="text-5xl m-0 mr-10">{props.fullPrice}</p>
    </div>
  );
}

function Calculator(props) {
  // 调整商品件数
  // console.log(props);
  // 处理加减的函数
  // console.log(props);
  const process_data = (type, data, id, opt) => {
    // 参数含义：商品类别、原始数据、数组对应下标、加减操作选择
    var processed = [];
    for (let i = 0; i < data.length; i++) {
      processed.push(data[i]);
    }
    if (type === "PC端") {
      if (opt === "plus") {
        processed[id].pc_num += 1;
      } else {
        processed[id].pc_num -= 1;
      }
    }
    if (type === "Switch端") {
      if (opt === "plus") {
        processed[id].switch_num += 1;
      } else {
        processed[id].switch_num -= 1;
      }
    }
    if (type === "PS端") {
      if (opt === "plus") {
        processed[id].ps_num += 1;
      } else {
        processed[id].ps_num -= 1;
      }
    }
    return processed;
  };
  return (
    <div className="flex flex-1 items-center">
      <Button
        type="primary"
        size="small"
        className="text-center font-black leading-0"
        style={{ width: "3rem", height: "2.2rem", fontSize: "1rem" }}
        onClick={() => {
          props.handleData(
            process_data(props.type, props.data, props.ind, "minus")
          );
        }}
      >
        {"-"}
      </Button>
      <span
        className="rounded-md border-solid border-gray-500 border border-box px-5 mx-2 inline-block h-7 leading-0 pt-2"
        style={{ marginTop: "0.2rem" }}
      >
        {props.num}
      </span>
      <Button
        type="primary"
        size="small"
        className="text-center font-black leading-0"
        style={{ width: "3rem", height: "2.2rem", fontSize: "1rem" }}
        onClick={() => {
          props.handleData(
            process_data(props.type, props.data, props.ind, "plus")
          );
        }}
      >
        {"+"}
      </Button>
    </div>
  );
}
