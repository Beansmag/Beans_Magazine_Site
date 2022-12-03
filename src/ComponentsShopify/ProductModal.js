import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useShopify } from "../hooks";
import ReactGA from "react-ga";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import DropDownArrow from "../Assets/dropDownArrow.svg";

import "../Styles/productModal.css";

export default (props) => {
  const { fetchProduct, openCart, checkoutState, addVariant } = useShopify();

  useEffect(() => {
    ReactGA.initialize("UA-211860604-30");
    setSoldOut(category[props.modalIndex].variants[0].available);
  }, []);

  const { category } = props;
  const id =
    category[props.modalIndex] !== undefined
      ? category[props.modalIndex].id
      : "...Loading";
  const defaultSize =
    category[props.modalIndex] !== undefined
      ? category[props.modalIndex].variants[0].id.toString()
      : "...Loading";
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [soldOut, setSoldOut] = useState();
  const [dropDownMenu, setdropDownMenu] = useState(false);
  const [sizeTitle, setSizeTitle] = useState("");
  const [rotate, setRotate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxImage, setlightboxImage] = useState("");
  const description =
    category[props.modalIndex] !== undefined
      ? category[props.modalIndex].description.split(".")
      : "...Loading";

  function changeSize(sizeId, quantity) {
    openCart();
    if (sizeId === "") {
      sizeId = defaultSize;
      const lineItemsToAdd = [
        { variantId: sizeId, quantity: parseInt(quantity, 10) },
      ];
      const checkoutId = checkoutState.id;
      addVariant(checkoutId, lineItemsToAdd);
    } else {
      const lineItemsToAdd = [
        { variantId: sizeId, quantity: parseInt(quantity, 10) },
      ];
      const checkoutId = checkoutState.id;
      addVariant(checkoutId, lineItemsToAdd);
    }
  }

  useEffect(() => {
    if (id !== "...Loading") {
      fetchProduct(id);
    }
  }, [id]);

  function GAEvent() {
    ReactGA.event({
      category: "User",
      action: "Add to Cart",
      label: `${category[props.modalIndex].title} added to cart`,
    });
  }

  function clickFunction(item, i) {
    if (item.available) {
      setSize(item.id.toString());
      setSizeTitle(item.title);
      setRotate(!rotate);
      setdropDownMenu(!dropDownMenu);
    } else {
      return;
    }
  }

  function imageClick(){
    console.log('i am click')
  }

  console.log(category[props.modalIndex].variants[0].price,"price")

  return (
    <Container
      className="product-modal-background"
      style={{ overflowY: "hidden" }}
    >
      <Row
        style={{
          height: "100%",
          gap: `${
            document.documentElement.clientWidth < 600
              ? category[props.modalIndex].images.length > 1
                ? "12em"
                : "0"
              : "0"
          }`,
        }}
      >
        <Col
          lg={6}
          style={{
            borderBottom: `${
              document.documentElement.clientWidth < 600
                ? "solid 1px black"
                : ""
            }`,
            minHeight: `${
              document.documentElement.clientWidth < 600 ? "350px" : "250px"
            }`,
          }}
        >
          <div
            style={{
              height: `${
                document.documentElement.clientWidth > 600
                  ? "70%"
                  : category[props.modalIndex].images.length > 1
                  ? "100%"
                  : "100%"
              }`,
              backgroundImage: `url(${
                category[props.modalIndex].images[0] !== undefined
                  ? category[props.modalIndex].images[imageIndex].src
                  : ""
              })`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => {setIsOpen(true); setlightboxImage(category[props.modalIndex].images[imageIndex].src)}}
            className="main-image-hello"
          ></div>
          {category[props.modalIndex].images.length > 1 ? (
            <div style={{ height: "50%" }}>
              <div
                style={{
                  height: "100%",
                  width: `${100 / category[props.modalIndex].images.length}%`,
                  float: "left",
                  backgroundImage: `url(${
                    category[props.modalIndex].images[0] !== undefined
                      ? category[props.modalIndex].images[0].src
                      : ""
                  })`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: "20",
                }}
                onClick={() => setImageIndex(0)}
              ></div>
              <div
                style={{
                  height: "100%",
                  width: `${100 / category[props.modalIndex].images.length}%`,
                  float: "left",
                  backgroundImage: `url(${
                    category[props.modalIndex].images[1] !== undefined
                      ? category[props.modalIndex].images[1].src
                      : ""
                  })`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: "20",
                }}
                onClick={() => setImageIndex(1)}
                
              ></div>
              <div
                style={{
                  height: "100%",
                  width: `${100 / category[props.modalIndex].images.length}%`,
                  float: "left",
                  backgroundImage: `url(${
                    category[props.modalIndex].images[2] !== undefined
                      ? category[props.modalIndex].images[2].src
                      : ""
                  })`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  zIndex: "20",
                }}
                onClick={() => setImageIndex(2)}
              ></div>
            </div>
          ) : (
            <span></span>
          )}
        </Col>
        <Col
          lg={6}
          style={{
            borderLeft: `${
              document.documentElement.clientWidth > 600
                ? "solid 1px black"
                : ""
            }`,
            height: `${
              document.documentElement.clientWidth > 600 ? "100%" : "70%"
            }`,
          }}
        >
          <div
            style={{
              height: `${
                document.documentElement.clientWidth > 600 ? "70%" : "auto"
              }`,
            }}
          >
            <h1 className="prod-modal-title">
              <mark style={{ backgroundColor: "#DDDDDD" }}>
                {category[props.modalIndex] !== undefined
                  ? category[props.modalIndex].title
                  : "...Loading"}
              </mark>
            </h1>
            <h1 className="prod-modal-price">
              <mark style={{ backgroundColor: "#DDDDDD" }}>{`$${
                category[props.modalIndex] !== undefined
                  ? category[props.modalIndex].variants[0].price?.amount
                  : "...Loading"
              }`}</mark>
            </h1>
            <h5 className="prod-modal-description">
              <mark style={{ backgroundColor: "#DDDDDD" }}>{description}</mark>
            </h5>
          </div>
          <div className="Product__info" style={{ padding: "10px" }}>
            <div style={{ width: "100%", position: "relative" }}>
              <div
                className="style__dropdown"
                style={{ backgroundColor: "#DDDDDD" }}
                id="prodOptions"
                onClick={(e) => {
                  setdropDownMenu(!dropDownMenu);
                  setRotate(!rotate);
                }}
              >
                <h4
                  style={{
                    fontSize: "clamp(8pt, 3vw, 20pt)",
                    fontWeight: "800",
                  }}
                >
                  {sizeTitle
                    ? sizeTitle
                    : `${
                        category[props.modalIndex].variants.length > 1
                          ? "Small"
                          : "One Size"
                      }`}
                </h4>
                <img
                  src={DropDownArrow}
                  alt="drop down arrow"
                  style={{
                    transform: !rotate ? `rotate(0deg)` : `rotate(180deg)`,
                  }}
                  className="dropDownArrow"
                  onClick={() => console.log("Clicked")}
                />
              </div>
              {category[props.modalIndex] === undefined ? (
                "...Loading"
              ) : (
                <div
                  className="style__dropdownDiv"
                  style={{
                    opacity: dropDownMenu ? 1 : 0,
                    transform: dropDownMenu
                      ? `translateY(-60px) scaleY(1)`
                      : `translateY(-130%) scaleY(0)`,
                  }}
                >
                  {category[props.modalIndex] &&
                    category[props.modalIndex].variants.map((item, i) => {
                      return (
                        <li
                          onClick={(e) => {
                            clickFunction(item, i);
                            setSoldOut(item.available ? true : false);
                            setdropDownMenu(!dropDownMenu);
                            setRotate(!rotate);
                          }}
                          style={{
                            color: `${item.available ? "black" : "grey"}`,
                            // cursor: `${item.available ? "pointer" : "not-allowed" }`,
                          }}
                          key={item.title + i}
                        >{`${item.title}`}</li>
                      );
                    })}
                </div>
              )}
            </div>
            <div>
              <input
                className="quantity"
                type="number"
                style={{ background: "#DDDDDD" }}
                min={1}
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              ></input>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              {soldOut ? (
                <button
                  className="prodBuy button"
                  onClick={(e) => {
                    changeSize(size, quantity);
                    // fireAnimation(size,quantity)
                    GAEvent();
                  }}
                >
                  ADD TO CART
                </button>
              ) : (
                <button
                  className="prodBuy button"
                  style={{ background: "grey", fontSize: "15px" }}
                >
                  SIZE NOT AVAILABLE
                </button>
              )}
            </div>
          </div>
        </Col>
      </Row>
      {isOpen && (
          <Lightbox
            mainSrc={lightboxImage}
            onCloseRequest={() => setIsOpen(false) }
            enableZoom={false}         
          />
        )}
    </Container>
  );
};
