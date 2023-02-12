import { Input, Button, Select, Card, Switch } from "antd";
import { Layout } from "antd";
import { ShoppingCartOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Meta } = Card;

import { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3891838_cb7b4awv7nq.js",
});

export default function HomePage(props) {
  return (
    <div className="bg-white dark:bg-black">
      <Header>
        {/* 搜索栏 */}
        <SearchBar
          showWindow={props.showWindow}
          handleShowWindow={props.handleShowWindow}
          data={props.data}
          handleDark={props.handleDark}
          dark={props.dark}
        ></SearchBar>
      </Header>
      <Content>
        {/* 产品列表 */}
        <ProductList
          data={props.data}
          handleData={props.handleData}
        ></ProductList>
        <Copyright></Copyright>
      </Content>
    </div>
  );
}

function SearchBar(props) {
  // 搜索栏，包含LOGO、搜索框和购物车按钮
  return (
    <div className="flex flex-wrap justify-between items-center px-40 py-5  border-solid border-gray-100 border-t-0 border-l-0 border-r-0 shadow-lg">
      {/* LOGO */}
      {props.dark ? (
        <img src={"/images/black.jpg"} width={200} />
      ) : (
        <img src={"/images/logo.jpeg"} width={200} />
      )}

      {/* 搜索框 */}
      <Searching></Searching>
      <div>
        {props.dark ? (
          <IconFont
            type="icon-moon"
            className="mr-3 align-middle text-xl"
          ></IconFont>
        ) : (
          <IconFont
            type="icon-sun"
            className="mr-3 align-middle text-xl"
          ></IconFont>
        )}

        <Switch
          onChange={(e) => {
            props.handleDark(!e);
          }}
        ></Switch>
      </div>

      {/* 购物车按钮 */}
      <Cart
        showWindow={props.showWindow}
        handleShowWindow={props.handleShowWindow}
        data={props.data}
      ></Cart>
    </div>
  );
}

function Searching() {
  // 搜索框
  return (
    <Search
      placeholder="搜索想要的游戏"
      enterButton
      className="w-1/2"
      size="large"
    />
  );
}

function Cart(props) {
  const handleClickCart = () => {
    props.handleShowWindow(true);
  };
  // console.log(props.numberAll);
  // 购物车按钮
  // 计算当前购物车内所有商品数目
  function getNumber(items) {
    let all = 0;
    for (let i = 0; i < items.length; i++) {
      let item_full = items[i].pc_num + items[i].switch_num + items[i].ps_num;
      if (item_full > 0) {
        all += item_full;
      }
    }
    return all;
  }
  return (
    <Button
      type="primary"
      icon={
        <ShoppingCartOutlined
          style={{ fontSize: "18px", marginRight: "1rem" }}
        />
      }
      size="large"
      className="w-1/12"
      onClick={handleClickCart}
    >
      {/* 这里存放的是加入购物车的商品数目 */}
      {getNumber(props.data) <= 0 ? "空" : getNumber(props.data)}
    </Button>
  );
}

function ProductList(props) {
  const results = props.data.map((item, id) => {
    return (
      <Product
        ind={id}
        key={item.name}
        name={item.name}
        price={item.price}
        img_url={item.img_url}
        handleData={props.handleData}
        data={props.data}
      ></Product>
    );
  });
  return (
    <div className="w-2/3 flex flex-wrap justify-center m-auto">{results}</div>
  );
}

function Product(props) {
  const process_data = (type, data, id) => {
    var processed = [];
    for (let i = 0; i < data.length; i++) {
      processed.push(data[i]);
    }
    if (type === "PC端") {
      processed[id].pc_num += 1;
    }
    if (type === "Switch端") {
      processed[id].switch_num += 1;
    }
    if (type === "PS端") {
      processed[id].ps_num += 1;
    }
    return processed;
  };
  const [gameType, setGameType] = useState("PC端");
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img alt="example" src={props.img_url} className="duration-1000" />
      }
      className="w-60 h-96 m-6 overflow-hidden my-zoom"
    >
      {/* 游戏名称 */}
      <h3 className="text-xl">{props.name}</h3>
      {/* 价格 */}
      <p className="text-base">{props.price}</p>
      {/* 选择客户端 */}
      <Select
        defaultValue="PC端"
        style={{ width: 120 }}
        options={[
          { value: "PC", label: "PC端" },
          { value: "Switch", label: "Switch端" },
          { value: "PS", label: "PS端" },
        ]}
        // 当选择改变时调用该函数
        onChange={(e) => {
          // console.log(e);
          if (e === "PC") {
            setGameType("PC端");
          }
          if (e === "Switch") {
            setGameType("Switch端");
          }
          if (e === "PS") {
            setGameType("PS端");
          }
        }}
      />
      {/* 添加至购物车按钮 */}
      <Button
        type="primary"
        icon={<ArrowRightOutlined />}
        size="Large"
        className="block mt-5 w-full h-10"
        onClick={(e) => {
          // 点击添加按钮时设置不同类别游戏数目
          // console.log(e);
          if (gameType === "PC端") {
            // console.log(props.data[props.ind]);
            props.handleData(process_data(gameType, props.data, props.ind));
            // console.log(process_data(gameType, props.data, props.ind));
          }

          if (gameType === "Switch端") {
            props.handleData(process_data(gameType, props.data, props.ind));
          }

          if (gameType === "PS端") {
            props.handleData(process_data(gameType, props.data, props.ind));
          }
        }}
      >
        添加至购物车
      </Button>
    </Card>
  );
}

function Copyright() {
  return (
    <div className="pb-10">
      <p
        className="block bg-black dark:bg-gray-300 h-14 text-center text-white dark:text-black text-xl shadow-lg"
        style={{ lineHeight: "3.5rem" }}
      >
        Copyright © Xuan Zhengji ECUST 20230211
      </p>
    </div>
  );
}
