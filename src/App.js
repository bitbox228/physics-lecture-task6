import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form, Button, Nav} from 'react-bootstrap';

const App = () => {

    const [l, setL] = useState(10)
    const [c, setC] = useState(0.001)
    const [r, setR] = useState(10)
    const [q0, setQ0] = useState(1)
    const [i0, setI0] = useState(5)
    const [u0, setU0] = useState(10)

    const [t, setT] = useState(10)

    const [x, setX] = useState()
    const [q, setQ] = useState()
    const [i, setI] = useState()
    const [u, setU] = useState()

    const handleCChange = (e) => {
        setC(e.target.value)
    }

    const handleRChange = (e) => {
        setR(e.target.value)
    }

    const handleLChange = (e) => {
        setL(e.target.value)
    }

    const handleTChange = (e) => {
        setT(e.target.value)
    }

    const handleQ0Change = (e) => {
        setQ0(e.target.value)
    }

    const handleI0Change = (e) => {
        setI0(e.target.value)
    }

    const handleU0Change = (e) => {
        setU0(e.target.value)
    }

    const checkForms = () => {
        if (l === '') {
            alert('Введите L')
            return false
        }
        if (c === '') {
            alert('Введите C')
            return false
        }
        if (r === '') {
            alert('Введите R')
            return false
        }
        if (t === '') {
            alert('Введите t')
            return false
        }
        if (q0 === '') {
            alert('Введите q_0')
            return false
        }
        if (u0 === '') {
            alert('Введите u_0')
            return false
        }
        if (i0 === '') {
            alert('Введите i_0')
            return false
        }

        return true
    }

    const handlePlotUpdate = () => {
        if (!checkForms()) {
            return
        }

        const step = t / 1000
        const b = r / (2 * l)
        const w = Math.sqrt((1 / (l * c)) - (Math.pow(r, 2) / (4 * Math.pow(l, 2))))

        if (isNaN(w)) {
            return;
        }

        const newX = Array.from(
            {length: 1000},
            (_, index) => index * step
        )

        const newQ = newX.map(index =>
            q0 * Math.exp(-b * index) * Math.cos(w * index)
        )

        const newI = newX.map(index =>
            i0 * Math.exp(-b * index) * Math.sin(w * index)
        )

        const newU = newX.map(index =>
            u0 * Math.exp(-b * index) * Math.cos(w * index)
        )

        setX(newX)
        setQ(newQ)
        setI(newI)
        setU(newU)
    }

    useEffect(() => {
        handlePlotUpdate()
    }, [])

    return (
        <div className={"container-fluid"}>
            <h1>Затухающие колебания в LCR контуре.</h1>
            <Row>
                <Col xs={12} md={3}>
                    <Form>
                        <div style={{marginBottom: '10px', marginTop: '70px'}}>
                            <Form.Group controlId="l">
                                <Form.Label>Индуктивность, L (Гн)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={l}
                                    onChange={handleLChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="r">
                                <Form.Label>Сопротивление, R (Ом)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={r}
                                    onChange={handleRChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="c">
                                <Form.Label>Емкость конденсатора, C (Ф)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={c}
                                    onChange={handleCChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="t">
                                <Form.Label>Время, t (с)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={t}
                                    onChange={handleTChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="q0">
                                <Form.Label>Начальная сила заряда, q<sub>0</sub> (Кл)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={q0}
                                    onChange={handleQ0Change}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="i0">
                                <Form.Label>Начальная сила тока, I<sub>0</sub> (А)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={i0}
                                    onChange={handleI0Change}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="u0">
                                <Form.Label>Начальное напряжение, U<sub>0</sub> (В)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={u0}
                                    onChange={handleU0Change}
                                />
                            </Form.Group>
                        </div>
                        <div>
                            <Button variant="primary" onClick={handlePlotUpdate}>Построить графики</Button>
                        </div>
                    </Form>
                </Col>
                <Col xs={12} md={9}>
                    <Plot
                        data={[
                            {
                                x: x,
                                y: q,
                                type: 'scatter',
                                mode: 'lines+points',
                                marker: {color: 'blue'},
                            },
                        ]}
                        layout={{
                            width: '800',
                            height: '320',
                            xaxis: {title: 'Время, с'},
                            yaxis: {title: 'Сила заряда, Кл'}
                        }}
                    />
                    <Plot
                        data={[
                            {
                                x: x,
                                y: i,
                                type: 'scatter',
                                mode: 'lines+points',
                                marker: {color: 'blue'},
                            },
                        ]}
                        layout={{
                            width: '800',
                            height: '300',
                            xaxis: {title: 'Время, с'},
                            yaxis: {title: 'Сила тока, А'}
                        }}
                    />
                    <Plot
                        data={[
                            {
                                x: x,
                                y: u,
                                type: 'scatter',
                                mode: 'lines+points',
                                marker: {color: 'blue'},
                            },
                        ]}
                        layout={{
                            width: '800',
                            height: '300',
                            xaxis: {title: 'Время, с'},
                            yaxis: {title: 'Напряжение, В'}
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default App
