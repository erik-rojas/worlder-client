import React, { Component } from 'react';
import SD from "react-slick";
import { Row, Col } from 'reactstrap';
import { _url } from '../../config/utils';
import PropTypes from 'prop-types';

class Slider extends Component {
    prevSlider = () => {
        this.slider.slickPrev();
    }

    nextSlider = () => {
        this.slider.slickNext();
    }

    render() {
        var settings = {
            className: "center",
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 5,
            slidesToScroll: 1,
            speed: 500,
            arrows: false,
            // autoplay: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div className="slider">
                <Row>
                    <Col xs="auto">
                        <img onClick={this.prevSlider} className="btn-arrow" alt="left" src={_url('assets/images/left-arrow.png')} />
                    </Col>
                    <Col>
                        <SD {...settings} ref={c => this.slider = c}>
                            {
                                this.props.datas.map((l, index) => {
                                    return (
                                        <div key={index}>
                                            <img alt="logo" src={l} />
                                        </div>
                                    )
                                })
                            }
                        </SD>
                    </Col>
                    <Col xs="auto">
                        <img onClick={this.nextSlider} className="btn-arrow" alt="right" src={_url('assets/images/right-arrow.png')} />
                    </Col>
                </Row>
            </div>
        )
    }
}


Slider.propTypes = {
    datas: PropTypes.array,
}

Slider.defaultProps = {
    datas: [],
}

export default Slider;
