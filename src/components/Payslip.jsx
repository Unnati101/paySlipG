import { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/logo.jpg';

const PayslipGenerator = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '', designation: '', employeeNo: '', paidDays: '',
        bankName: '', accountNo: '', uanNo: '', pfNo: '',
        basicSalary: '', hra: '', overtimeBonus: '', specialAllowance: '',
        epf: '', profTax: '', tds: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculatePayslip = () => {
        const earnings = ['basicSalary', 'hra', 'overtimeBonus', 'specialAllowance']
            .map(key => parseFloat(formData[key]) || 0)
            .reduce((a, b) => a + b, 0);
        const deductions = ['epf', 'profTax', 'tds']
            .map(key => parseFloat(formData[key]) || 0)
            .reduce((a, b) => a + b, 0);
        return { grossSalary: earnings, totalDeductions: deductions, netPay: earnings - deductions };
    };

    const generatePayslip = () => setShow(true);
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text(`Payslip\nName: ${formData.name}\nDesignation: ${formData.designation}\nGross Salary: ${calculatePayslip().grossSalary}\nNet Pay: ${calculatePayslip().totalDeductions}\nNet Pay: ${calculatePayslip().netPay}`, 10, 10);
        doc.save("payslip.pdf");
    };

    return (
        <Container className="payslip-container">
            <div>
                <img src={Logo} alt="Company Logo" className="logo" style={{ padding: "20px", width: "200px", height: "auto" }} />
                <h1 className="text-center mb-4">Enoylity Media Creations Private Limited</h1>
            </div>
            <h2 className="text-center mb-4">Payslip Generator</h2>
            <Form>
                <Row>
                    <Col md={6} className="border-right">
                        <h4>Employee Details</h4>
                        <Form.Group><Form.Label>Name</Form.Label><Form.Control name="name" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>Designation</Form.Label><Form.Control name="designation" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>Employee No</Form.Label><Form.Control name="employeeNo" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>Paid Days</Form.Label><Form.Control name="paidDays" onChange={handleChange} /></Form.Group>
                    </Col>
                    <Col md={6}>
                        <h4>Bank Details</h4>
                        <Form.Group><Form.Label>Bank Name</Form.Label><Form.Control name="bankName" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>Account No</Form.Label><Form.Control name="accountNo" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>UAN No</Form.Label><Form.Control name="uanNo" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>PF No</Form.Label><Form.Control name="pfNo" onChange={handleChange} /></Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="border-right">
                        <h4>Earnings</h4>
                        <Form.Group><Form.Label>Basic Salary</Form.Label><Form.Control name="basicSalary" type="number" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>HRA</Form.Label><Form.Control name="hra" type="number" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>Overtime Bonus</Form.Label><Form.Control name="overtimeBonus" type="number" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>Special Allowance</Form.Label><Form.Control name="specialAllowance" type="number" onChange={handleChange} /></Form.Group>
                    </Col>
                    <Col md={6}>
                        <h4>Deductions</h4>
                        <Form.Group><Form.Label>EPF</Form.Label><Form.Control name="epf" type="number" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>Professional Tax</Form.Label><Form.Control name="profTax" type="number" onChange={handleChange} /></Form.Group>
                        <Form.Group><Form.Label>TDS</Form.Label><Form.Control name="tds" type="number" onChange={handleChange} /></Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" className="mt-3 w-100" onClick={generatePayslip}>Generate Payslip</Button>
            </Form>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Generated Payslip</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Designation:</strong> {formData.designation}</p>
                    <p><strong>Gross Salary:</strong> {calculatePayslip().grossSalary.toFixed(2)}</p>
                    <p><strong>Deductions:</strong> {calculatePayslip().totalDeductions.toFixed(2)}</p>
                    <p><strong>Net Pay:</strong> {calculatePayslip().netPay.toFixed(2)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="success" onClick={downloadPDF}>Download PDF</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PayslipGenerator;