import React from "react";

import { Button, Modal } from "antd";

import { PopupModel } from "@/model/TrailerPopup";

function Popup(props: PopupModel) {
  const { setVisible } = props;
  return (
    <Modal
      open={props.visible}
      className="custom-Model"
      footer={
        <>
          <Button onClick={() => setVisible(false)} className="closebtn">
            Close
          </Button>
        </>
      }
      centered
      closable={false}
      cancelText={"Close"}
      maskClosable={false}
      width={"85%"}
      bodyStyle={{ height: "75vh", background: "#263F61" }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${props?.videoDetails?.key}?autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={true}
      ></iframe>
    </Modal>
  );
}

export default Popup;
