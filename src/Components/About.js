import { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import BlockContent from '@sanity/block-content-to-react';
import sanityClient from '../client';
import ReactGa from 'react-ga';
import { Helmet } from 'react-helmet';

import MailChimpForm from '../Components/newsletter/MailchimpForm';

import '../Styles/About.css'

const About = () => {
    const [aboutData, setAboutData] = useState()
    const [section, setSection] = useState(0)

    useEffect(() => {
        sanityClient.fetch(`*[_type == "about"]{
            title,
            body,
        }`)
        .then((data) => setAboutData(data))
        .catch(console.error)
        ReactGa.initialize('UA-211860604-30')
        ReactGa.pageview('/about')
      },[])

    return (
        <Container fluid style={{ marginTop: `${document.documentElement.clientWidth > 600 ? "40vh" : "10vh"}` }}>
          <Helmet>
            <title>About Page</title>
            <meta
              name="About Page"
              content="View return-policy, read about the company, check shirt sizing and contact the guys all from this page"
            />
          </Helmet>
            <Row>
                <Col 
                    lg={{ offset: 1, span: 3}}
                    style={{ marginBottom: "10vh" }}
                >
                    {aboutData &&
                        aboutData.map((page, i) => {
                            return (
                                <div key={i}>
                                    <h1 onClick={() => setSection(i)} className="about-nav">{page.title}</h1>
                                </div>                            
                            )
                        })
                    }
                    <h1 className="about-nav" onClick={() => setSection(aboutData && aboutData.length )}>Newsletter</h1>
                    <a 
                        className="about-nav" 
                        href = "mailto: Beans.magazinee@gmail.com" 
                        onClick={() => setSection(aboutData && aboutData.length + 1)}
                    >Contact</a>
                </Col>
                <Col lg={7} >
                    {aboutData && aboutData.length >= section ?
                        <div>
                            <h1 className="about-header" >{aboutData[section] && aboutData[section].title}</h1>
                            <h6 className="about-body"><BlockContent 
                                blocks={aboutData[section] && aboutData[section].body} 
                                projectId="m7j507qg"
                                dataset="headless"
                            /></h6>
                        </div>   
                        :
                        <span></span>                 
                    }
                    { aboutData && aboutData.length === section  ?
                        <div>
                            <h1 className="about-header">Newsletter</h1>
                            <MailChimpForm />
                        </div>
                        :
                        <span></span>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default About