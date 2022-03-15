import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import sanityClient from '../client';

import "../Styles/Lookbook.css"

const LookbookPage = () => {
    const [postData, setPostData] = useState(null)
    const [zIndex, setZIndex] = useState(0) 
    const [zIndex2, setZIndex2] = useState(0) 
    const [zIndex3, setZIndex3] = useState(0) 
    const [zIndex4, setZIndex4] = useState(0) 
    const [zIndex5, setZIndex5] = useState(0) 
    const [zIndex6, setZIndex6] = useState(0) 
    const [zIndex7, setZIndex7] = useState(0) 
    const [zIndex8, setZIndex8] = useState(0) 
    const [zIndex9, setZIndex9] = useState(0) 
    const [zIndex10, setZIndex10] = useState(0) 
    const [zIndex11, setZIndex11] = useState(0) 
    const [zIndex12, setZIndex12] = useState(0) 

    useEffect(() => {
        sanityClient.fetch(`*[_type == "lookbook"]{
            title,
            mainImage{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage2{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage3{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage4{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage5{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage6{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage7{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage8{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage9{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage10{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage11{
                asset->{
                  _id,
                  url
                },
                alt
              },
              mainImage12{
                asset->{
                  _id,
                  url
                },
                alt
              },
        }`)
        .then((data) => setPostData(data))
        .catch(console.error)
      },[])

    return (
        <Container fluid style={{ paddingTop: "30vh", overflowX: "hidden", height: "100vh"}}>
            <Row>
                <Col>
                    <img 
                        src={postData && postData[0].mainImage.asset.url} 
                        alt="lookbook image 1" 
                        style={{ 
                            transform: "scale(1.2)",
                            zIndex: `${zIndex}`,
                            position: "relative"
                        }}
                        onPointerOver={() => setZIndex(5)}
                        onPointerOut={() => setZIndex(0)}
                    />
                </Col>
                <Col>
                    <img 
                        src={postData && postData[0].mainImage2.asset.url} 
                        alt="lookbook image 2" 
                        style={{ 
                            transform: "scale(1.5)",
                            zIndex: `${zIndex2}`,
                            position: "relative"
                        }}
                        onPointerOver={() => setZIndex2(5)}
                        onPointerOut={() => setZIndex2(0)}
                    />
                </Col>
                <Col>
                    <img 
                        src={postData && postData[0].mainImage3.asset.url} 
                        alt="lookbook image 3" 
                        style={{ 
                            transform: "scale(1.4)",
                            zIndex: `${zIndex3}`,
                            position: "relative"
                        }}
                        onPointerOver={() => setZIndex3(5)}
                        onPointerOut={() => setZIndex3(0)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <img 
                        src={postData && postData[0].mainImage4.asset.url} 
                        alt="lookbook image 1" 
                        style={{ 
                            transform: "scale(1.5)",
                            zIndex: `${zIndex4}`,
                            position: "relative"
                        }}
                        onPointerOver={() => setZIndex4(5)}
                        onPointerOut={() => setZIndex4(0)}
                    />
                </Col>
                <Col>
                    <img 
                        src={postData && postData[0].mainImage5.asset.url} 
                        alt="lookbook image 2" 
                        style={{ 
                            transform: "scale(1.2)",
                            zIndex: `${zIndex5}`,
                            position: "relative"
                        }}
                        onPointerOver={() => setZIndex5(5)}
                        onPointerOut={() => setZIndex5(0)}
                    />
                </Col>
                <Col>
                    <img 
                        src={postData && postData[0].mainImage6.asset.url} 
                        alt="lookbook image 3" 
                        style={{ 
                            transform: "scale(1.5)",
                            zIndex: `${zIndex6}`,
                            position: "relative"
                        }}
                        onPointerOver={() => setZIndex6(5)}
                        onPointerOut={() => setZIndex6(0)}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default LookbookPage