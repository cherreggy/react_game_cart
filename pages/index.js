import { ConfigProvider, theme } from "antd";
import { useState } from "react";
import HomePage from "./home";
import CartList from "./window";

function Home() {
  // 捏造的数据
  const [data, setData] = useState([
    {
      name: "死亡搁浅",
      price: "$88",
      img_url: "/images/a.jpg",
      pc_num: 0,
      switch_num: 0,
      ps_num: 0,
    },
    {
      name: "黑暗之魂3",
      price: "$178",
      img_url: "/images/b.jpg",
      pc_num: 0,
      switch_num: 0,
      ps_num: 0,
    },
    {
      name: "文明5",
      price: "$95",
      img_url: "/images/c.jpg",
      pc_num: 0,
      switch_num: 0,
      ps_num: 0,
    },
    {
      name: "荒野大镖客 救赎2",
      price: "$249",
      img_url: "/images/d.jpg",
      pc_num: 0,
      switch_num: 0,
      ps_num: 0,
    },
    {
      name: "星露谷物语",
      price: "$48",
      img_url: "/images/e.jpg",
      pc_num: 0,
      switch_num: 0,
      ps_num: 0,
    },
    {
      name: "双人成行",
      price: "$198",
      img_url: "/images/f.jpg",
      pc_num: 0,
      switch_num: 0,
      ps_num: 0,
    },
  ]);
  // 黑夜模式切换按钮
  const [dark, setDark] = useState(true);
  // 是否显示窗口
  const [showWindow, setShowWindow] = useState(false);
  return (
    <div className={dark ? "relative dark" : "relative"}>
      <ConfigProvider
        theme={
          !dark
            ? {
                token: {
                  colorPrimary: "#000",
                },
              }
            : {
                algorithm: theme.darkAlgorithm,
                token: {
                  colorPrimary: "#333",
                },
              }
        }
      >
        <HomePage
          data={data}
          showWindow={showWindow}
          handleShowWindow={setShowWindow}
          handleData={setData}
          handleDark={setDark}
          dark={dark}
        ></HomePage>
        {showWindow && (
          <CartList
            cartData={data}
            showWindow={showWindow}
            handleShowWindow={setShowWindow}
            handleData={setData}
          ></CartList>
        )}
      </ConfigProvider>
    </div>
  );
}

export default Home;
